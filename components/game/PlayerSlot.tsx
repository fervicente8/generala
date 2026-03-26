"use client";

import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import { motion, AnimatePresence } from "framer-motion";
import { GameUser } from "@/types";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { Smile } from "lucide-react";
import {
  secondsRemainingOnTurn,
  turnTimeRemainingFraction,
} from "@/lib/turnTimer";

export interface PlayerReaction {
  type: "emoji" | "phrase";
  value: string;
  fromUserName?: string;
  id?: number;
}

interface PlayerSlotProps {
  player: GameUser;
  position: number;
  isCurrentTurn: boolean;
  /** Segundos de límite por tirada (0 = sin límite) */
  turnTimeoutSec?: number;
  /** ISO inicio de la ventana actual (servidor) */
  turnStartedAt?: string | null;
  totalPlayers?: number;
  players: GameUser[];
  rollCount?: number;
  reaction?: PlayerReaction | null;
  onReactionClick?: () => void;
  /** Ref del contenedor del avatar (para animación de reacciones) */
  avatarRef?: (el: HTMLDivElement | null) => void;
  /**
   * Solo “Silenciar efectos” (dados, lápiz, etc.). La música de fondo va aparte
   * y no debe afectar al aviso de timeout.
   */
  effectsMuted?: boolean;
}

/**
 * Borde tipo anillo: arco desde arriba en sentido horario.
 * Tramo “restante” bien visible; tramo gastado oscuro (se ve en toda la vuelta como guía).
 */
function turnRingBackground(remainingFraction: number): string {
  const f = Math.max(0, Math.min(1, remainingFraction));
  const deg = f * 360;
  const urgency = 1 - f;
  const hue = Math.round(132 - urgency * 120);
  const main = `hsl(${hue} 96% 38%)`;
  const hot = `hsl(${Math.max(42, hue - 12)} 100% 58%)`;
  const track = "hsla(165, 48%, 10%, 0.92)";
  return `conic-gradient(from 0deg, ${hot} 0deg, ${main} ${deg * 0.22}deg, ${main} ${deg}deg, ${track} ${deg}deg, ${track} 360deg)`;
}

