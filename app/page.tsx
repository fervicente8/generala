"use client";

import { Game, GameUser, User, UserFriendship } from "@/types";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import {
  LogOut,
  Search,
  X,
  LockIcon,
  Trash2,
  Eye,
  EyeOff,
  ChartColumnIncreasing,
  CircleHelp,
  Trophy,
  Medal,
  Zap,
  Sparkles,
  Users,
  ChevronDown,
} from "lucide-react";
import { RankingGlassCard } from "@/components/home/RankingGlassCard";
import { motion, AnimatePresence } from "framer-motion";
import CustomLoadingSpinner from "@/components/ui/CustomLoadingSpinner";
import LoadingOverlay from "@/components/ui/LoadingOverlay";
import { socket } from "@/lib/socket";
import FriendCard from "@/components/friends/FriendCard";
import FriendsRequests from "@/components/friends/FriendsRequests";
import { useAlert } from "@/components/ui/CustomAlert";
import { StatsModal } from "@/components/stats/StatsModal";
import { AchievementsModal } from "@/components/achievements/AchievementsModal";
import Image from "next/image";

export default function MainMenu() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [isLoadingRooms, setIsLoadingRooms] = useState(false);
  const [rooms, setRooms] = useState<Game[]>([]);
  const [friends, setFriends] = useState<UserFriendship[]>([]);
  const [isLoadingFriends, setIsLoadingFriends] = useState(false);
  const [search, setSearch] = useState("");
  const [friendSearch, setFriendSearch] = useState("");
  const [friendResults, setFriendResults] = useState<User[]>([]);
  const [isSearchingFriends, setIsSearchingFriends] = useState(false);
  const [passwordModal, setPasswordModal] = useState<string | null>(null);
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isCreatingRoom, setIsCreatingRoom] = useState(false);
  const [isDeletingRoom, setIsDeletingRoom] = useState(false);
  const [isJoiningRoom, setIsJoiningRoom] = useState(false);
  const [isLeavingRoom, setIsLeavingRoom] = useState(false);
  const [isStartingGame, setIsStartingGame] = useState(false);
  const [isKickingUser, setIsKickingUser] = useState(false);
  const [gameSettings, setGameSettings] = useState<{
    name: string;
    maxPlayers: number;
    minPlayers: number;
    turnTimeout: number | null;
    password: string;
  }>({
    name: "",
    maxPlayers: 5,
    minPlayers: 2,
    turnTimeout: null,
    password: "",
  });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeRoom, setActiveRoom] = useState<Game | null>(null);
  const [onlineUserIds, setOnlineUserIds] = useState<string[]>([]);
  const { showAlert, showConfirm } = useAlert();
  const [showStats, setShowStats] = useState(false);
  const [statsToShow, setStatsToShow] = useState(null);
  const [isStatsLoading, setIsStatsLoading] = useState(false);
  const [loadingStatsUserId, setLoadingStatsUserId] = useState<string | null>(
    null,
  );
  const [selectedForChallenge, setSelectedForChallenge] = useState<string[]>(
    [],
  );
  const [isCreatingChallenge, setIsCreatingChallenge] = useState(false);
  const [globalRanking, setGlobalRanking] = useState<
    {
      rank: number;
      user: { id: string; name: string; image: string | null };
      gamesWon: number;
      totalPoints: number;
    }[]
  >([]);
  const [friendsRanking, setFriendsRanking] = useState<
    {
      rank: number;
      user: { id: string; name: string; image: string | null };
      gamesWon: number;
      totalPoints: number;
    }[]
  >([]);
  const [globalHighScoreRanking, setGlobalHighScoreRanking] = useState<
    {
      rank: number;
      user: { id: string; name: string; image: string | null };
      highestScore: number;
      gamesPlayed: number;
    }[]
  >([]);
  const [friendsHighScoreRanking, setFriendsHighScoreRanking] = useState<
    {
      rank: number;
      user: { id: string; name: string; image: string | null };
      highestScore: number;
      gamesPlayed: number;
    }[]
  >([]);
  const [rankingsLoading, setRankingsLoading] = useState(false);
  const [showAchievements, setShowAchievements] = useState(false);
  /** Móvil: plegado por defecto. Desktop (lg+): desplegado y sin botón de plegar. */
  const [friendsPanelOpen, setFriendsPanelOpen] = useState(false);

  const isDevMode = process.env.NEXT_PUBLIC_DEV_MODE === "true";

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px)");
    const sync = () => setFriendsPanelOpen(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  useEffect(() => {
    if (status === "authenticated" && session?.user) {
      setIsLoadingFriends(true);
      setIsLoadingRooms(true);

      fetch(`/api/friends?userId=${session.user.id}`)
        .then((res) => res.json())
        .then((data) => {
          setFriends(data || []);
          setIsLoadingFriends(false);
        })
        .catch(() => setIsLoadingFriends(false));

      fetch("/api/rooms")
        .then((res) => res.json())
        .then((data) => {
          const roomsDataWithUpdatedPassword = data?.map((room: Game) => {
            const { password, ...roomWithoutPassword } = room;
            const updatedPassword = password
              ? Math.random().toString(36).substring(2, 10)
              : "";
            return { ...roomWithoutPassword, password: updatedPassword };
          });
          setRooms(roomsDataWithUpdatedPassword || []);
          setIsLoadingRooms(false);
        })
        .catch(() => setIsLoadingRooms(false));
    }
  }, [status, session, activeRoom]);

  useEffect(() => {
    if (!session || !session.user) return;

    const handleCreateRoom = (data: Game) => {
      if (data.ownerId === session?.user?.id) {
        setActiveRoom(data);
      } else {
        setRooms((prevRooms) => [...prevRooms, data]);
      }
    };

    const handleDeleteRoom = (data: Game) => {
      if (activeRoom?.id === data.id) {
        setActiveRoom(null);
        showAlert({ type: "success", message: "Sala eliminada" });
      } else {
        setRooms((prevRooms) =>
          prevRooms.filter((room) => room.id !== data.id),
        );
      }
    };

    const handleUserJoined = (data: any) => {
      setActiveRoom(data.game);
      showAlert({
        type: "success",
        message: `El jugador ${data.user.name} se ha unido a la sala`,
      });
    };

    const handleUserLeft = (data: any) => {
      if (
        data.game.players.find(
          (player: any) => player.userId === session?.user?.id,
        )
      ) {
        setActiveRoom(data.game);
        showAlert({
          type: "success",
          message: `Un jugador se ha ido de la sala`,
        });
      } else {
        setActiveRoom(null);
        showAlert({
          type: "success",
          message: `Has salido de la sala`,
        });
      }
    };

    const handleUserKicked = (data: any) => {
      if (
        data.game.players.find(
          (player: any) => player.userId === session?.user?.id,
        )
      ) {
        setActiveRoom(data.game);
        showAlert({
          type: "success",
          message: `Un jugador ha sido expulsado de la sala`,
        });
      } else {
        setActiveRoom(null);
        showAlert({
          type: "success",
          message: `Te han expulsado de la sala`,
        });
      }
    };

    const handleRemoveFriend = (data: UserFriendship) => {
      if (
        data.receiverId === session?.user?.id ||
        data.requesterId === session?.user?.id
      ) {
        setFriends((prev) => prev.filter((friend) => friend.id !== data.id));
      }
    };

    socket.on("gameCreated", handleCreateRoom);
    socket.on("gameDeleted", handleDeleteRoom);
    socket.on("userJoined", handleUserJoined);
    socket.on("userLeft", handleUserLeft);
    socket.on("playerKicked", handleUserKicked);
    socket.on("friendRemoved", handleRemoveFriend);

    socket.emit("userOnline", {
      id: session.user.id,
      name: session.user.name,
    });

    socket.on("updateOnlineUsers", (data: string[]) => {
      setOnlineUserIds(data);
    });

    socket.on("gameStarted", (data: string) => {
      router.push(`/game/${data}`);
    });

    return () => {
      socket.off("gameCreated", handleCreateRoom);
      socket.off("gameDeleted", handleDeleteRoom);
      socket.off("userJoined", handleUserJoined);
      socket.off("userLeft", handleUserLeft);
      socket.off("playerKicked", handleUserKicked);
      socket.off("friendRemoved", handleRemoveFriend);
      socket.off("updateOnlineUsers");
      socket.off("gameStarted");
    };
  }, [session, activeRoom?.id, router, showAlert]);

  useEffect(() => {
    const fetchActiveRoom = async () => {
      if (!session?.user?.id) return;
      try {
        const res = await fetch(
          `/api/rooms/active-room?userId=${session.user.id}`,
        );
        const data = await res.json();
        if (!res.ok) {
          showAlert({
            type: "error",
            message: data.error || "Error de conexión",
          });
          setActiveRoom(null);
          return;
        }
        if (!data?.id) {
          setActiveRoom(null);
          return;
        }
        const stillInGame = Array.isArray(data.players)
          ? data.players.some(
              (p: { userId: string }) => p.userId === session.user.id,
            )
          : false;
        if (!stillInGame) {
          setActiveRoom(null);
          return;
        }
        if (data.status === "finished") {
          setActiveRoom(null);
        } else if (data.status === "in_progress") {
          router.push(`/game/${data.id}`);
        } else {
          setActiveRoom(data);
        }
      } catch (error) {}
    };
    fetchActiveRoom();
  }, [session, router, showAlert]);

  useEffect(() => {
    if (!friendSearch.trim()) {
      setFriendResults([]);
    }
  }, [friendSearch]);

  useEffect(() => {
    if (!session?.user?.id) return;
    setRankingsLoading(true);
    Promise.allSettled([
      fetch("/api/users/global-ranking?limit=10").then((r) => r.json()),
      fetch("/api/users/friends-ranking").then((r) => r.json()),
      fetch("/api/users/high-score-ranking?limit=10").then((r) => r.json()),
      fetch("/api/users/friends-high-score-ranking").then((r) => r.json()),
    ])
      .then((results) => {
        const safe = (i: number): unknown[] => {
          const r = results[i];
          if (r?.status !== "fulfilled" || !Array.isArray(r.value)) return [];
          return r.value;
        };
        setGlobalRanking(safe(0) as typeof globalRanking);
        setFriendsRanking(safe(1) as typeof friendsRanking);
        setGlobalHighScoreRanking(safe(2) as typeof globalHighScoreRanking);
        setFriendsHighScoreRanking(safe(3) as typeof friendsHighScoreRanking);
      })
      .finally(() => setRankingsLoading(false));
  }, [session?.user?.id]);

  const isInitialLoad =
    status === "authenticated" && isLoadingRooms && isLoadingFriends;

  if (status === "loading") {
    return (
      <div className="flex h-dvh items-center justify-center bg-[#070a10]">
        <LoadingOverlay text="Verificando sesión..." backdropOpacity={0.95} />
      </div>
    );
  }

  if (!session) {
    router.push("/login");
    return null;
  }

  const handleCloseSession = () => {
    signOut({ callbackUrl: "/login" });
  };

  const handleSearchFriends = async () => {
    if (!friendSearch.trim()) return;
    setIsSearchingFriends(true);
    try {
      const res = await fetch(`/api/friends/search?query=${friendSearch}`);
      const data = await res.json();
      const filteredData = data.filter(
        (friend: User) => friend.id !== session.user.id,
      );
      setFriendResults(filteredData || []);
    } finally {
      setIsSearchingFriends(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    let updatedName = name;
    let updatedValue: string | number = value;
    if (name === "roomName") {
      updatedName = "name";
    } else if (name === "minPlayers") {
      updatedValue = Number(value);
    } else if (name === "maxPlayers") {
      updatedValue = Number(value);
    } else if (name === "turnTimeoutAmount") {
      updatedName = "turnTimeout";
      updatedValue = Number(value);
    } else if (name === "roomPassword") {
      updatedName = "password";
      updatedValue = value;
    }
    setGameSettings((prev) => ({ ...prev, [updatedName]: updatedValue }));
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setGameSettings((prev) => ({
      ...prev,
      turnTimeout: e.target.checked ? null : (prev.turnTimeout ?? 30),
    }));
  };

  const handleCreateRoom = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!gameSettings.name.trim()) return;
    const lo = isDevMode ? 1 : 2;
    const minP = Math.max(
      lo,
      Math.min(gameSettings.minPlayers, gameSettings.maxPlayers),
    );
    const maxP = Math.max(minP, Math.min(gameSettings.maxPlayers, 5));
    const turn =
      gameSettings.turnTimeout == null
        ? null
        : Math.min(120, Math.max(10, gameSettings.turnTimeout));
    const payload = {
      ...gameSettings,
      minPlayers: minP,
      maxPlayers: maxP,
      turnTimeout: turn,
      ownerId: session?.user?.id,
    };
    setIsCreatingRoom(true);
    try {
      const res = await fetch("/api/rooms/create-room", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (!res.ok) {
        showAlert({
          type: "error",
          message: data.error || "Error de conexión",
        });
        return;
      }
      socket.emit("createGame", data);
      setIsModalOpen(false);
      setGameSettings({
        name: "",
        maxPlayers: 5, // Updated to support 5 players
        minPlayers: 2,
        turnTimeout: null,
        password: "",
      });
    } catch (error) {
      showAlert({ type: "error", message: "Error al crear la sala" });
    } finally {
      setIsCreatingRoom(false);
    }
  };

  const handleDeleteRoom = async (roomId: string) => {
    if (!roomId) return;
    setIsDeletingRoom(true);
    try {
      const res = await fetch(`/api/rooms/delete-room?roomId=${roomId}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Error al eliminar la sala");
      }
      socket.emit("deleteGame", data);
    } catch (error) {
      showAlert({ type: "error", message: "Error al eliminar la sala" });
    } finally {
      setIsDeletingRoom(false);
    }
  };

  const joinRoom = async (gameId: string, password?: string) => {
    if (!session?.user?.id) return;
    setIsJoiningRoom(true);
    try {
      const res = await fetch("/api/rooms/join-room", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId: session.user.id, gameId, password }),
      });
      const data = await res.json();
      if (!res.ok) {
        showAlert({
          type: "error",
          message: data.error || "Error de conexión",
        });
        return;
      }
      let gameUser: GameUser = {
        id: session.user.id,
        user: session.user as User,
        userId: session.user.id,
        game: data,
        gameId: data.id,
      };
      socket.emit("joinGame", gameUser);
    } catch (error) {
      setPasswordModal(null);
      showAlert({ type: "error", message: "Error de conexión" });
    } finally {
      setIsJoiningRoom(false);
    }
  };

  const leaveRoom = async (gameId: string) => {
    if (!session?.user?.id) return;
    setIsLeavingRoom(true);
    try {
      const res = await fetch("/api/rooms/leave-room", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId: session.user.id, gameId }),
      });
      const data = await res.json();
      if (!res.ok) {
        showAlert({
          type: "error",
          message: data.error || "Error de conexión",
        });
        return;
      }
      let gameUser: GameUser = {
        id: session.user.id,
        user: session.user as User,
        userId: session.user.id,
        game: data,
        gameId: data.id,
      };
      setActiveRoom(null);
      socket.emit("leaveGame", gameUser);
    } catch (error) {
      showAlert({ type: "error", message: "Error de conexión" });
    } finally {
      setIsLeavingRoom(false);
    }
  };

  const handleKickPlayer = async (gameId: string, playerId: string) => {
    setIsKickingUser(true);
    try {
      const res = await fetch("/api/rooms/kick-player", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ roomId: gameId, playerId }),
      });
      const data = await res.json();
      if (!res.ok) {
        showAlert({
          type: "error",
          message: data.error || "Error de conexión",
        });
        return;
      }
      socket.emit("kickPlayer", { game: data, kickedPlayerId: playerId });
    } catch (error) {
      showAlert({ type: "error", message: "Error de conexión" });
    } finally {
      setIsKickingUser(false);
    }
  };

  const startGame = async (room: Game) => {
    const minRequired = isDevMode ? 1 : Math.max(room.minPlayers, 2);
    if (activeRoom && activeRoom.players.length < minRequired) {
      showAlert({
        type: "error",
        message: isDevMode
          ? "Necesitás al menos 1 jugador"
          : `La sala necesita al menos ${room.minPlayers} jugadores`,
      });
      return;
    }
    setIsStartingGame(true);
    try {
      const res = await fetch("/api/rooms/start-game", {
        method: "POST",
        body: JSON.stringify({ roomId: room.id }),
        headers: { "Content-Type": "application/json" },
      });
      const data = await res.json();
      if (!res.ok) {
        showAlert({
          type: "error",
          message: data.error || "Error de conexión",
        });
        return;
      }
      socket.emit("startGame", data);
    } catch (error) {
      console.error("Error al iniciar el juego:", error);
    } finally {
      setIsStartingGame(false);
    }
  };

  const getPlayerStats = async (playerId: string) => {
    setIsStatsLoading(true);
    setLoadingStatsUserId(playerId);
    try {
      const query = session?.user?.id ? `viewerId=${session.user.id}` : "";
      const res = await fetch(
        `/api/users/stats/${playerId}${query ? `?${query}` : ""}`,
      );
      const data = await res.json();
      if (!res.ok) {
        showAlert({
          type: "error",
          message: data.error || "Error al obtener estadísticas",
        });
      }
      setStatsToShow(data);
      setShowStats(true);
    } catch (error) {
      showAlert({ type: "error", message: "Error de conexión" });
    } finally {
      setIsStatsLoading(false);
      setLoadingStatsUserId(null);
    }
  };

  const createChallengeRoom = async () => {
    if (
      !session?.user?.id ||
      selectedForChallenge.length === 0 ||
      isCreatingChallenge
    )
      return;
    setIsCreatingChallenge(true);
    try {
      const roomName = `Desafío-${Date.now()}`;
      const maxPlayers = Math.min(selectedForChallenge.length + 1, 5);
      const res = await fetch("/api/rooms/create-room", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: roomName,
          ownerId: session.user.id,
          maxPlayers,
          minPlayers: 2,
        }),
      });
      const newRoom = await res.json();
      if (!res.ok) {
        showAlert({
          type: "error",
          message: newRoom.error || "No se pudo crear la sala",
        });
        return;
      }
      for (const userId of selectedForChallenge) {
        try {
          const inviteRes = await fetch("/api/rooms/invite-room", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ roomId: newRoom.id, userId }),
          });
          const inviteData = await inviteRes.json();
          if (inviteRes.ok && inviteData.receiver) {
            socket.emit("inviteGame", inviteData);
          }
        } catch {
          // seguir con el resto
        }
      }
      const count = selectedForChallenge.length;
      socket.emit("createGame", newRoom);
      setActiveRoom(newRoom);
      setSelectedForChallenge([]);
      showAlert({
        type: "success",
        message:
          count === 1
            ? "Sala creada. Invitación enviada."
            : `Sala creada. ${count} invitaciones enviadas.`,
      });
    } catch (error) {
      showAlert({ type: "error", message: "Error al crear el desafío" });
    } finally {
      setIsCreatingChallenge(false);
    }
  };

  return (
    <div className="relative flex max-h-dvh min-h-dvh flex-col overflow-hidden bg-[#070a10] font-quicksand text-zinc-100 lg:flex-row">
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_120%_80%_at_50%_-20%,rgba(251,191,36,0.11),transparent)]"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute bottom-0 right-0 h-[min(60%,420px)] w-[min(80%,520px)] translate-x-1/3 translate-y-1/4 rounded-full bg-indigo-600/12 blur-3xl"
        aria-hidden
      />
      {isInitialLoad && (
        <LoadingOverlay
          text="Cargando salas y amigos..."
          backdropOpacity={0.9}
        />
      )}
      <aside className="relative z-10 order-2 flex w-full shrink-0 flex-col border-t border-white/10 bg-zinc-950/85 backdrop-blur-xl lg:order-1 lg:h-auto lg:max-h-none lg:w-[min(100%,22rem)] lg:shrink-0 lg:border-t-0 lg:border-r lg:border-white/10 lg:px-5 lg:py-8 xl:w-96">
        <div className="flex shrink-0 items-center gap-3 px-4 py-3 lg:mb-5 lg:px-0 lg:py-0">
          <div className="flex min-w-0 flex-1 items-center gap-3">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-linear-to-br from-amber-400/25 to-amber-800/20 ring-1 ring-amber-400/25">
              <Image
                src="/dice-icon.png"
                alt=""
                width={28}
                height={28}
                className="h-7 w-7"
              />
            </div>
            <div className="min-w-0">
              <div className="flex flex-wrap items-baseline gap-2">
                <h2 className="font-poppins text-lg font-semibold tracking-tight text-white sm:text-xl">
                  Amigos
                </h2>
                {friends.length > 0 && (
                  <span className="text-xs font-medium text-zinc-500 lg:hidden">
                    {friends.length}{" "}
                    {friends.length === 1 ? "contacto" : "contactos"}
                  </span>
                )}
              </div>
              <p className="text-xs text-zinc-500">
                <span className="hidden lg:inline">
                  Buscá, invitá y desafiá
                </span>
                <span className="lg:hidden">
                  {friendsPanelOpen
                    ? "Buscá, invitá y desafiá"
                    : "Tocá para abrir la lista"}
                </span>
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={() => setFriendsPanelOpen((o) => !o)}
            className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-white/15 bg-white/5 text-zinc-300 hover:bg-white/10 hover:text-white lg:hidden"
            aria-expanded={friendsPanelOpen}
            aria-controls="friends-panel-content"
          >
            <ChevronDown
              className={`h-5 w-5 transition-transform duration-200 ${friendsPanelOpen ? "" : "rotate-180"}`}
              aria-hidden
            />
          </button>
        </div>

        <div
          id="friends-panel-content"
          className={`flex min-h-0 flex-col overflow-y-auto px-4 pb-4 scrollbar-none lg:max-h-none lg:overflow-visible lg:px-0 lg:pb-0 ${
            friendsPanelOpen
              ? "max-lg:flex max-lg:max-h-[min(48dvh,26rem)]"
              : "max-lg:hidden"
          }`}
        >
          {/* Buscador */}
          <div className="relative mt-0 lg:mt-4">
            <input
              type="text"
              placeholder="Buscar amigos..."
              value={friendSearch}
              onChange={(e) => setFriendSearch(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSearchFriends()}
              className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 pr-12 text-sm text-white placeholder:text-zinc-500 focus:border-amber-400/35 focus:outline-none focus:ring-2 focus:ring-amber-400/15 sm:text-base"
            />
            <button
              type="button"
              onClick={() => !isSearchingFriends && handleSearchFriends()}
              disabled={isSearchingFriends}
              className="absolute right-1 top-1/2 flex min-h-[44px] min-w-[44px] -translate-y-1/2 items-center justify-center rounded-lg text-zinc-300 hover:text-white disabled:opacity-70"
              aria-label="Buscar"
            >
              {isSearchingFriends ? (
                <CustomLoadingSpinner
                  size="sm"
                  showText={false}
                  color="#e4e4e7"
                />
              ) : (
                <Search className="h-5 w-5 sm:h-6 sm:w-6" />
              )}
            </button>
          </div>
          {/* Resultados de búsqueda */}
          {friendResults.length > 0 && (
            <div>
              {isSearchingFriends ? (
                <div className="mt-4 sm:mt-5">
                  <CustomLoadingSpinner
                    size="sm"
                    text="Buscando amigos"
                    textColor="#d4d4d8"
                  />
                </div>
              ) : (
                <ul className="mt-4 space-y-2 sm:space-y-3 max-h-[28vh] md:max-h-[40vh] overflow-y-auto scrollbar-none">
                  <AnimatePresence>
                    {friendResults.map((user) => (
                      <motion.li
                        key={user.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.3 }}
                        className="rounded-2xl border border-white/10 bg-white/6 p-3 shadow-inner shadow-black/30 sm:p-4"
                      >
                        <FriendCard
                          sessionUser={session?.user as User}
                          user={user}
                          setFriendSearch={setFriendSearch}
                          setFriendResults={setFriendResults}
                          activeRoom={activeRoom as Game}
                          onlineUserIds={onlineUserIds}
                        />
                      </motion.li>
                    ))}
                  </AnimatePresence>
                </ul>
              )}
            </div>
          )}
          {/* Lista de amigos */}
          {!isSearchingFriends && friendResults.length === 0 && (
            <div>
              {isLoadingFriends ? (
                <div className="mt-4 sm:mt-5">
                  <CustomLoadingSpinner
                    size="sm"
                    text="Cargando amigos"
                    textColor="#d4d4d8"
                  />
                </div>
              ) : friends.length === 0 ? (
                <div className="mt-4 text-center sm:mt-5">
                  <p className="text-sm text-zinc-500 sm:text-base">
                    No tenés amigos agregados.
                  </p>
                  <p className="mt-2 text-xs text-amber-400/80 sm:text-sm">
                    Usá el buscador de arriba para agregar amigos.
                  </p>
                </div>
              ) : (
                <>
                  {!activeRoom && selectedForChallenge.length > 0 && (
                    <motion.div
                      initial={{ opacity: 0, y: -8 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="mt-3 flex items-center justify-between gap-2 rounded-xl border border-emerald-500/35 bg-emerald-500/10 px-3 py-2"
                    >
                      <span className="text-sm text-emerald-50/95">
                        Desafiar a {selectedForChallenge.length}{" "}
                        {selectedForChallenge.length === 1 ? "amigo" : "amigos"}
                      </span>
                      <motion.button
                        type="button"
                        disabled={isCreatingChallenge}
                        onClick={createChallengeRoom}
                        className="flex items-center gap-2 rounded-lg bg-white px-3 py-1.5 font-poppins text-sm font-semibold text-emerald-900 hover:bg-emerald-50 disabled:opacity-70"
                      >
                        {isCreatingChallenge ? (
                          <>
                            <CustomLoadingSpinner
                              size="sm"
                              showText={false}
                              color="#064e3b"
                            />
                            Creando…
                          </>
                        ) : (
                          "Crear sala"
                        )}
                      </motion.button>
                    </motion.div>
                  )}
                  <ul className="mt-4 space-y-2 sm:space-y-3 max-h-[28vh] md:max-h-[40vh] overflow-y-auto scrollbar-none">
                    <AnimatePresence>
                      {friends.map((friend) => {
                        const friendUser =
                          friend.receiver.id === session?.user?.id
                            ? friend.requester
                            : friend.receiver;
                        return (
                          <motion.li
                            key={friend.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.3 }}
                            className="rounded-2xl border border-white/10 bg-white/6 p-3 shadow-inner shadow-black/30 sm:p-4"
                          >
                            <FriendCard
                              sessionUser={session?.user as User}
                              user={friendUser}
                              activeRoom={activeRoom as Game}
                              onlineUserIds={onlineUserIds}
                              onShowStats={getPlayerStats}
                              statsLoadingForUserId={loadingStatsUserId}
                              challengeMode={!activeRoom}
                              selectedForChallenge={selectedForChallenge.includes(
                                friendUser.id,
                              )}
                              onToggleChallenge={
                                !activeRoom
                                  ? (id) =>
                                      setSelectedForChallenge((prev) =>
                                        prev.includes(id)
                                          ? prev.filter((x) => x !== id)
                                          : [...prev, id],
                                      )
                                  : undefined
                              }
                            />
                          </motion.li>
                        );
                      })}
                    </AnimatePresence>
                  </ul>
                </>
              )}
            </div>
          )}
          <div className="mt-4 sm:mt-6">
            <FriendsRequests
              friends={friends}
              setFriends={setFriends}
              setIsJoiningRoom={setIsJoiningRoom}
            />
          </div>
        </div>
      </aside>

      <main className="relative z-10 order-1 flex min-h-0 flex-1 flex-col overflow-y-auto overflow-x-hidden scrollbar-none lg:min-w-0">
        <div className="mx-auto flex w-full max-w-6xl flex-col px-4 py-5 sm:px-6 sm:py-8 lg:max-w-7xl lg:px-10">
          <header className="order-1 mb-8 flex shrink-0 flex-col gap-4 sm:mb-10 lg:flex-row lg:items-center lg:justify-between lg:gap-8">
            <div className="min-w-0">
              <p className="mb-1 flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.2em] text-amber-400/90 sm:text-xs">
                <Sparkles className="h-3.5 w-3.5 shrink-0" aria-hidden />
                Generala online
              </p>
              <h1 className="font-poppins text-2xl font-bold tracking-tight text-white sm:text-3xl lg:text-4xl">
                Hola,{" "}
                <span className="bg-linear-to-r from-amber-200 to-amber-400 bg-clip-text text-transparent">
                  {session.user?.name}
                </span>
              </h1>
            </div>
            <div className="flex flex-wrap items-center gap-2 sm:justify-end">
              <motion.button
                type="button"
                onClick={() => router.push("/how-to-play")}
                className="inline-flex min-h-[44px] items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm font-medium text-zinc-100 backdrop-blur-sm hover:bg-white/10 sm:px-4"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <CircleHelp className="h-4 w-4 shrink-0 text-amber-300/90 sm:h-[18px] sm:w-[18px]" />
                Cómo jugar
              </motion.button>
              <motion.button
                type="button"
                onClick={() => {
                  setStatsToShow(session.user.stats);
                  setShowStats(true);
                }}
                className="inline-flex min-h-[44px] items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm font-medium text-zinc-100 backdrop-blur-sm hover:bg-white/10 sm:px-4"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <ChartColumnIncreasing className="h-4 w-4 shrink-0 text-amber-300/90 sm:h-[18px] sm:w-[18px]" />
                Estadísticas
              </motion.button>
              <motion.button
                type="button"
                onClick={() => setShowAchievements(true)}
                className="inline-flex min-h-[44px] items-center gap-2 rounded-xl border border-amber-400/35 bg-linear-to-br from-amber-500/25 to-amber-700/10 px-3 py-2 text-sm font-semibold text-amber-50 hover:from-amber-500/35 sm:px-4"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Trophy className="h-4 w-4 shrink-0 sm:h-[18px] sm:w-[18px]" />
                Logros
              </motion.button>
              <motion.button
                type="button"
                onClick={handleCloseSession}
                className="inline-flex min-h-[44px] items-center gap-2 rounded-xl border border-red-500/25 bg-red-950/40 px-3 py-2 text-sm font-medium text-red-100 hover:bg-red-950/55 sm:px-4"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <LogOut className="h-4 w-4 shrink-0 sm:h-[18px] sm:w-[18px]" />
                Salir
              </motion.button>
            </div>
          </header>

          {/* Rankings: en desktop van debajo del header; en móvil al final + acordeón cerrado */}
          <section className="order-4 mb-4 mt-4 lg:mt-0 lg:order-2">
            <details className="group/rankings rounded-2xl border border-white/10 bg-white/4 lg:hidden">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-3 rounded-2xl p-4 marker:hidden [&::-webkit-details-marker]:hidden">
                <div className="flex min-w-0 items-center gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-amber-500/15 text-amber-300 ring-1 ring-amber-400/25">
                    <Trophy className="h-5 w-5" aria-hidden />
                  </div>
                  <div className="min-w-0">
                    <span className="block font-poppins text-base font-semibold text-white">
                      Rankings
                    </span>
                    <span className="text-xs text-zinc-500">
                      Victorias y récords · tocá para desplegar
                    </span>
                  </div>
                </div>
                <ChevronDown
                  className="h-5 w-5 shrink-0 text-zinc-400 transition-transform duration-200 group-open/rankings:rotate-180"
                  aria-hidden
                />
              </summary>
              <div className="border-t border-white/10 px-2 pb-4 pt-3">
                <div className="grid grid-cols-1 gap-4">
                  <RankingGlassCard
                    title="Victorias globales"
                    subtitle="Top 10 jugadores"
                    icon={Medal}
                    accent="gold"
                    loading={rankingsLoading}
                    emptyMessage="Ningún jugador registró victorias aún."
                    variant="wins"
                    winsRows={globalRanking}
                  />
                  <RankingGlassCard
                    title="Récord global"
                    subtitle="Mayor puntaje en una partida global"
                    icon={Zap}
                    accent="violet"
                    loading={rankingsLoading}
                    emptyMessage="Ningún jugador registró una partida aún."
                    variant="highScore"
                    highScoreRows={globalHighScoreRanking}
                  />
                  <RankingGlassCard
                    title="Tus amigos"
                    subtitle="Por victorias"
                    icon={Users}
                    accent="emerald"
                    loading={rankingsLoading}
                    emptyMessage="Sin amigos con partidas."
                    variant="wins"
                    winsRows={friendsRanking}
                  />
                  <RankingGlassCard
                    title="Récord de amigos"
                    subtitle="Mayor puntaje en una partida"
                    icon={Zap}
                    accent="sky"
                    loading={rankingsLoading}
                    emptyMessage="Sin amigos con récord aún."
                    variant="highScore"
                    highScoreRows={friendsHighScoreRanking}
                  />
                </div>
              </div>
            </details>

            <div className="hidden lg:block">
              <div className="mb-4 flex items-center gap-3 sm:mb-6">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-amber-500/15 text-amber-300 ring-1 ring-amber-400/25">
                  <Trophy className="h-5 w-5" aria-hidden />
                </div>
                <div>
                  <h2 className="font-poppins text-lg font-semibold text-white sm:text-xl">
                    Rankings
                  </h2>
                  <p className="text-xs text-zinc-500 sm:text-sm">
                    Victorias y mejores puntajes en una partida
                  </p>
                </div>
              </div>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
                <RankingGlassCard
                  title="Victorias globales"
                  subtitle="Top 10 jugadores"
                  icon={Medal}
                  accent="gold"
                  loading={rankingsLoading}
                  emptyMessage="Ningún jugador registró victorias aún."
                  variant="wins"
                  winsRows={globalRanking}
                />
                <RankingGlassCard
                  title="Récord global"
                  subtitle="Mayor puntaje en una partida global"
                  icon={Zap}
                  accent="violet"
                  loading={rankingsLoading}
                  emptyMessage="Ningún jugador registró una partida aún."
                  variant="highScore"
                  highScoreRows={globalHighScoreRanking}
                />
                <RankingGlassCard
                  title="Tus amigos"
                  subtitle="Por victorias"
                  icon={Users}
                  accent="emerald"
                  loading={rankingsLoading}
                  emptyMessage="Sin amigos con partidas."
                  variant="wins"
                  winsRows={friendsRanking}
                />
                <RankingGlassCard
                  title="Récord de amigos"
                  subtitle="Mayor puntaje en una partida"
                  icon={Zap}
                  accent="sky"
                  loading={rankingsLoading}
                  emptyMessage="Sin amigos con récord aún."
                  variant="highScore"
                  highScoreRows={friendsHighScoreRanking}
                />
              </div>
            </div>
          </section>

          {/* Sala activa: todo en flujo (sin barra fija que tape el listado) */}
          {activeRoom && (
            <section className="order-2 mt-0 sm:mt-1 lg:order-3 lg:mt-8 mb-4">
              <h2 className="mb-3 font-poppins text-lg font-semibold text-white sm:mb-4 sm:text-xl">
                Tu sala
              </h2>
              <motion.div
                className="w-full space-y-4 rounded-2xl border border-white/10 bg-white/6 p-4 shadow-[0_20px_40px_-24px_rgba(0,0,0,0.8)] backdrop-blur-md sm:max-w-3xl sm:p-5"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <div>
                  <p className="font-poppins text-lg font-semibold text-white sm:text-xl">
                    {activeRoom.name}
                  </p>
                  <p className="mt-0.5 font-quicksand text-sm text-zinc-400 sm:text-base">
                    {activeRoom.status === "waiting"
                      ? "Esperando jugadores…"
                      : "En juego"}
                  </p>
                </div>

                <div className="-mx-1 flex gap-2 overflow-x-auto overflow-y-visible px-1 pb-1 scrollbar-none sm:flex-wrap sm:overflow-x-visible">
                  {activeRoom.players.map((player) => (
                    <motion.div
                      key={player.id}
                      className="relative shrink-0 flex flex-col items-center rounded-xl border border-white/10 bg-white/10 p-2 sm:p-3"
                      whileHover={{ scale: 1.02 }}
                    >
                      <Image
                        src={player.user.image || "/default-avatar.png"}
                        alt=""
                        width={40}
                        height={40}
                        className="h-9 w-9 rounded-full border-2 border-amber-400/35 sm:h-10 sm:w-10"
                        unoptimized
                      />
                      <span className="mt-1 max-w-18 truncate text-center font-quicksand text-[11px] font-semibold text-white sm:max-w-24 sm:text-xs">
                        {player.user.name}
                      </span>
                      {loadingStatsUserId === player.userId ? (
                        <span className="absolute left-1 top-1 flex h-4 w-4 items-center justify-center">
                          <CustomLoadingSpinner
                            size="sm"
                            showText={false}
                            color="#e4e4e7"
                          />
                        </span>
                      ) : (
                        <ChartColumnIncreasing
                          className="absolute left-1 top-1 h-3.5 w-3.5 cursor-pointer text-amber-300/90 sm:h-4 sm:w-4"
                          onClick={() => getPlayerStats(player.userId)}
                        />
                      )}
                      {session.user.id === activeRoom.ownerId &&
                        player.user.id !== session?.user?.id && (
                          <button
                            type="button"
                            className="absolute right-0.5 top-0.5 rounded p-0.5 text-red-400 hover:bg-red-950/50 disabled:opacity-50"
                            disabled={isKickingUser}
                            onClick={() =>
                              !isKickingUser &&
                              handleKickPlayer(activeRoom.id, player.userId)
                            }
                            aria-label={`Expulsar a ${player.user.name}`}
                          >
                            <X className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                          </button>
                        )}
                    </motion.div>
                  ))}
                </div>

                <div className="flex flex-col gap-3 border-t border-white/10 pt-4 sm:flex-row sm:items-center sm:justify-between">
                  <p className="font-quicksand text-sm text-zinc-400 sm:text-base">
                    {activeRoom.players.length}/{activeRoom.maxPlayers}{" "}
                    jugadores
                  </p>
                  <div className="flex flex-col gap-2 sm:flex-row sm:flex-wrap sm:items-center sm:justify-end sm:gap-2">
                    {activeRoom.ownerId === session?.user?.id ? (
                      <div className="flex w-full items-center gap-2 sm:w-auto">
                        <motion.button
                          type="button"
                          onClick={() =>
                            !isStartingGame &&
                            !isDeletingRoom &&
                            startGame(activeRoom)
                          }
                          className={`flex min-h-[44px] flex-1 items-center justify-center rounded-xl border border-emerald-500/35 bg-emerald-600/80 px-4 py-2.5 font-poppins text-sm font-bold text-white sm:flex-none sm:min-w-40 ${
                            isStartingGame || isDeletingRoom
                              ? "cursor-not-allowed opacity-50"
                              : "hover:bg-emerald-500"
                          }`}
                          whileHover={
                            isStartingGame || isDeletingRoom
                              ? undefined
                              : { scale: 1.02 }
                          }
                          whileTap={
                            isStartingGame || isDeletingRoom
                              ? undefined
                              : { scale: 0.98 }
                          }
                        >
                          Iniciar partida
                        </motion.button>
                        <motion.button
                          type="button"
                          className="flex min-h-[44px] min-w-[44px] shrink-0 items-center justify-center rounded-xl border border-red-500/30 text-red-400 hover:bg-red-950/40 disabled:opacity-50"
                          disabled={isDeletingRoom || isStartingGame}
                          whileTap={{ scale: 0.95 }}
                          onClick={async () => {
                            if (isDeletingRoom || isStartingGame) return;
                            const ok = await showConfirm({
                              title: "Eliminar sala",
                              message:
                                "¿Eliminar la sala? Los jugadores serán expulsados.",
                              confirmLabel: "Eliminar",
                              cancelLabel: "Cancelar",
                              danger: true,
                            });
                            if (ok) handleDeleteRoom(activeRoom.id);
                          }}
                          aria-label="Eliminar sala"
                        >
                          {isDeletingRoom ? (
                            <CustomLoadingSpinner
                              size="sm"
                              showText={false}
                              color="#fecaca"
                            />
                          ) : (
                            <Trash2 className="h-5 w-5" />
                          )}
                        </motion.button>
                      </div>
                    ) : (
                      <motion.button
                        type="button"
                        className={`flex min-h-[44px] w-full items-center justify-center gap-2 rounded-xl border border-red-500/30 bg-red-950/50 px-4 py-2.5 font-poppins font-semibold text-red-100 sm:w-auto sm:min-w-48 ${
                          isLeavingRoom
                            ? "cursor-not-allowed opacity-50"
                            : "hover:bg-red-950/70"
                        }`}
                        onClick={() => {
                          if (!isLeavingRoom) leaveRoom(activeRoom.id);
                        }}
                        whileHover={isLeavingRoom ? undefined : { scale: 1.01 }}
                        whileTap={isLeavingRoom ? undefined : { scale: 0.98 }}
                      >
                        {isLeavingRoom ? (
                          <>
                            <CustomLoadingSpinner
                              size="sm"
                              showText={false}
                              color="#fecaca"
                            />
                            Saliendo…
                          </>
                        ) : (
                          "Salir de la sala"
                        )}
                      </motion.button>
                    )}
                  </div>
                </div>
              </motion.div>
            </section>
          )}

          {/* Listado de salas */}
          <section
            className={`sm:mt-4 lg:order-4  ${activeRoom ? "order-3" : "order-2"}`}
          >
            <div className="mb-4 flex flex-col gap-4 sm:mb-6 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h2 className="font-poppins text-lg font-semibold text-white sm:text-xl">
                  Salas disponibles
                </h2>
                <p className="text-xs text-zinc-500 sm:text-sm">
                  Unite a una partida o creá la tuya
                </p>
              </div>
              <motion.button
                type="button"
                className="w-full rounded-xl border border-amber-400/40 bg-linear-to-br from-amber-500/30 to-amber-800/20 px-5 py-3 font-poppins text-sm font-semibold text-amber-50 shadow-lg shadow-amber-900/20 sm:w-auto"
                onClick={() => setIsModalOpen(true)}
                disabled={isLoadingRooms || activeRoom !== null}
                whileHover={
                  isLoadingRooms || activeRoom !== null
                    ? undefined
                    : { scale: 1.02 }
                }
                whileTap={
                  isLoadingRooms || activeRoom !== null
                    ? undefined
                    : { scale: 0.98 }
                }
                style={{
                  opacity: isLoadingRooms || activeRoom !== null ? 0.45 : 1,
                }}
              >
                + Crear sala
              </motion.button>
            </div>
            <div className="mb-4 flex w-full items-center gap-3 rounded-xl border border-white/10 bg-white/5 px-4 py-3 backdrop-blur-sm">
              <Search
                className="h-5 w-5 shrink-0 text-zinc-500 sm:h-6 sm:w-6"
                aria-hidden
              />
              <input
                type="text"
                placeholder="Buscar por nombre de sala..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="min-w-0 flex-1 bg-transparent font-quicksand text-sm text-white placeholder:text-zinc-500 focus:outline-none sm:text-base"
              />
            </div>
            {isJoiningRoom && (
              <div className="mb-4 flex items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/5 py-3">
                <CustomLoadingSpinner
                  size="sm"
                  text="Uniendo a la sala..."
                  textColor="#d4d4d8"
                />
              </div>
            )}
            {isLoadingRooms || isCreatingRoom ? (
              <CustomLoadingSpinner
                text={isCreatingRoom ? "Creando sala..." : "Cargando salas..."}
              />
            ) : rooms.filter(
                (room) =>
                  activeRoom?.id !== room.id && room.status === "waiting",
              ).length === 0 ? (
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                className="rounded-2xl border border-white/10 bg-white/4 p-8 text-center sm:p-10"
              >
                <p className="mb-2 font-quicksand text-base text-zinc-200 sm:text-lg">
                  No hay salas esperando jugadores.
                </p>
                <p className="mb-6 text-sm text-zinc-500 sm:text-base">
                  Creá una sala e invitá a tus amigos.
                </p>
                <motion.button
                  type="button"
                  className="rounded-xl border border-amber-400/35 bg-amber-500/20 px-6 py-3 font-poppins font-semibold text-amber-50 hover:bg-amber-500/30"
                  onClick={() => setIsModalOpen(true)}
                  disabled={activeRoom !== null}
                  whileHover={activeRoom !== null ? undefined : { scale: 1.03 }}
                  whileTap={activeRoom !== null ? undefined : { scale: 0.98 }}
                >
                  Crear sala
                </motion.button>
              </motion.div>
            ) : rooms.filter(
                (room) =>
                  room.name.includes(search) && room.status === "waiting",
              ).length === 0 ? (
              <p className="font-quicksand text-sm text-zinc-500 sm:text-base">
                No hay salas que coincidan con «{search}».
              </p>
            ) : (
              <ul className="grid gap-3 sm:gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
                <AnimatePresence>
                  {rooms
                    .filter(
                      (room) =>
                        room.name.includes(search) &&
                        activeRoom?.id !== room.id &&
                        room.status === "waiting",
                    )
                    .map((room, index) =>
                      !room ? (
                        <div
                          key={index}
                          className="relative flex items-center justify-center rounded-2xl border border-white/10 bg-white/5 py-6 sm:p-4"
                        >
                          <CustomLoadingSpinner size="md" showText={false} />
                        </div>
                      ) : (
                        <motion.li
                          key={room.id}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -20 }}
                          transition={{ duration: 0.3 }}
                          className={`relative flex items-center rounded-2xl border border-white/10 bg-white/[0.07] p-3 backdrop-blur-sm transition sm:p-4 ${
                            room.players.length >= room.maxPlayers ||
                            isJoiningRoom
                              ? "cursor-not-allowed opacity-60 grayscale"
                              : "cursor-pointer hover:border-amber-400/25 hover:bg-white/10"
                          }`}
                          onClick={() => {
                            if (isJoiningRoom) return;
                            if (activeRoom?.id === room.id) {
                              showAlert({
                                type: "error",
                                message: "Ya estás en esta sala",
                              });
                            } else if (activeRoom?.id) {
                              showAlert({
                                type: "error",
                                message: "Ya estás en una sala",
                              });
                            } else if (room.password) {
                              setPasswordModal(room.id);
                            } else if (room.players.length < room.maxPlayers) {
                              joinRoom(room.id);
                            }
                          }}
                        >
                          <Image
                            src={room.owner.image || "/default-avatar.png"}
                            alt="Avatar"
                            width={32}
                            height={32}
                            className="mr-3 h-8 w-8 rounded-full border-2 border-amber-400/35 sm:mr-4 sm:h-10 sm:w-10"
                            unoptimized
                          />
                          <div className="min-w-0 flex grow flex-col">
                            <span className="truncate font-poppins text-base font-semibold text-white sm:text-lg">
                              {room?.name || "Sin nombre"}
                            </span>
                            <span className="font-quicksand text-xs text-zinc-500 sm:text-sm">
                              {room?.minPlayers ?? 0} a {room?.maxPlayers ?? 0}{" "}
                              jugadores
                            </span>
                          </div>
                          <span className="shrink-0 font-poppins text-sm font-semibold tabular-nums text-amber-200/90 sm:text-base">
                            {room?.players?.length ?? 0}/{room?.maxPlayers ?? 0}
                          </span>
                          {room?.password && (
                            <span className="absolute right-2 top-2 text-zinc-500">
                              <LockIcon size={16} className="sm:w-5 sm:h-5" />
                            </span>
                          )}
                          {passwordModal === room.id && (
                            <motion.div
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              exit={{ opacity: 0 }}
                              transition={{ duration: 0.3 }}
                              className="absolute inset-0 flex cursor-default items-center justify-center rounded-2xl bg-black/65 backdrop-blur-sm"
                            >
                              <motion.div
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                exit={{ scale: 0 }}
                                transition={{ duration: 0.3 }}
                                className="w-[90%] max-w-sm rounded-2xl border border-white/15 bg-zinc-900/95 p-4 shadow-2xl sm:p-6"
                              >
                                <h2 className="mb-2 font-poppins text-base font-semibold text-white sm:text-lg">
                                  Contraseña de la sala
                                </h2>
                                <input
                                  type="password"
                                  placeholder="Contraseña"
                                  className="mb-3 w-full rounded-xl border border-white/15 bg-white/5 px-3 py-2 font-quicksand text-sm text-white placeholder:text-zinc-500 focus:border-amber-400/40 focus:outline-none focus:ring-2 focus:ring-amber-400/20 sm:text-base"
                                  value={password}
                                  onChange={(e) => setPassword(e.target.value)}
                                />
                                <motion.button
                                  type="button"
                                  className="w-full rounded-xl bg-sky-600 px-4 py-2.5 font-poppins text-sm font-semibold text-white hover:bg-sky-500 sm:text-base"
                                  onClick={() => joinRoom(room.id, password)}
                                  whileHover={{ scale: 1.02 }}
                                  whileTap={{ scale: 0.98 }}
                                >
                                  Entrar
                                </motion.button>
                              </motion.div>
                            </motion.div>
                          )}
                        </motion.li>
                      ),
                    )}
                </AnimatePresence>
              </ul>
            )}
          </section>
        </div>
      </main>

      {/* Modal de Creación de Sala */}
      {isModalOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="safe-area-x fixed inset-0 z-50 flex items-end justify-center bg-black/70 p-0 backdrop-blur-sm sm:items-center sm:p-4"
        >
          <motion.div
            initial={{ scale: 0.92, y: 40 }}
            animate={{ scale: 1, y: 0 }}
            className="safe-area-bottom max-h-[90dvh] w-full overflow-y-auto rounded-t-3xl border border-white/10 bg-zinc-900 p-5 shadow-2xl sm:max-w-[95%] sm:rounded-3xl sm:p-7 md:w-[420px]"
          >
            <form onSubmit={(e) => !isCreatingRoom && handleCreateRoom(e)}>
              <div className="mb-5 flex items-center justify-between">
                <h2 className="font-poppins text-lg font-bold text-white sm:text-xl">
                  Crear nueva sala
                </h2>
                <motion.button
                  type="button"
                  whileHover={{ scale: 1.08 }}
                  onClick={() => setIsModalOpen(false)}
                  className="flex min-h-[44px] min-w-[44px] items-center justify-center rounded-xl text-zinc-400 hover:bg-white/10 hover:text-white -mr-2"
                  aria-label="Cerrar"
                >
                  <X className="h-5 w-5 sm:h-6 sm:w-6" />
                </motion.button>
              </div>
              <label
                className="block mb-2 font-quicksand text-zinc-200 text-sm sm:text-base"
                htmlFor="roomName"
              >
                Nombre de la sala
              </label>
              <input
                autoComplete="off"
                type="text"
                name="roomName"
                id="roomName"
                value={gameSettings.name}
                onChange={handleChange}
                className="w-full rounded-xl border border-white/15 bg-white/5 p-2.5 font-quicksand text-sm text-white placeholder:text-zinc-500 focus:border-amber-400/35 focus:outline-none focus:ring-2 focus:ring-amber-400/15 sm:p-3 sm:text-base"
                placeholder={`Sala de ${session.user?.name}`}
                required
                minLength={3}
                maxLength={25}
              />
              <div className="flex flex-col sm:flex-row justify-between gap-4 mt-4">
                <div className="w-full sm:w-1/2">
                  <label
                    className="block mb-2 text-center font-quicksand text-zinc-200 text-sm sm:text-base"
                    htmlFor="minPlayers"
                  >
                    Jugadores mínimos
                  </label>
                  <div className="flex min-h-[44px] items-stretch overflow-hidden rounded-xl border border-white/15 bg-white/5">
                    <motion.button
                      type="button"
                      onClick={() =>
                        handleChange({
                          target: {
                            name: "minPlayers",
                            value: Math.max(
                              (gameSettings.minPlayers || 2) - 1,
                              isDevMode ? 1 : 2,
                            ),
                          },
                        } as any)
                      }
                      className="flex min-w-[44px] shrink-0 items-center justify-center bg-emerald-600/80 px-2 text-sm text-white hover:bg-emerald-500 sm:px-3 sm:text-base"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      -
                    </motion.button>
                    <input
                      type="number"
                      inputMode="numeric"
                      name="minPlayers"
                      id="minPlayers"
                      min={isDevMode ? 1 : 2}
                      max={gameSettings.maxPlayers}
                      value={gameSettings.minPlayers}
                      onChange={(e) => {
                        const v = e.target.value;
                        if (v === "") return;
                        const n = Number(v);
                        if (Number.isNaN(n)) return;
                        setGameSettings((prev) => ({
                          ...prev,
                          minPlayers: n,
                        }));
                      }}
                      onBlur={() => {
                        setGameSettings((prev) => {
                          const lo = isDevMode ? 1 : 2;
                          const clamped = Math.max(
                            lo,
                            Math.min(prev.minPlayers, prev.maxPlayers),
                          );
                          return { ...prev, minPlayers: clamped };
                        });
                      }}
                      className="min-w-0 flex-1 border-x border-white/10 bg-transparent py-2 text-center font-quicksand text-sm font-semibold text-white [appearance:textfield] focus:border-amber-400/35 focus:outline-none focus:ring-2 focus:ring-amber-400/15 sm:text-base [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
                    />
                    <motion.button
                      type="button"
                      onClick={() =>
                        handleChange({
                          target: {
                            name: "minPlayers",
                            value: Math.min(
                              (gameSettings.minPlayers || 2) + 1,
                              gameSettings.maxPlayers,
                            ),
                          },
                        } as any)
                      }
                      className="flex min-w-[44px] shrink-0 items-center justify-center bg-emerald-600/80 px-2 text-sm text-white hover:bg-emerald-500 sm:px-3 sm:text-base"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      +
                    </motion.button>
                  </div>
                </div>
                <div className="w-full sm:w-1/2">
                  <label
                    className="block mb-2 text-center font-quicksand text-zinc-200 text-sm sm:text-base"
                    htmlFor="maxPlayers"
                  >
                    Jugadores máximos
                  </label>
                  <div className="flex min-h-[44px] items-stretch overflow-hidden rounded-xl border border-white/15 bg-white/5">
                    <motion.button
                      type="button"
                      onClick={() =>
                        handleChange({
                          target: {
                            name: "maxPlayers",
                            value: Math.max(
                              (gameSettings.maxPlayers || 5) - 1,
                              gameSettings.minPlayers,
                            ),
                          },
                        } as any)
                      }
                      className="flex min-w-[44px] shrink-0 items-center justify-center bg-emerald-600/80 px-2 text-sm text-white hover:bg-emerald-500 sm:px-3 sm:text-base"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      -
                    </motion.button>
                    <input
                      type="number"
                      inputMode="numeric"
                      name="maxPlayers"
                      id="maxPlayers"
                      min={gameSettings.minPlayers}
                      max={5}
                      value={gameSettings.maxPlayers}
                      onChange={(e) => {
                        const v = e.target.value;
                        if (v === "") return;
                        const n = Number(v);
                        if (Number.isNaN(n)) return;
                        setGameSettings((prev) => ({
                          ...prev,
                          maxPlayers: n,
                        }));
                      }}
                      onBlur={() => {
                        setGameSettings((prev) => {
                          const clamped = Math.max(
                            prev.minPlayers,
                            Math.min(prev.maxPlayers, 5),
                          );
                          return { ...prev, maxPlayers: clamped };
                        });
                      }}
                      className="min-w-0 flex-1 border-x border-white/10 bg-transparent py-2 text-center font-quicksand text-sm font-semibold text-white [appearance:textfield] focus:border-amber-400/35 focus:outline-none focus:ring-2 focus:ring-amber-400/15 sm:text-base [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
                    />
                    <motion.button
                      type="button"
                      onClick={() =>
                        handleChange({
                          target: {
                            name: "maxPlayers",
                            value: Math.min(
                              (gameSettings.maxPlayers || 5) + 1,
                              5,
                            ),
                          },
                        } as any)
                      }
                      className="flex min-w-[44px] shrink-0 items-center justify-center bg-emerald-600/80 px-2 text-sm text-white hover:bg-emerald-500 sm:px-3 sm:text-base"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      +
                    </motion.button>
                  </div>
                </div>
              </div>
              <div className="flex gap-4 items-center my-4">
                <label
                  className="block font-quicksand text-zinc-200 text-sm sm:text-base"
                  htmlFor="turnTimeout"
                >
                  Sin límite de tiempo entre tiradas
                </label>
                <input
                  type="checkbox"
                  name="turnTimeout"
                  id="turnTimeout"
                  checked={gameSettings.turnTimeout === null}
                  onChange={handleCheckboxChange}
                  className="size-4 accent-amber-500 sm:size-5"
                />
              </div>
              {gameSettings.turnTimeout !== null && (
                <>
                  <label
                    className="block mb-2 font-quicksand text-zinc-200 text-sm sm:text-base"
                    htmlFor="turnTimeoutAmount"
                  >
                    Segundos por tirada
                  </label>
                  <div className="flex min-h-[44px] max-w-xs items-stretch overflow-hidden rounded-xl border border-white/15 bg-white/5">
                    <motion.button
                      type="button"
                      onClick={() =>
                        handleChange({
                          target: {
                            name: "turnTimeoutAmount",
                            value: Math.max(
                              (gameSettings.turnTimeout || 30) - 1,
                              10,
                            ),
                          },
                        } as any)
                      }
                      className="flex min-w-[44px] shrink-0 items-center justify-center bg-emerald-600/80 px-2 text-sm text-white hover:bg-emerald-500 sm:px-3 sm:text-base"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      -
                    </motion.button>
                    <input
                      type="number"
                      inputMode="numeric"
                      name="turnTimeoutAmount"
                      id="turnTimeoutAmount"
                      min={10}
                      max={120}
                      step={1}
                      value={gameSettings.turnTimeout ?? 30}
                      onChange={(e) => {
                        const v = e.target.value;
                        if (v === "") return;
                        const n = Number(v);
                        if (Number.isNaN(n)) return;
                        setGameSettings((prev) => ({
                          ...prev,
                          turnTimeout: n,
                        }));
                      }}
                      onBlur={() => {
                        setGameSettings((prev) => {
                          const t = prev.turnTimeout ?? 30;
                          const clamped = Math.min(120, Math.max(10, t));
                          return { ...prev, turnTimeout: clamped };
                        });
                      }}
                      className="min-w-0 flex-1 border-x border-white/10 bg-transparent py-2 text-center font-quicksand text-sm font-semibold text-white [appearance:textfield] focus:border-amber-400/35 focus:outline-none focus:ring-2 focus:ring-amber-400/15 sm:text-base [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
                    />
                    <motion.button
                      type="button"
                      onClick={() =>
                        handleChange({
                          target: {
                            name: "turnTimeoutAmount",
                            value: Math.min(
                              (gameSettings.turnTimeout || 30) + 1,
                              120,
                            ),
                          },
                        } as any)
                      }
                      className="flex min-w-[44px] shrink-0 items-center justify-center bg-emerald-600/80 px-2 text-sm text-white hover:bg-emerald-500 sm:px-3 sm:text-base"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      +
                    </motion.button>
                  </div>
                  <p className="mt-1.5 text-xs text-zinc-500">
                    Cada tirada reinicia el tiempo. Entre 10 y 120 s; podés
                    escribir el número o usar +/−.
                  </p>
                </>
              )}

              <label
                className="block mb-2 mt-4 font-quicksand text-zinc-200 text-sm sm:text-base"
                htmlFor="roomPassword"
              >
                Contraseña (opcional)
              </label>
              <div className="relative">
                <input
                  autoComplete="off"
                  type={showPassword ? "text" : "password"}
                  name="roomPassword"
                  id="roomPassword"
                  value={gameSettings.password}
                  onChange={handleChange}
                  className="w-full rounded-xl border border-white/15 bg-white/5 p-2.5 pr-11 font-quicksand text-sm text-white placeholder:text-zinc-500 focus:border-amber-400/35 focus:outline-none focus:ring-2 focus:ring-amber-400/15 sm:p-3 sm:text-base"
                />
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {showPassword ? (
                    <Eye
                      className="absolute right-2 top-1/2 h-4 w-4 -translate-y-1/2 cursor-pointer text-zinc-400 sm:right-3 sm:h-5 sm:w-5"
                      onClick={() => setShowPassword(!showPassword)}
                    />
                  ) : (
                    <EyeOff
                      className="absolute right-2 top-1/2 h-4 w-4 -translate-y-1/2 cursor-pointer text-zinc-400 sm:right-3 sm:h-5 sm:w-5"
                      onClick={() => setShowPassword(!showPassword)}
                    />
                  )}
                </motion.div>
              </div>
              <motion.button
                type="submit"
                disabled={isCreatingRoom}
                className={`mb-4 mt-5 flex min-h-[48px] w-full items-center justify-center gap-2 rounded-xl border border-emerald-500/30 bg-emerald-600 py-2.5 font-poppins text-sm font-semibold text-white sm:py-3 sm:text-base ${
                  isCreatingRoom
                    ? "cursor-not-allowed opacity-50"
                    : "hover:bg-emerald-500"
                }`}
                whileTap={{ scale: 0.98 }}
              >
                {isCreatingRoom ? (
                  <>
                    <CustomLoadingSpinner
                      size="sm"
                      showText={false}
                      color="#F5F5F5"
                    />
                    Creando...
                  </>
                ) : (
                  "Crear"
                )}
              </motion.button>
            </form>
          </motion.div>
        </motion.div>
      )}

      <AchievementsModal
        isOpen={showAchievements}
        onClose={() => setShowAchievements(false)}
      />
      <StatsModal
        isOpen={showStats}
        onClose={() => setShowStats(false)}
        stats={statsToShow as any}
        statsLoading={isStatsLoading}
      />
    </div>
  );
}
