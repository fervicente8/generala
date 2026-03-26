"use client";

import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { createPortal } from "react-dom";
import { GameUser } from "@/types";
import CustomLoadingSpinner from "@/components/ui/CustomLoadingSpinner";
import LoadingOverlay from "@/components/ui/LoadingOverlay";
import { useAlert } from "@/components/ui/CustomAlert";
import { useSession } from "next-auth/react";
import { useParams, useRouter } from "next/navigation";
import PlayerSlot, { type PlayerReaction } from "@/components/game/PlayerSlot";
import {
  FlyingReaction,
  type FlyingReactionData,
} from "@/components/game/FlyingReaction";
import {
  ReactionPicker,
  type ReactionChoice,
} from "@/components/game/ReactionPicker";
import { useAchievement } from "@/contexts/AchievementContext";
import Cup from "@/components/game/Cup";
import DiceBoard from "@/components/game/DiceBoard";
import { socket } from "@/lib/socket";
import { secondsRemainingOnTurn } from "@/lib/turnTimer";
import { getPossibleMarkHints } from "@/lib/gameScoring";
import {
  parseScoreSheetPrefs,
  type DesktopScoreSheetPrefsV1,
} from "@/lib/scoreSheetPrefs";
import { ScoreSheetPanel } from "@/components/game/ScoreSheetPanel";
import {
  ArrowLeft,
  ClipboardList,
  LogOut,
  Music,
  RefreshCw,
  Share2,
  Volume2,
  VolumeX,
} from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

/**
 * Tiempo que el cliente mantiene `rollingLoading` tras `diceRolled` (debe alinearse con la
 * percepción de la tirada; `.rolling` en Dice.module.css usa spin-3d en 3s — ~1s da ~1 vuelta visible).
 */
const ROLL_DICE_UI_HOLD_MS = 1000;

/** Tras 1.er y 2.er tiro: margen hasta que se pueda anotar con valores finales. */
const DICE_SETTLE_AFTER_ROLL_MS = 500;

/**
 * Tras cortar `rollingLoading` en el 3.er tiro: el cubilete vuelve ~250ms (Cup.tsx) + pequeño
 * colchón antes del delay explícito del usuario.
 */
const AFTER_THIRD_ROLL_MOTION_MS = 350;

/** Cuando terminó la animación del último tiro, esperar esto y recién abrir el anotador. */
const SCORE_SHEET_OPEN_AFTER_LAST_ROLL_ANIM_MS = 500;

const THIRD_ROLL_SCORE_SETTLE_MS =
  AFTER_THIRD_ROLL_MOTION_MS + SCORE_SHEET_OPEN_AFTER_LAST_ROLL_ANIM_MS;

/** Cerrar la botonera de sonido si no hay interacción en este tiempo */
const AUDIO_CONTROLS_AUTO_CLOSE_MS = 5000;

/** `true` en localStorage = el usuario pausó la música de la partida */
const GENERALA_MUSIC_PAUSED_KEY = "generala-music-paused";

interface GameTableProps {
  id: string;
  players: GameUser[];
  status: "waiting" | "in progress" | "finished";
  turnTimeout: number | null;
  /** ISO: inicio de ventana de tiempo (turno nuevo o última tirada) */
  turnStartedAt?: string | null;
  currentTurnId: string;
  diceValues: number[];
  rollCount: number;
}

function isGameEnded(game: GameTableProps | null): boolean {
  if (!game) return true;
  const scoreFields = [
    "ones",
    "twos",
    "threes",
    "fours",
    "fives",
    "sixes",
    "straight",
    "fullHouse",
    "poker",
    "generala",
    "double",
  ];
  return game.players.every((player) =>
    scoreFields.every(
      (key) =>
        player[key as keyof GameUser] !== null &&
        player[key as keyof GameUser] !== undefined,
    ),
  );
}