export default function PlayerSlot({
  player,
  position,
  isCurrentTurn,
  turnTimeoutSec = 0,
  turnStartedAt = null,
  totalPlayers = 2,
  players,
  rollCount = 0,
  reaction = null,
  onReactionClick,
  avatarRef,
  effectsMuted = false,
}: PlayerSlotProps) {
  const { data: session } = useSession();
  const prevSecsRef = useRef<number | null>(null);
  const timeoutSoundPlayedRef = useRef(false);
  const timeoutClockAudioRef = useRef<HTMLAudioElement | null>(null);
  const effectsMutedRef = useRef(effectsMuted);
  effectsMutedRef.current = effectsMuted;
  const [displaySeconds, setDisplaySeconds] = useState<number | null>(null);
  const [remainingFraction, setRemainingFraction] = useState<number | null>(
    null,
  );
  const [avatarErrors, setAvatarErrors] = useState<{ [key: string]: boolean }>(
    {},
  );

  const getPlayerPosition = (index: number, totalPlayers: number) => {
    const positions = [
      "top-2 sm:top-4 left-2 sm:left-4",
      "top-2 sm:top-4 right-2 sm:right-4",
      "bottom-2 sm:bottom-4 left-2 sm:left-4",
      "bottom-2 sm:bottom-4 right-2 sm:right-4",
      "bottom-2 sm:bottom-4 left-1/2 -translate-x-1/2",
    ];
    return positions[index % positions.length];
  };

  const stopTimeoutClockSound = useCallback(() => {
    const a = timeoutClockAudioRef.current;
    if (a) {
      a.pause();
      a.currentTime = 0;
      timeoutClockAudioRef.current = null;
    }
  }, []);

  useEffect(() => {
    timeoutSoundPlayedRef.current = false;
    prevSecsRef.current = null;
    stopTimeoutClockSound();
  }, [turnStartedAt, isCurrentTurn, stopTimeoutClockSound]);

  /** Cortar el reloj al tirar (`rollCount` sube) o al cambiar el turno. */
  useEffect(() => {
    stopTimeoutClockSound();
  }, [rollCount, isCurrentTurn, stopTimeoutClockSound]);

  useLayoutEffect(() => {
    if (
      !isCurrentTurn ||
      !turnTimeoutSec ||
      turnTimeoutSec <= 0 ||
      !turnStartedAt
    ) {
      setRemainingFraction(null);
      setDisplaySeconds(null);
      return;
    }

    let rafId = 0;
    const loop = () => {
      const f = turnTimeRemainingFraction(turnStartedAt, turnTimeoutSec);
      const secs = secondsRemainingOnTurn(turnStartedAt, turnTimeoutSec);
      const frac = f ?? 0;
      const prev = prevSecsRef.current;
      if (
        !effectsMutedRef.current &&
        secs !== null &&
        secs > 0 &&
        !timeoutSoundPlayedRef.current &&
        (secs === 5 || (prev !== null && prev > 5 && secs < 5))
      ) {
        timeoutSoundPlayedRef.current = true;
        stopTimeoutClockSound();
        const audio = new Audio("/sounds/timeout.mp3");
        audio.volume = 0.12;
        timeoutClockAudioRef.current = audio;
        const onEnded = () => {
          if (timeoutClockAudioRef.current === audio)
            timeoutClockAudioRef.current = null;
          audio.removeEventListener("ended", onEnded);
        };
        audio.addEventListener("ended", onEnded);
        void audio.play().catch(() => {
          if (timeoutClockAudioRef.current === audio)
            timeoutClockAudioRef.current = null;
        });
      }
      prevSecsRef.current = secs;
      setRemainingFraction(frac);
      setDisplaySeconds(secs);
      if (frac > 0.001) {
        rafId = requestAnimationFrame(loop);
      }
    };
    rafId = requestAnimationFrame(loop);
    return () => {
      cancelAnimationFrame(rafId);
      stopTimeoutClockSound();
    };
  }, [
    isCurrentTurn,
    turnTimeoutSec,
    turnStartedAt,
    stopTimeoutClockSound,
  ]);

  const handleImageError = (playerId: string) => {
    setAvatarErrors((prev) => ({ ...prev, [playerId]: true }));
  };

  const showTimer =
    isCurrentTurn &&
    turnTimeoutSec > 0 &&
    turnStartedAt &&
    displaySeconds !== null;

  const showTurnRing =
    isCurrentTurn &&
    turnTimeoutSec > 0 &&
    !!turnStartedAt &&
    remainingFraction !== null;

  const positionClass = getPlayerPosition(position, totalPlayers);

  /** Radio interior = radio exterior (1rem) − padding del anillo, para esquinas concéntricas. */
  const cardClass = `relative z-[1] flex flex-col items-center backdrop-blur-md px-2 sm:px-4 py-2 sm:py-4 shadow-lg transition-all ${
    showTurnRing
      ? "rounded-[calc(1rem-0.3rem)] sm:rounded-[calc(1rem-0.45rem)]"
      : "rounded-xl"
  } ${
    showTurnRing
      ? "scale-105 bg-linear-to-b from-(--color-pearl-white)/95 via-emerald-50/90 to-teal-50/85 ring-1 ring-(--color-metallic-gold)/35 shadow-[inset_0_1px_0_rgba(255,255,255,0.9)]"
      : isCurrentTurn
        ? "ring-2 ring-(--color-sapphire-blue) scale-105 bg-(--color-pearl-white)/30"
        : "bg-(--color-pearl-white)/20"
  } ${onReactionClick ? "min-w-30 sm:min-w-34 w-auto max-w-xs" : "w-24 sm:w-32 max-w-xs"}`;

  const nameTextClass = showTurnRing
    ? "text-(--color-sapphire-blue) drop-shadow-none"
    : "text-(--color-pearl-white)";

  const inner = (
    <motion.div
      className={cardClass}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
    >
      <span
        className={`font-poppins font-semibold text-xs sm:text-sm mb-1 sm:mb-2 max-w-full truncate ${nameTextClass}`}
      >
        {player.user.name} {player.userId === session?.user?.id && "(Yo)"}
      </span>
      <div className="relative inline-flex items-center gap-1.5 sm:gap-2">
        <div className="relative" ref={avatarRef}>
          <AnimatePresence>
            {reaction && (
              <motion.div
                key={reaction.id ?? reaction.value}
                initial={{ opacity: 0, scale: 0.5, y: 4 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ type: "spring", stiffness: 400, damping: 20 }}
                className="absolute left-1/2 -translate-x-1/2 -top-2 sm:-top-3 z-10 pointer-events-none flex flex-col items-center"
              >
                <span
                  className={`${
                    reaction.type === "emoji"
                      ? "text-2xl sm:text-3xl leading-none"
                      : "text-[10px] sm:text-xs font-quicksand font-semibold text-center px-2 py-1 rounded-lg bg-(--color-pearl-white)/95 text-(--color-black-matte) shadow-md max-w-[130px] truncate"
                  }`}
                >
                  {reaction.value}
                </span>
              </motion.div>
            )}
          </AnimatePresence>
          <Image
            src={
              avatarErrors[player.userId] || !player.user.image
                ? "/default-avatar.png"
                : player.user.image
            }
            alt="Foto de perfil"
            width={40}
            height={40}
            className="rounded-full object-cover sm:w-12 sm:h-12"
            unoptimized
            onError={() => handleImageError(player.userId)}
          />
        </div>
        {onReactionClick && (
          <button
            type="button"
            onClick={onReactionClick}
            className="absolute bottom-[-8px] right-[-8px] flex items-center justify-center w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-amber-500/90 hover:bg-amber-500 text-white border-2 border-amber-200/80 shadow focus:outline-none focus:ring-2 focus:ring-amber-400 shrink-0"
            aria-label="Enviar reacción"
          >
            <Smile className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>
        )}
      </div>
      {showTimer && (
        <span
          className={`text-xs absolute bottom-1 sm:bottom-2 right-1 sm:right-2 font-quicksand font-semibold tabular-nums ${
            displaySeconds !== null && displaySeconds <= 10
              ? "text-red-200 drop-shadow-[0_0_6px_rgba(0,0,0,0.8)]"
              : "text-(--color-sapphire-blue)"
          }`}
        >
          {displaySeconds}s
        </span>
      )}
      {isCurrentTurn && (
        <div className="flex gap-1 sm:gap-2 mt-2 sm:mt-3">
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full border-2 ${
                i < (rollCount ?? 0)
                  ? "border-(--color-sapphire-blue) bg-(--color-sapphire-blue)"
                  : showTurnRing
                    ? "border-(--color-sapphire-blue)/45 bg-white/40"
                    : "border-(--color-pearl-white) bg-transparent"
              }`}
              initial={{ scale: 0 }}
              animate={{
                scale: i < (rollCount ?? 0) ? 1.2 : 1,
              }}
              transition={{
                type: "spring",
                stiffness: 300,
                damping: 10,
                bounce: 0.5,
              }}
            />
          ))}
        </div>
      )}
    </motion.div>
  );

  return (
    <div className={`absolute ${positionClass}`}>
      {showTurnRing && remainingFraction !== null ? (
        <div
          className="rounded-xl p-2 shadow-xl ring-2 ring-amber-900/25"
          style={{
            background: turnRingBackground(remainingFraction),
            boxShadow:
              remainingFraction < 0.2
                ? "0 0 22px 5px hsla(12, 95%, 40%, 0.55), 0 4px 14px rgba(0,0,0,0.35)"
                : remainingFraction < 0.45
                  ? "0 0 18px 4px hsla(45, 100%, 46%, 0.45), 0 4px 14px rgba(0,0,0,0.3)"
                  : "0 0 0 2px rgba(0,0,0,0.12), 0 6px 20px rgba(0,0,0,0.28)",
          }}
          aria-hidden
        >
          {inner}
        </div>
      ) : (
        inner
      )}
    </div>
  );
}