export default function GameTable() {
  // Session
  const { data: session, status } = useSession();
  // Estados del componente
  const [loadingGame, setLoadingGame] = useState(true);
  const [game, setGame] = useState<GameTableProps | null>(null);
  const [rollingLoading, setRollingLoading] = useState(false);
  const [dicesToReroll, setDicesToReroll] = useState<number[]>([]);
  const [loadingSubmit, setLoadingSubmit] = useState(false);
  /** Solo envío rápido desde chips: categoría con spinner (el anotador no rellena esto). */
  const [submittingQuickCategory, setSubmittingQuickCategory] = useState<
    string | null
  >(null);
  const [showTurnHint, setShowTurnHint] = useState(false);
  const [showScoreHint, setShowScoreHint] = useState(false);
  // Alert
  const { showAlert, showConfirm } = useAlert();
  // Params
  const { id: gameId } = useParams();
  // Sound (mute persistido en localStorage)
  const [isMuted, setIsMuted] = useState(false);
  const [isSoundPlaying, setIsSoundPlaying] = useState(true);
  const [audioControlsOpen, setAudioControlsOpen] = useState(false);
  const audioControlsIdleCloseRef = useRef<ReturnType<
    typeof setTimeout
  > | null>(null);
  const [isLeaving, setIsLeaving] = useState(false);
  const [isRevanchaLoading, setIsRevanchaLoading] = useState(false);
  const [reactions, setReactions] = useState<
    Record<string, (PlayerReaction & { id: number }) | null>
  >({});
  const [reactionPickerTarget, setReactionPickerTarget] = useState<
    string | null
  >(null);
  const reactionTimeoutsRef = useRef<
    Record<string, ReturnType<typeof setTimeout>>
  >({});
  const avatarRefsMap = useRef<Record<string, HTMLDivElement | null>>({});
  const [flyingReaction, setFlyingReaction] = useState<{
    fromUserId: string;
    targetUserId: string;
    type: "emoji" | "phrase";
    value: string;
    fromUserName?: string;
    startRect: DOMRect;
    endRect: DOMRect;
  } | null>(null);
  const [scoreBoardOpen, setScoreBoardOpen] = useState(false);
  /** Durante tirada + margen de asentado: anotador usa snapshot de dados (no tocar celdas) */
  const [scoreDiceSettling, setScoreDiceSettling] = useState(false);
  const prevRollingLoadingRef = useRef(false);
  /** Dados/rollCount antes de aplicar la última tirada (para mostrar puntajes viejos mientras anima) */
  const prevDiceForScoreRef = useRef<{
    diceValues: number[];
    rollCount: number;
  }>({ diceValues: [], rollCount: 0 });
  const backSoundRef = useRef<HTMLAudioElement | null>(null);
  const previousUnlockedIdsRef = useRef<Set<string>>(new Set());
  const previousGameEndedRef = useRef(false);
  const gameSurfaceRef = useRef<HTMLDivElement>(null);
  const [desktopScoreSheetPrefs, setDesktopScoreSheetPrefs] = useState<
    DesktopScoreSheetPrefsV1 | null
  >(null);
  const scoreSheetPrefsSaveTimerRef = useRef<ReturnType<
    typeof setTimeout
  > | null>(null);
  const gameIdForPrefsHydrationRef = useRef<string | null>(null);
  const { showAchievement } = useAchievement();

  useLayoutEffect(() => {
    if (typeof window === "undefined") return;

    const effectsMuted = localStorage.getItem("generala-muted") === "true";
    setIsMuted(effectsMuted);

    const musicPaused = localStorage.getItem(GENERALA_MUSIC_PAUSED_KEY) === "true";
    setIsSoundPlaying(!musicPaused);

    const backSound = new Audio("/sounds/backSound.mp3");
    backSound.loop = true;
    backSound.volume = 0.03;
    backSound.currentTime = 0;
    backSoundRef.current = backSound;

    if (!musicPaused) {
      backSound.play().catch(() => {
        setIsSoundPlaying(false);
      });
    }

    return () => {
      backSound.pause();
      backSoundRef.current = null;
    };
  }, []);

  const toggleMute = () => {
    const next = !isMuted;
    setIsMuted(next);
    if (typeof window !== "undefined")
      localStorage.setItem("generala-muted", String(next));
  };
  // Variables
  const router = useRouter();

  const playDiceSound = useCallback(() => {
    if (isMuted) return;
    const diceRollSound = new Audio("/sounds/dice-roll.mp3");
    diceRollSound.volume = 0.2;
    diceRollSound.currentTime = 0;
    diceRollSound.play();
  }, [isMuted]);

  const playPencilSound = useCallback(() => {
    if (isMuted) return;
    const pencilSound = new Audio("/sounds/pencil.mp3");
    pencilSound.volume = 0.2;
    pencilSound.currentTime = 0;
    pencilSound.play();
  }, [isMuted]);

  const clearAudioControlsIdleClose = useCallback(() => {
    if (audioControlsIdleCloseRef.current) {
      clearTimeout(audioControlsIdleCloseRef.current);
      audioControlsIdleCloseRef.current = null;
    }
  }, []);

  const scheduleAudioControlsAutoClose = useCallback(() => {
    clearAudioControlsIdleClose();
    audioControlsIdleCloseRef.current = setTimeout(() => {
      audioControlsIdleCloseRef.current = null;
      setAudioControlsOpen(false);
    }, AUDIO_CONTROLS_AUTO_CLOSE_MS);
  }, [clearAudioControlsIdleClose]);

  useEffect(() => {
    if (!session?.user?.id || !gameId) return;

    const fetchGame = async () => {
      try {
        const res = await fetch(
          `/api/rooms/get-room-by-id/${gameId}?userId=${session?.user.id}`,
        );
        const data = await res.json();

        if (!res.ok) {
          showAlert({
            type: "error",
            message: data.error || "Error de conexión",
          });
          if (res.status === 403 || res.status === 404) {
            router.replace("/");
          }
          return;
        }

        setGame(data);
        setLoadingGame(false);
      } catch (error) {
        showAlert({ type: "error", message: "Error de conexión" });
      } finally {
        setLoadingGame(false);
      }
    };

    fetchGame();
  }, [gameId, session?.user?.id, showAlert, router]);

  useEffect(() => {
    if (!game?.id || !session?.user?.id) return;
    const me = game.players.find((p) => p.userId === session.user.id);
    if (!me) return;
    if (gameIdForPrefsHydrationRef.current === game.id) return;
    gameIdForPrefsHydrationRef.current = game.id;
    setDesktopScoreSheetPrefs(parseScoreSheetPrefs(me.scoreSheetPrefs));
  }, [game, session?.user?.id]);

  useEffect(() => {
    return () => {
      if (scoreSheetPrefsSaveTimerRef.current) {
        clearTimeout(scoreSheetPrefsSaveTimerRef.current);
      }
    };
  }, []);

  const persistScoreSheetPrefs = useCallback(
    async (prefs: DesktopScoreSheetPrefsV1) => {
      const id = typeof gameId === "string" ? gameId : gameId?.[0];
      if (!id || !session?.user?.id) return;
      try {
        await fetch("/api/game/score-sheet-prefs", {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ gameId: id, prefs }),
        });
      } catch {
        /* silencioso: la UI ya tiene el estado local */
      }
    },
    [gameId, session?.user?.id],
  );

  const onDesktopScoreSheetPrefsChange = useCallback(
    (prefs: DesktopScoreSheetPrefsV1) => {
      setDesktopScoreSheetPrefs(prefs);
      setGame((prev) => {
        if (!prev || !session?.user?.id) return prev;
        return {
          ...prev,
          players: prev.players.map((pl) =>
            pl.userId === session.user.id
              ? { ...pl, scoreSheetPrefs: prefs }
              : pl,
          ),
        };
      });
      if (scoreSheetPrefsSaveTimerRef.current) {
        clearTimeout(scoreSheetPrefsSaveTimerRef.current);
      }
      scoreSheetPrefsSaveTimerRef.current = setTimeout(() => {
        scoreSheetPrefsSaveTimerRef.current = null;
        void persistScoreSheetPrefs(prefs);
      }, 500);
    },
    [persistScoreSheetPrefs, session?.user?.id],
  );

  useEffect(() => {
    if (!session?.user?.id) return;

    socket.on("connect", () => {});
    socket.emit("userOnline", {
      id: session.user.id,
      name: session.user.name,
    });
    socket.on("disconnect", () => {});

    return () => {
      socket.off("connect", () => {});
      socket.off("disconnect", () => {});
    };
  }, [session]);

  useEffect(() => {
    const handleRoll = async (data: {
      diceValues: number[];
      rollCount: number;
      dicesToReroll: number[];
      turnStartedAt?: string | null;
    }) => {
      playDiceSound();
      setRollingLoading(true);
      setDicesToReroll(data.dicesToReroll);

      setGame((prevGame) => {
        if (!prevGame) return prevGame;
        prevDiceForScoreRef.current = {
          diceValues: [...prevGame.diceValues],
          rollCount: prevGame.rollCount,
        };
        return {
          ...prevGame,
          diceValues: data.diceValues,
          rollCount: data.rollCount,
          turnStartedAt:
            data.turnStartedAt !== undefined
              ? data.turnStartedAt
              : prevGame.turnStartedAt,
        };
      });

      await new Promise((resolve) =>
        setTimeout(resolve, ROLL_DICE_UI_HOLD_MS),
      );
      setRollingLoading(false);
      setDicesToReroll([]);
    };

    const handleScoreSubmitted = async (data: {
      currentTurnId: string;
      updatedGameUserId: string;
      updatedValues: GameUser;
      turnStartedAt?: string | null;
    }) => {
      playPencilSound();

      setGame((prevGame) => {
        if (prevGame) {
          return {
            ...prevGame,
            rollCount: 0,
            diceValues: [],
            dicesToReroll: [],
            currentTurnId: data.currentTurnId,
            turnStartedAt:
              data.turnStartedAt !== undefined
                ? data.turnStartedAt
                : prevGame.turnStartedAt,
            players: prevGame.players.map((player) => {
              if (player.user.id === data.updatedValues.userId) {
                const { user } = player;
                const upd = data.updatedValues as GameUser;
                return {
                  ...player,
                  ...upd,
                  user,
                  scoreSheetPrefs:
                    upd.scoreSheetPrefs ?? player.scoreSheetPrefs,
                };
              }
              return player;
            }),
          };
        }
        return prevGame;
      });
      setLoadingSubmit(false);
    };

    socket.on("diceRolled", handleRoll);
    socket.on("scoreSubmitted", handleScoreSubmitted);

    return () => {
      socket.off("diceRolled", handleRoll);
      socket.off("scoreSubmitted", handleScoreSubmitted);
    };
  }, [playDiceSound, playPencilSound]);

  useEffect(() => {
    if (!gameId) return;
    const handleUserLeft = (data: { game?: GameTableProps }) => {
      if (data.game?.id === gameId) setGame(data.game);
    };
    socket.on("userLeft", handleUserLeft);
    return () => {
      socket.off("userLeft", handleUserLeft);
    };
  }, [gameId]);

  useEffect(() => {
    if (!game || !session?.user?.id) {
      prevRollingLoadingRef.current = rollingLoading;
      if (!game) setScoreDiceSettling(false);
      return;
    }
    const isMyTurn = session.user.id === game.currentTurnId;
    if (!isMyTurn) {
      setScoreDiceSettling(false);
      prevRollingLoadingRef.current = rollingLoading;
      return;
    }

    if (rollingLoading) {
      setScoreDiceSettling(true);
      prevRollingLoadingRef.current = true;
      return;
    }

    const wasRolling = prevRollingLoadingRef.current;
    prevRollingLoadingRef.current = false;

    if (wasRolling && game.rollCount >= 1 && game.rollCount <= 3) {
      setScoreDiceSettling(true);
      const settleMs =
        game.rollCount === 3
          ? THIRD_ROLL_SCORE_SETTLE_MS
          : DICE_SETTLE_AFTER_ROLL_MS;
      const t = setTimeout(() => {
        setScoreDiceSettling(false);
      }, settleMs);
      return () => clearTimeout(t);
    }

    setScoreDiceSettling(false);
  }, [
    rollingLoading,
    session?.user?.id,
    game?.id,
    game?.rollCount,
    game?.currentTurnId,
  ]);

  // Abrir el anotador: turno nuevo al instante; tras 3er tiro cuando terminó animación + margen extra.
  // Importante: con rollCount===3 y scoreDiceSettling aún false (p. ej. recién empezó el 3.er tiro),
  // no abrir — esperar a !rollingLoading y al periodo scoreDiceSettling tras cortar la tirada.
  useEffect(() => {
    if (!game || !session?.user?.id) return;
    const isMyTurn = session.user.id === game.currentTurnId;
    if (!isMyTurn) return;
    if (game.rollCount === 0) {
      setScoreBoardOpen(true);
      return;
    }
    if (
      game.rollCount === 3 &&
      !scoreDiceSettling &&
      !rollingLoading
    ) {
      setScoreBoardOpen(true);
    }
  }, [game, session?.user?.id, scoreDiceSettling, rollingLoading]);

  // Al cargar la partida, guardar logros actuales para detectar los nuevos al terminar
  useEffect(() => {
    if (!session?.user?.id || !game) return;
    fetch("/api/users/achievements")
      .then((res) => res.json())
      .then((data: { id: string; unlockedAt: string | null }[]) => {
        if (Array.isArray(data)) {
          previousUnlockedIdsRef.current = new Set(
            data.filter((a) => a.unlockedAt).map((a) => a.id),
          );
        }
      })
      .catch(() => {});
    if (isGameEnded(game)) previousGameEndedRef.current = true;
  }, [session?.user?.id, game?.id]);

  // Cuando la partida termina, buscar logros nuevos y mostrar notificaciones
  useEffect(() => {
    if (!game || !session?.user?.id) return;
    const justEnded = isGameEnded(game);
    if (justEnded && !previousGameEndedRef.current) {
      previousGameEndedRef.current = true;
      fetch("/api/users/achievements")
        .then((res) => res.json())
        .then(
          (
            data: {
              id: string;
              name: string;
              description: string;
              unlockedAt: string | null;
            }[],
          ) => {
            if (!Array.isArray(data)) return;
            const prev = previousUnlockedIdsRef.current;
            const newOnes = data.filter((a) => a.unlockedAt && !prev.has(a.id));
            showAchievement(
              newOnes.map((a) => ({
                id: a.id,
                name: a.name,
                description: a.description,
              })),
            );
            newOnes.forEach((a) => prev.add(a.id));
          },
        )
        .catch(() => {});
    }
    if (!justEnded) previousGameEndedRef.current = false;
  }, [game, session?.user?.id, showAchievement]);

  const applyReactionToTarget = useCallback(
    (
      targetUserId: string,
      data: { type: "emoji" | "phrase"; value: string; fromUserName?: string },
    ) => {
      const id = Date.now();
      setReactions((prev) => ({
        ...prev,
        [targetUserId]: {
          type: data.type,
          value: data.value,
          fromUserName: data.fromUserName,
          id,
        },
      }));
      if (reactionTimeoutsRef.current[targetUserId]) {
        clearTimeout(reactionTimeoutsRef.current[targetUserId]);
      }
      reactionTimeoutsRef.current[targetUserId] = setTimeout(() => {
        setReactions((prev) => ({ ...prev, [targetUserId]: null }));
        delete reactionTimeoutsRef.current[targetUserId];
      }, 3000);
    },
    [],
  );

  useEffect(() => {
    if (!gameId) return;
    const handleGameReaction = (data: {
      targetUserId: string;
      fromUserId: string;
      fromUserName?: string;
      type: "emoji" | "phrase";
      value: string;
    }) => {
      if (data.value === "🎺" && !isMuted) {
        try {
          const audio = new Audio("/sounds/trumpet.mp3");
          audio.volume = 0.4;
          audio.play().catch(() => {});
        } catch (_) {}
      }
      if (data.type === "phrase") {
        applyReactionToTarget(data.fromUserId, data);
        return;
      }
      const fromEl = avatarRefsMap.current[data.fromUserId];
      const toEl = avatarRefsMap.current[data.targetUserId];
      if (fromEl && toEl) {
        const startRect = fromEl.getBoundingClientRect();
        const endRect = toEl.getBoundingClientRect();
        setFlyingReaction({
          fromUserId: data.fromUserId,
          targetUserId: data.targetUserId,
          type: data.type,
          value: data.value,
          fromUserName: data.fromUserName,
          startRect,
          endRect,
        });
      } else {
        applyReactionToTarget(data.targetUserId, data);
      }
    };
    socket.on("gameReaction", handleGameReaction);
    return () => {
      socket.off("gameReaction", handleGameReaction);
      Object.values(reactionTimeoutsRef.current).forEach(clearTimeout);
      reactionTimeoutsRef.current = {};
    };
  }, [gameId, isMuted, applyReactionToTarget]);

  const isMyTurn = !!game && session?.user?.id === game.currentTurnId;
  const gameEnded = isGameEnded(game);

  const liveGameRef = useRef(game);
  liveGameRef.current = game;
  const turnTimeoutFiredKeyRef = useRef<string | null>(null);

  /** Salas con tiempo límite: al vencer, tachar automáticamente (API + socket como submit manual). */
  useEffect(() => {
    if (!game || !session?.user?.id || gameEnded) return;
    const isMyTurnHere = session.user.id === game.currentTurnId;
    if (
      !game.turnTimeout ||
      game.turnTimeout <= 0 ||
      !game.turnStartedAt ||
      !isMyTurnHere
    ) {
      return;
    }
    const key = `${game.id}-${game.currentTurnId}-${game.turnStartedAt}`;
    let cancelled = false;

    const tick = async () => {
      if (cancelled) return;
      const g = liveGameRef.current;
      if (!g || isGameEnded(g)) return;
      if (session.user.id !== g.currentTurnId) return;
      const left = secondsRemainingOnTurn(g.turnStartedAt, g.turnTimeout);
      if (left === null || left > 0) return;
      if (turnTimeoutFiredKeyRef.current === key) return;
      turnTimeoutFiredKeyRef.current = key;
      setLoadingSubmit(true);
      try {
        const res = await fetch("/api/game/turn-timeout", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ gameId: g.id }),
        });
        const data = await res.json();
        if (!res.ok) {
          turnTimeoutFiredKeyRef.current = null;
          showAlert({
            type: "error",
            message: data.error || "No se pudo aplicar el tiempo agotado",
          });
          return;
        }
        if (data.newlyUnlocked?.length) {
          showAchievement(data.newlyUnlocked);
        }
        showAlert({
          type: "warning",
          message: "Tiempo agotado: se tachó la primera categoría libre.",
        });
        socket.emit("submitScore", {
          players: g.players.map((p) => p.user),
          currentTurnId: data.currentTurnId,
          updatedGameUserId: session.user.id,
          updatedValues: data.updatedValues,
          turnStartedAt: data.turnStartedAt ?? null,
        });
      } catch {
        turnTimeoutFiredKeyRef.current = null;
        showAlert({ type: "error", message: "Error de conexión" });
      } finally {
        setLoadingSubmit(false);
      }
    };

    const id = setInterval(() => {
      void tick();
    }, 1000);
    void tick();
    return () => {
      cancelled = true;
      clearInterval(id);
    };
  }, [
    game?.id,
    game?.currentTurnId,
    game?.turnStartedAt,
    game?.turnTimeout,
    gameEnded,
    session?.user?.id,
    showAlert,
    showAchievement,
  ]);

  const scoreSheetInputLocked =
    !!game &&
    isMyTurn &&
    (rollingLoading || scoreDiceSettling) &&
    game.rollCount >= 1 &&
    game.rollCount <= 3;

  const diceValuesForScoreTable = !game
    ? []
    : scoreSheetInputLocked
      ? [...prevDiceForScoreRef.current.diceValues]
      : game.diceValues;
  const rollCountForScoreTable = !game
    ? 0
    : scoreSheetInputLocked
      ? prevDiceForScoreRef.current.rollCount
      : game.rollCount;

  const currentTurnPlayer = useMemo(() => {
    if (!game?.currentTurnId) return null;
    return game.players.find((p) => p.userId === game.currentTurnId) ?? null;
  }, [game]);

  const diceValuesHintKey = diceValuesForScoreTable.join(",");

  const markHints = useMemo(() => {
    if (!currentTurnPlayer || !isMyTurn) return [];
    if (diceValuesForScoreTable.length !== 5) return [];
    if (rollCountForScoreTable < 1) return [];
    return getPossibleMarkHints(
      currentTurnPlayer,
      diceValuesForScoreTable,
      rollCountForScoreTable,
    );
  }, [
    currentTurnPlayer,
    isMyTurn,
    diceValuesHintKey,
    rollCountForScoreTable,
  ]);

  const handleQuickMarkHint = useCallback(
    async (category: string, score: number) => {
      if (!game || !session?.user?.id || !isMyTurn) return;
      if (game.currentTurnId !== session.user.id) return;
      if (loadingSubmit || scoreSheetInputLocked) return;
      if (
        !diceValuesHintKey ||
        diceValuesHintKey.split(",").length !== 5
      )
        return;
      if (rollCountForScoreTable < 1) return;

      setSubmittingQuickCategory(category);
      setLoadingSubmit(true);
      try {
        const res = await fetch(`/api/game/submit-score`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            gameUserId: game.currentTurnId,
            gameId: game.id,
            category,
            score,
          }),
        });
        const data = await res.json();

        if (res.status === 408) {
          showAlert({
            type: "warning",
            message: data.error || "Se acabó el tiempo de esta tirada",
          });
        } else if (!res.ok) {
          showAlert({
            type: "error",
            message: data.error || "Error al guardar la puntuación",
          });
        } else {
          if (data.newlyUnlocked?.length) {
            showAchievement(data.newlyUnlocked);
            (data.newlyUnlocked as { id: string }[]).forEach((a) =>
              previousUnlockedIdsRef.current.add(a.id),
            );
          }
          socket.emit("submitScore", {
            players: game.players.map((p) => p.user),
            currentTurnId: data.currentTurnId,
            updatedGameUserId: game.currentTurnId,
            updatedValues: data.updatedValues,
            turnStartedAt: data.turnStartedAt ?? null,
          });
        }
      } catch {
        showAlert({
          type: "error",
          message: "Error al guardar la puntuación",
        });
      } finally {
        setLoadingSubmit(false);
        setSubmittingQuickCategory(null);
      }
    },
    [
      game,
      session?.user?.id,
      isMyTurn,
      loadingSubmit,
      scoreSheetInputLocked,
      diceValuesHintKey,
      rollCountForScoreTable,
      showAlert,
      showAchievement,
    ],
  );

  const sendReaction = useCallback(
    (targetUserId: string, choice: ReactionChoice) => {
      if (!game || !session?.user?.id) return;
      socket.emit("gameReaction", {
        gameId,
        playerIds: game.players.map((p) => p.userId),
        targetUserId,
        fromUserId: session.user.id,
        fromUserName: session.user.name ?? undefined,
        type: choice.type,
        value: choice.value,
      });
      setReactionPickerTarget(null);
    },
    [game, gameId, session?.user?.id, session?.user?.name],
  );

  const handleLeaveGame = async () => {
    if (!session?.user?.id || !gameId || isLeaving) return;
    if (gameEnded) {
      router.push("/");
      return;
    }
    const ok = await showConfirm({
      title: "Salir de la partida",
      message:
        "¿Salir de la partida? Si queda un solo jugador, ganará la partida.",
      confirmLabel: "Salir",
      cancelLabel: "Cancelar",
      danger: true,
    });
    if (!ok) return;
    setIsLeaving(true);
    try {
      const res = await fetch("/api/game/leave", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId: session.user.id, gameId }),
      });
      const data = await res.json();
      if (!res.ok) {
        showAlert({ type: "error", message: data.error || "Error al salir" });
        return;
      }
      socket.emit("leaveGame", { game: data, user: session.user });
      router.push("/");
    } catch (error) {
      showAlert({ type: "error", message: "Error de conexión" });
    } finally {
      setIsLeaving(false);
    }
  };

  const handleShare = async () => {
    const url =
      typeof window !== "undefined"
        ? `${window.location.origin}/game/${gameId}`
        : "";
    const winnerName = winners.length === 1 ? winners[0].user.name : "Empate";
    const iWon =
      session?.user?.id && winners.some((w) => w.userId === session.user.id);
    const text = iWon
      ? `Acabo de ganar una de Generala 🎲 Mirá el resultado: ${url}`
      : `Partida de Generala: ${winnerName} ganó. Revisá el cuadro 👀 ${url}`;
    const title = "Generala";
    try {
      if (typeof navigator !== "undefined" && navigator.share) {
        await navigator.share({
          title,
          text,
          url,
        });
        showAlert({ type: "success", message: "¡Compartido!" });
      } else {
        await navigator.clipboard.writeText(text);
        showAlert({
          type: "success",
          message: "Enlace copiado al portapapeles",
        });
      }
    } catch (e) {
      if ((e as Error).name !== "AbortError") {
        await navigator.clipboard.writeText(text).catch(() => {});
        showAlert({
          type: "success",
          message: "Enlace copiado al portapapeles",
        });
      }
    }
  };

  const handleRevancha = async () => {
    if (!session?.user?.id || !game || isRevanchaLoading) return;
    const otherPlayers = game.players.filter(
      (p) => p.userId !== session.user?.id,
    );
    setIsRevanchaLoading(true);
    try {
      const roomName = `Revancha-${Date.now()}`;
      const numPlayers = Math.max(game.players.length, 2);
      const createRes = await fetch("/api/rooms/create-room", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: roomName,
          ownerId: session.user.id,
          maxPlayers: numPlayers,
          minPlayers: Math.min(2, numPlayers),
        }),
      });
      const newRoom = await createRes.json();
      if (!createRes.ok) {
        showAlert({
          type: "error",
          message: newRoom.error || "No se pudo crear la sala de revancha",
        });
        return;
      }
      for (const player of otherPlayers) {
        try {
          const inviteRes = await fetch("/api/rooms/invite-room", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ roomId: newRoom.id, userId: player.userId }),
          });
          const inviteData = await inviteRes.json();
          if (inviteRes.ok && inviteData.receiver) {
            socket.emit("inviteGame", inviteData);
          }
        } catch {
          // seguir con el resto si falla una invitación
        }
      }
      showAlert({
        type: "success",
        message:
          otherPlayers.length > 0
            ? "Sala de revancha creada. Invitaciones enviadas."
            : "Sala de revancha creada.",
      });
      router.push("/");
    } catch (error) {
      showAlert({ type: "error", message: "Error al crear la revancha" });
    } finally {
      setIsRevanchaLoading(false);
    }
  };

  useEffect(() => {
    if (!isMyTurn || rollingLoading || gameEnded) {
      setShowTurnHint(false);
      return;
    }
    if ((game?.rollCount ?? 0) >= 3) {
      setShowTurnHint(false);
      return;
    }
    const show = setTimeout(() => setShowTurnHint(true), 5000);
    return () => clearTimeout(show);
  }, [isMyTurn, rollingLoading, gameEnded, game?.rollCount]);

  useEffect(() => {
    if (!showTurnHint) return;
    const hide = setTimeout(() => setShowTurnHint(false), 5000);
    return () => clearTimeout(hide);
  }, [showTurnHint]);

  useEffect(() => {
    if (!isMyTurn || rollingLoading || gameEnded || scoreDiceSettling) {
      setShowScoreHint(false);
      return;
    }
    if (game?.rollCount !== 3) {
      setShowScoreHint(false);
      return;
    }
    const show = setTimeout(() => setShowScoreHint(true), 800);
    return () => clearTimeout(show);
  }, [isMyTurn, rollingLoading, gameEnded, game?.rollCount, scoreDiceSettling]);

  useEffect(() => {
    if (!showScoreHint) return;
    const hide = setTimeout(() => setShowScoreHint(false), 8000);
    return () => clearTimeout(hide);
  }, [showScoreHint]);

  useEffect(() => {
    if (!audioControlsOpen) {
      clearAudioControlsIdleClose();
      return;
    }
    scheduleAudioControlsAutoClose();
    return clearAudioControlsIdleClose;
  }, [
    audioControlsOpen,
    clearAudioControlsIdleClose,
    scheduleAudioControlsAutoClose,
  ]);

  if (status === "loading") {
    return (
      <div className="flex min-h-dvh items-center justify-center bg-(--color-black-matte)">
        <LoadingOverlay text="Cargando sesión..." backdropOpacity={0.95} />
      </div>
    );
  }

  if (loadingGame) {
    return (
      <div className="flex min-h-dvh items-center justify-center bg-(--color-black-matte)">
        <LoadingOverlay text="Cargando juego..." backdropOpacity={0.95} />
      </div>
    );
  }

  if (!game) {
    return (
      <div className="flex items-center justify-center h-screen bg-(--color-black-matte)">
        <p className="text-lg sm:text-2xl text-(--color-pearl-white) font-poppins">
          El juego no existe o no tienes permiso de acceso
        </p>
      </div>
    );
  }

  const toggleBackSound = () => {
    if (!backSoundRef.current) return;
    const audio = backSoundRef.current;

    if (isSoundPlaying) {
      audio.pause();
      if (typeof window !== "undefined")
        localStorage.setItem(GENERALA_MUSIC_PAUSED_KEY, "true");
    } else {
      if (typeof window !== "undefined")
        localStorage.setItem(GENERALA_MUSIC_PAUSED_KEY, "false");
      void audio.play().catch(() => setIsSoundPlaying(false));
    }

    setIsSoundPlaying((prev) => !prev);
  };

  const getWinnersAndRanking = () => {
    const completedPlayers = game.players
      .filter((player) => typeof player.totalScore === "number")
      .sort((a, b) => b.totalScore! - a.totalScore!);

    if (completedPlayers.length === 0) return { winners: [], ranking: [] };

    const maxScore = completedPlayers[0].totalScore!;
    const winners = completedPlayers.filter((p) => p.totalScore === maxScore);

    return { winners, ranking: completedPlayers };
  };

  const { winners, ranking } = getWinnersAndRanking();
  const isPlayerInGame =
    game?.players?.some((p) => p.userId === session?.user?.id) ?? false;

  return (
    <div className="relative w-full min-h-dvh h-screen overflow-hidden bg-(--color-black-matte) font-quicksand">
      {/* Área de juego: siempre a pantalla completa */}
      <div className="absolute inset-0 flex flex-col">
        {/* Barra superior: un solo Salir a la izquierda, Anotador al lado cuando el panel está cerrado */}
        <div className="flex items-center gap-2 px-3 py-2 mt-2 shrink-0 safe-area-top h-[44px]">
          <motion.button
            type="button"
            onClick={handleLeaveGame}
            disabled={isLeaving}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-quicksand text-(--color-pearl-white)/90 hover:text-(--color-pearl-white) hover:bg-white/10 transition disabled:opacity-50"
            whileTap={{ scale: 0.98 }}
          >
            {isLeaving ? (
              <span className="animate-pulse">Saliendo…</span>
            ) : (
              <>
                <LogOut className="h-4 w-4" />
                <span className="hidden sm:inline">Salir</span>
              </>
            )}
          </motion.button>
          {!gameEnded && (
            <motion.button
              type="button"
              onClick={() => setScoreBoardOpen(true)}
              className="flex items-center gap-2 px-3 py-2 rounded-xl text-sm font-quicksand font-medium bg-(--color-metallic-gold)/20 text-(--color-metallic-gold) border border-(--color-metallic-gold)/50 hover:bg-(--color-metallic-gold)/30 transition"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
            >
              <ClipboardList className="h-5 w-5" />
              Anotador
            </motion.button>
          )}
        </div>

        <div className="flex-1 relative min-h-0">
          <div
            className="absolute bottom-2 sm:bottom-4 right-2 sm:right-4 flex flex-row items-center gap-2 z-100 safe-area-bottom"
            onPointerDown={() => {
              if (audioControlsOpen) scheduleAudioControlsAutoClose();
            }}
          >
            <AnimatePresence>
              {audioControlsOpen && (
                <motion.div
                  initial={{ opacity: 0, x: 8 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 8 }}
                  transition={{ duration: 0.2 }}
                  className="flex flex-row gap-2"
                >
                  <motion.button
                    className="min-h-[44px] min-w-[44px] flex items-center justify-center shrink-0 bg-(--color-pearl-white) text-(--color-black-matte) p-2 rounded-full shadow-md border-2 border-(--color-metallic-gold) hover:bg-(--color-silver-gray) transition"
                    onClick={toggleMute}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    aria-label={
                      isMuted ? "Activar sonido" : "Silenciar efectos"
                    }
                  >
                    {isMuted ? (
                      <VolumeX className="h-4 w-4 sm:h-5 sm:w-5 text-(--color-black-matte)" />
                    ) : (
                      <Volume2 className="h-4 w-4 sm:h-5 sm:w-5 text-(--color-black-matte)" />
                    )}
                  </motion.button>
                  <motion.button
                    className="min-h-[44px] min-w-[44px] flex items-center justify-center shrink-0 bg-(--color-pearl-white) text-(--color-black-matte) p-2 rounded-full shadow-md border-2 border-(--color-metallic-gold) hover:bg-(--color-silver-gray) transition"
                    onClick={toggleBackSound}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    aria-label={
                      isSoundPlaying ? "Pausar música" : "Reproducir música"
                    }
                  >
                    {isSoundPlaying ? (
                      <Music className="h-4 w-4 sm:h-5 sm:w-5 text-(--color-black-matte)" />
                    ) : (
                      <span className="relative inline-flex items-center justify-center">
                        <Music className="h-4 w-4 sm:h-5 sm:w-5 text-(--color-black-matte) opacity-60" />
                        <span
                          className="absolute inset-0 flex items-center justify-center pointer-events-none"
                          aria-hidden
                        >
                          <span className="block w-[130%] h-0.5 rotate-45 bg-(--color-black-matte) opacity-90 rounded-full" />
                        </span>
                      </span>
                    )}
                  </motion.button>
                </motion.div>
              )}
            </AnimatePresence>
            <motion.button
              className="min-h-[44px] min-w-[44px] flex items-center justify-center bg-(--color-pearl-white) text-(--color-black-matte) p-2 rounded-full shadow-md border-2 border-(--color-metallic-gold) hover:bg-(--color-silver-gray) transition"
              onClick={() => setAudioControlsOpen((o) => !o)}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              aria-label={
                audioControlsOpen
                  ? "Cerrar controles de audio"
                  : "Sonido y música"
              }
            >
              <Volume2 className="h-4 w-4 sm:h-5 sm:w-5 text-(--color-black-matte)" />
            </motion.button>
          </div>
          <div
            ref={gameSurfaceRef}
            className='relative w-full h-full overflow-hidden shadow-xl z-50 bg-[url("/table-mobile.png")] sm:bg-[url("/table-desktop.png")] bg-cover bg-no-repeat bg-center'
          >
            {/* Sonido timeout (5s): usa isMuted = efectos; isSoundPlaying es solo música de fondo */}
            {game.players.map((player, index) => (
              <PlayerSlot
                key={player.userId}
                player={player}
                position={index}
                isCurrentTurn={player.userId === game.currentTurnId}
                turnTimeoutSec={game.turnTimeout ?? 0}
                turnStartedAt={game.turnStartedAt ?? null}
                totalPlayers={game.players.length}
                players={game.players}
                rollCount={game.rollCount}
                reaction={reactions[player.userId] ?? null}
                onReactionClick={
                  player.userId !== session?.user?.id ||
                  game.players.length === 1
                    ? () => setReactionPickerTarget(player.userId)
                    : undefined
                }
                avatarRef={(el) => {
                  avatarRefsMap.current[player.userId] = el;
                }}
                effectsMuted={isMuted}
              />
            ))}

            {!gameEnded ? (
              <>
                <DiceBoard
                  game={game}
                  rollingLoading={rollingLoading}
                  dicesToReroll={dicesToReroll}
                  setDicesToReroll={setDicesToReroll}
                  rollCount={game.rollCount}
                  isMyTurn={session?.user?.id === game.currentTurnId}
                  markHints={markHints}
                  onQuickSubmit={handleQuickMarkHint}
                  loadingSubmit={loadingSubmit}
                  submittingQuickCategory={submittingQuickCategory}
                  scoreHintsLocked={scoreSheetInputLocked}
                />
                <Cup
                  gamePlayers={game.players}
                  isMyTurn={session?.user?.id === game.currentTurnId}
                  rollCount={game.rollCount}
                  gameId={game.id}
                  rollingLoading={rollingLoading}
                  dicesToReroll={dicesToReroll}
                  setDicesToReroll={setDicesToReroll}
                />
                <AnimatePresence>
                  {showTurnHint && isMyTurn && game.rollCount < 3 && (
                    <motion.div
                      key="turn-hint"
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 8 }}
                      transition={{ duration: 0.25 }}
                      className="absolute bottom-[12%] sm:bottom-[18%] left-1/2 -translate-x-1/2 z-10 w-[calc(100%-1.5rem)] max-w-[90%] sm:max-w-md"
                    >
                      <div className="rounded-xl sm:rounded-2xl bg-(--color-pearl-white)/95 backdrop-blur-sm border border-(--color-metallic-gold) sm:border-2 shadow-lg px-3 py-2 sm:px-4 sm:py-3 text-center">
                        <p className="text-xs sm:text-base font-poppins font-medium text-(--color-sapphire-blue) leading-tight">
                          {game.rollCount === 0 ? (
                            <>🎲 Tocá el cubilete para tirar</>
                          ) : (
                            <>
                              ✨ Tocá los dados que querés volver a tirar y
                              después el cubilete
                            </>
                          )}
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
                <AnimatePresence>
                  {showScoreHint && isMyTurn && game.rollCount === 3 && (
                    <motion.div
                      key="score-hint"
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 8 }}
                      transition={{ duration: 0.25 }}
                      className="absolute bottom-[12%] sm:bottom-[18%] left-1/2 -translate-x-1/2 z-10 w-[calc(100%-1.5rem)] max-w-[90%] sm:max-w-md"
                    >
                      <div className="rounded-xl sm:rounded-2xl bg-(--color-pearl-white)/95 backdrop-blur-sm border border-(--color-metallic-gold) sm:border-2 shadow-lg px-3 py-2 sm:px-4 sm:py-3 text-center">
                        <p className="text-xs sm:text-base font-poppins font-medium text-(--color-sapphire-blue) leading-tight">
                          📝 Tocá una anotación posible abajo o abrí el anotador
                          para elegir categoría.
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
                <ScoreSheetPanel
                  open={scoreBoardOpen}
                  onOpen={() => setScoreBoardOpen(true)}
                  onClose={() => setScoreBoardOpen(false)}
                  gameEnded={gameEnded}
                  gameSurfaceRef={gameSurfaceRef}
                  desktopScoreSheetPrefs={desktopScoreSheetPrefs}
                  onDesktopScoreSheetPrefsChange={onDesktopScoreSheetPrefsChange}
                  players={game.players}
                  currentTurnId={game.currentTurnId}
                  isMyTurn={isMyTurn}
                  diceValues={diceValuesForScoreTable}
                  rollCount={rollCountForScoreTable}
                  loadingSubmit={loadingSubmit}
                  setLoadingSubmit={setLoadingSubmit}
                  onAchievementsShown={(ids) =>
                    ids.forEach((id) => previousUnlockedIdsRef.current.add(id))
                  }
                  diceSettling={scoreSheetInputLocked}
                />
              </>
            ) : (
              <motion.div
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center gap-4 sm:gap-6 select-none bg-(--color-pearl-white) p-4 sm:p-6 rounded-xl shadow-lg border-2 border-(--color-metallic-gold) w-[calc(100%-2rem)] max-w-md max-h-[90dvh] overflow-y-auto safe-area-x"
                initial={{ opacity: 0, scale: 0.85 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ type: "spring", stiffness: 300, damping: 22 }}
              >
                <div className="flex flex-col items-center gap-3 sm:gap-4">
                  <p className="text-xl sm:text-3xl text-(--color-sapphire-blue) font-poppins font-bold drop-shadow-[0_2px_2px_rgba(212,160,23,0.5)]">
                    ¡Juego terminado!
                  </p>
                  {winners.length === 1 ? (
                    <p className="text-base sm:text-2xl text-(--color-black-matte) font-poppins font-bold text-center">
                      {winners[0].user.name} es el ganador!
                    </p>
                  ) : (
                    <p className="text-base sm:text-2xl text-(--color-black-matte) font-poppins font-bold text-center">
                      ¡Empate entre {winners.map((w) => w.user.name).join(", ")}
                      !
                    </p>
                  )}
                </div>

                <div className="flex flex-col gap-2 items-center text-(--color-black-matte)">
                  <p className="text-base sm:text-xl font-poppins font-semibold underline text-(--color-metallic-gold)">
                    Ranking
                  </p>
                  {ranking.map((player, index) => (
                    <div
                      key={player.id}
                      className={`text-sm sm:text-lg ${
                        winners.some((w) => w.id === player.id)
                          ? "text-(--color-sapphire-blue) font-bold"
                          : "text-(--color-silver-gray)"
                      } font-quicksand`}
                    >
                      {index + 1}. {player.user.name} - {player.totalScore} pts
                    </div>
                  ))}
                </div>

                <div className="flex flex-col gap-2 w-full px-4">
                  {isPlayerInGame && (
                    <>
                      <motion.button
                        type="button"
                        onClick={handleShare}
                        className="min-h-[48px] flex-1 flex items-center justify-center gap-2 text-(--color-black-matte) py-2 px-4 sm:px-6 rounded-lg font-poppins font-semibold border-2 border-(--color-metallic-gold) hover:bg-slate-300 transition-all duration-200 text-sm sm:text-base"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <Share2 className="h-5 w-5" />
                        Compartir resultado
                      </motion.button>
                      <motion.button
                        type="button"
                        disabled={isRevanchaLoading}
                        className="min-h-[48px] flex-1 flex items-center justify-center gap-2 bg-(--color-sapphire-blue) text-(--color-pearl-white) py-2 px-4 sm:px-6 rounded-lg font-poppins font-semibold hover:bg-[#2563eb] transition-all duration-200 text-sm sm:text-base disabled:opacity-70"
                        onClick={handleRevancha}
                        whileHover={
                          !isRevanchaLoading ? { scale: 1.02 } : undefined
                        }
                        whileTap={
                          !isRevanchaLoading ? { scale: 0.98 } : undefined
                        }
                      >
                        {isRevanchaLoading ? (
                          <>
                            <CustomLoadingSpinner
                              size="sm"
                              showText={false}
                              color="#fff"
                            />
                            Creando revancha…
                          </>
                        ) : (
                          <>
                            <RefreshCw className="h-5 w-5" />
                            Revancha
                          </>
                        )}
                      </motion.button>
                    </>
                  )}
                  <motion.button
                    className="min-h-[48px] flex-1 flex items-center justify-center gap-2 sm:flex-none bg-(--color-ruby-red) text-(--color-pearl-white) py-2 px-4 sm:px-6 rounded-lg font-poppins font-semibold hover:bg-[#DC2626] transition-all duration-200 text-sm sm:text-base"
                    onClick={() => router.push("/")}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <ArrowLeft className="h-5 w-5" />
                    Volver al lobby
                  </motion.button>
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </div>
      <ReactionPicker
        isOpen={!!reactionPickerTarget}
        onClose={() => setReactionPickerTarget(null)}
        onPick={(choice: ReactionChoice) => {
          if (reactionPickerTarget) sendReaction(reactionPickerTarget, choice);
        }}
      />
      {typeof document !== "undefined" &&
        flyingReaction &&
        createPortal(
          <FlyingReaction
            startRect={flyingReaction.startRect}
            endRect={flyingReaction.endRect}
            reaction={{
              type: flyingReaction.type,
              value: flyingReaction.value,
              fromUserName: flyingReaction.fromUserName,
            }}
            onComplete={() => {
              setFlyingReaction(null);
            }}
          />,
          document.body,
        )}
    </div>
  );
}
