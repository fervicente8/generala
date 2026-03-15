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
  Trophy,
} from "lucide-react";
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
    turnTimeout: 30,
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
  const [rankingsLoading, setRankingsLoading] = useState(false);
  const [showAchievements, setShowAchievements] = useState(false);

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
    Promise.all([
      fetch("/api/users/global-ranking?limit=10").then((r) => r.json()),
      fetch("/api/users/friends-ranking").then((r) => r.json()),
    ])
      .then(([global, friends]) => {
        setGlobalRanking(Array.isArray(global) ? global : []);
        setFriendsRanking(Array.isArray(friends) ? friends : []);
      })
      .catch(() => {
        setGlobalRanking([]);
        setFriendsRanking([]);
      })
      .finally(() => setRankingsLoading(false));
  }, [session?.user?.id]);

  const isInitialLoad =
    status === "authenticated" && isLoadingRooms && isLoadingFriends;

  if (status === "loading") {
    return (
      <div className="flex h-dvh items-center justify-center bg-[#1A1A1A]">
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
    setIsCreatingRoom(true);
    try {
      const res = await fetch("/api/rooms/create-room", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...gameSettings, ownerId: session?.user?.id }),
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
        turnTimeout: 30,
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

  const isDevMode = process.env.NEXT_PUBLIC_DEV_MODE === "true";

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
    <div className="flex flex-col md:flex-row h-dvh max-h-dvh bg-linear-to-br from-[#1A1A1A] to-[#2E2E2E] text-[#F5F5F5] font-quicksand overflow-hidden">
      {isInitialLoad && (
        <LoadingOverlay
          text="Cargando salas y amigos..."
          backdropOpacity={0.9}
        />
      )}
      {/* Sidebar: Amigos - en móvil altura limitada y scroll para que se vea el main */}
      <aside className="w-full md:w-2/5 lg:w-1/4 p-4 sm:p-6 bg-linear-to-b from-[#2E4A3D] to-[#1A2A22] text-[#F5F5F5] rounded-b-2xl md:rounded-r-2xl shadow-xl border-b-2 md:border-b-0 md:border-r-2 border-[#D4A017] flex-shrink-0 max-h-[45vh] md:max-h-none overflow-y-auto scrollbar-none">
        <div className="flex items-center gap-2 mb-4">
          <motion.div
            animate={{ rotate: [0, 360], scale: [1, 1.2, 1] }}
            transition={{ repeat: Infinity, duration: 2 }}
          >
            <Image
              src="/dice-icon.png"
              alt="Dado"
              width={24}
              height={24}
              className="sm:w-8 sm:h-8"
            />
          </motion.div>
          <h2 className="text-xl sm:text-2xl font-bold font-poppins">Amigos</h2>
        </div>
        {/* Buscador */}
        <div className="relative mt-4">
          <input
            type="text"
            placeholder="Buscar amigos..."
            value={friendSearch}
            onChange={(e) => setFriendSearch(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSearchFriends()}
            className="w-full p-3 sm:px-4 bg-[#F0E9D6] rounded-lg shadow-sm focus:outline-none transition-all duration-300 text-[#1A1A1A] text-sm sm:text-base"
          />
          <button
            type="button"
            onClick={() => !isSearchingFriends && handleSearchFriends()}
            disabled={isSearchingFriends}
            className="absolute right-1 top-1/2 -translate-y-1/2 min-w-[44px] min-h-[44px] flex items-center justify-center rounded-lg disabled:opacity-70"
            aria-label="Buscar"
          >
            {isSearchingFriends ? (
              <CustomLoadingSpinner
                size="sm"
                showText={false}
                color="#1A1A1A"
              />
            ) : (
              <Search className="w-5 h-5 sm:w-6 sm:h-6 text-[#1A1A1A]" />
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
                  textColor="#F5F5F5"
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
                      className="p-3 sm:p-4 bg-[#F5F5F5] rounded-xl shadow-sm border-2 border-[#D4A017]"
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
                  textColor="#F5F5F5"
                />
              </div>
            ) : friends.length === 0 ? (
              <div className="mt-4 sm:mt-5 text-center">
                <p className="text-[#B0B0B0] italic text-sm sm:text-base">
                  No tenés amigos agregados.
                </p>
                <p className="text-[#D4A017] text-xs sm:text-sm mt-2">
                  Usá el buscador de arriba para agregar amigos.
                </p>
              </div>
            ) : (
              <>
                {!activeRoom && selectedForChallenge.length > 0 && (
                  <motion.div
                    initial={{ opacity: 0, y: -8 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-3 flex items-center justify-between gap-2 p-2 rounded-lg bg-[#1A6642] border border-[#D4A017]"
                  >
                    <span className="text-[#F5F5F5] text-sm font-quicksand">
                      Desafiar a {selectedForChallenge.length}{" "}
                      {selectedForChallenge.length === 1 ? "amigo" : "amigos"}
                    </span>
                    <motion.button
                      type="button"
                      disabled={isCreatingChallenge}
                      onClick={createChallengeRoom}
                      className="px-3 py-1.5 rounded-lg bg-[#F5F5F5] text-[#1A6642] font-poppins font-semibold text-sm hover:bg-[#E2D8BA] disabled:opacity-70 flex items-center gap-2"
                    >
                      {isCreatingChallenge ? (
                        <>
                          <CustomLoadingSpinner
                            size="sm"
                            showText={false}
                            color="#1A6642"
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
                          className="p-3 sm:p-4 bg-[#F5F5F5] rounded-xl shadow-sm border-2 border-[#D4A017]"
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
      </aside>

      {/* Contenido principal: espaciador al final cuando hay sala activa para poder scrollear y ver todo el panel */}
      <main className='flex-1 min-h-0 p-4 sm:p-6 md:p-8 overflow-y-auto overflow-x-hidden scrollbar-none bg-[#1A1C1C] sm:bg-linear-to-br sm:from-[#1A1A1A] sm:to-[#2E2E2E] sm:bg-[url("/background.png")] sm:bg-cover sm:bg-center'>
        <div className="w-full max-w-7xl mx-auto">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 sm:mb-6 gap-4">
            <h1 className="text-center text-lg sm:text-xl lg:text-4xl font-extrabold font-poppins text-[#E2D8BA] drop-shadow-lg truncate">
              Bienvenido/a, {session.user?.name}
            </h1>
            <div className="flex flex-row gap-2 sm:gap-4 items-center justify-center flex-wrap">
              <motion.button
                onClick={() => {
                  setStatsToShow(session.user.stats);
                  setShowStats(true);
                }}
                className="bg-[#2E4A3D] text-[#F5F5F5] min-h-[44px] py-2 px-3 sm:px-4 rounded-xl shadow-md flex items-center justify-center hover:bg-[#2E4A3D]/80 text-sm sm:text-base"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <ChartColumnIncreasing className="mr-1 sm:mr-2 h-4 w-4 sm:h-5 sm:w-5" />
                Ver estadísticas
              </motion.button>
              <motion.button
                onClick={() => setShowAchievements(true)}
                className="bg-[#D4A017] text-white min-h-[44px] py-2 px-3 sm:px-4 rounded-xl shadow-md flex items-center justify-center hover:bg-amber-500 text-sm sm:text-base"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <Trophy className="mr-1 sm:mr-2 h-4 w-4 sm:h-5 sm:w-5" />
                Logros
              </motion.button>
              <motion.button
                onClick={handleCloseSession}
                className="bg-[#A91D2F] text-[#F5F5F5] min-h-[44px] py-2 px-3 sm:px-4 rounded-xl shadow-md flex items-center justify-center hover:bg-[#DC2626] text-sm sm:text-base"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <LogOut className="mr-1 sm:mr-2 h-4 w-4 sm:h-5 sm:w-5" />
                Cerrar sesión
              </motion.button>
            </div>
          </div>

          {/* Rankings */}
          <section className="mb-4 sm:mb-6">
            <h2 className="text-lg sm:text-xl font-bold font-poppins text-[#E2D8BA] mb-3 flex items-center gap-2">
              <Trophy className="h-5 w-5 sm:h-6 sm:w-6" />
              Rankings
            </h2>
            {rankingsLoading ? (
              <div className="flex justify-center py-6">
                <CustomLoadingSpinner
                  size="sm"
                  showText={false}
                  color="#E2D8BA"
                />
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="bg-[#F5F5F5]/90 rounded-xl p-4 border-2 border-[#D4A017]/50">
                  <p className="text-sm font-semibold text-[#1A1A1A] font-poppins mb-2">
                    Global (top 10)
                  </p>
                  <ul className="space-y-1.5 max-h-48 overflow-y-auto">
                    {globalRanking.map((item) => (
                      <li
                        key={item.user.id}
                        className="flex items-center gap-2 text-sm font-quicksand"
                      >
                        <span className="w-6 text-[#D4A017] font-bold">
                          {item.rank}º
                        </span>
                        <Image
                          src={item.user.image || "/default-avatar.png"}
                          alt=""
                          width={24}
                          height={24}
                          className="rounded-full shrink-0"
                          unoptimized
                        />
                        <span className="truncate text-[#1A1A1A]">
                          {item.user.name}
                        </span>
                        <span className="ml-auto text-right shrink-0 text-[#2E4A3D] font-semibold text-xs whitespace-nowrap">
                          {item.gamesWon}{" "}
                          {item.gamesWon === 1 ? "victoria" : "victorias"} ·{" "}
                          {item.totalPoints} pts
                        </span>
                      </li>
                    ))}
                    {globalRanking.length === 0 && (
                      <li className="text-[#B0B0B0] text-sm">Sin datos</li>
                    )}
                  </ul>
                </div>
                <div className="bg-[#F5F5F5]/90 rounded-xl p-4 border-2 border-[#D4A017]/50">
                  <p className="text-sm font-semibold text-[#1A1A1A] font-poppins mb-2">
                    Amigos
                  </p>
                  <ul className="space-y-1.5 max-h-48 overflow-y-auto">
                    {friendsRanking.map((item) => (
                      <li
                        key={item.user.id}
                        className="flex items-center gap-2 text-sm font-quicksand"
                      >
                        <span className="w-6 text-[#D4A017] font-bold">
                          {item.rank}º
                        </span>
                        <Image
                          src={item.user.image || "/default-avatar.png"}
                          alt=""
                          width={24}
                          height={24}
                          className="rounded-full shrink-0"
                          unoptimized
                        />
                        <span className="truncate text-[#1A1A1A]">
                          {item.user.name}
                        </span>
                        <span className="ml-auto text-right shrink-0 text-[#2E4A3D] font-semibold text-xs whitespace-nowrap">
                          {item.gamesWon}{" "}
                          {item.gamesWon === 1 ? "victoria" : "victorias"} ·{" "}
                          {item.totalPoints} pts
                        </span>
                      </li>
                    ))}
                    {friendsRanking.length === 0 && (
                      <li className="text-[#B0B0B0] text-sm">
                        Sin amigos con partidas
                      </li>
                    )}
                  </ul>
                </div>
              </div>
            )}
          </section>

          {/* Sala activa */}
          {activeRoom && (
            <section className="mt-4 sm:mt-6">
              <h2 className="text-xl sm:text-2xl font-bold font-poppins text-[#E2D8BA] mb-4">
                Sala activa
              </h2>
              <motion.div
                className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-3 sm:p-4 bg-[#F5F5F5] rounded-xl shadow-md border-2 border-[#D4A017] w-full sm:w-3/4 md:w-2/3"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <div className="flex flex-col gap-2 w-full sm:w-auto">
                  <p className="text-[#1A1A1A] text-base sm:text-lg font-poppins italic">
                    {activeRoom.name}
                  </p>
                  <div className="flex gap-2 items-center flex-wrap">
                    {activeRoom.players.map((player) => (
                      <Image
                        key={player.id}
                        src={player.user.image || "/default-avatar.png"}
                        alt="Avatar"
                        width={48}
                        height={48}
                        className="rounded-full border-2 border-[#D4A017] w-10 h-10 sm:w-12 sm:h-12"
                        unoptimized
                      />
                    ))}
                  </div>
                </div>
                <div className="flex flex-col gap-2 mt-4 sm:mt-0 sm:items-end w-full sm:w-auto">
                  <p className="text-[#1A1A1A] text-base sm:text-lg font-bold font-poppins">
                    {activeRoom.players.length}/{activeRoom.maxPlayers}{" "}
                    jugadores
                  </p>
                  <motion.button
                    className={`w-full sm:w-auto flex items-center justify-center gap-2 bg-[#A91D2F] text-[#F5F5F5] font-poppins font-semibold py-2 px-4 sm:py-3 sm:px-6 rounded-xl shadow-md ${
                      isDeletingRoom || isLeavingRoom
                        ? "opacity-50 cursor-not-allowed"
                        : "hover:bg-[#DC2626]"
                    }`}
                    onClick={async () => {
                      if (isDeletingRoom || isLeavingRoom) return;
                      if (activeRoom.ownerId === session.user?.id) {
                        const ok = await showConfirm({
                          title: "Eliminar sala",
                          message:
                            "¿Eliminar la sala? Los jugadores serán expulsados.",
                          confirmLabel: "Eliminar",
                          cancelLabel: "Cancelar",
                          danger: true,
                        });
                        if (ok) handleDeleteRoom(activeRoom.id);
                      } else {
                        leaveRoom(activeRoom.id);
                      }
                    }}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    {isDeletingRoom ? (
                      <>
                        <CustomLoadingSpinner
                          size="sm"
                          showText={false}
                          color="#F5F5F5"
                        />
                        Eliminando...
                      </>
                    ) : isLeavingRoom ? (
                      <>
                        <CustomLoadingSpinner
                          size="sm"
                          showText={false}
                          color="#F5F5F5"
                        />
                        Saliendo...
                      </>
                    ) : activeRoom.ownerId === session.user?.id ? (
                      "Eliminar sala"
                    ) : (
                      "Salir de la sala"
                    )}
                  </motion.button>
                </div>
              </motion.div>
            </section>
          )}

          {/* Listado de salas */}
          <section className="mt-4 sm:mt-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 gap-4">
              <h2 className="text-xl sm:text-2xl font-bold font-poppins text-[#E2D8BA]">
                Salas disponibles
              </h2>
              <motion.button
                className="w-full sm:w-auto bg-[#2E4A3D] text-[#F5F5F5] py-2 px-4 sm:py-3 sm:px-6 rounded-xl shadow-md hover:bg-[#2E4A3D]/80"
                onClick={() => setIsModalOpen(true)}
                disabled={isLoadingRooms || activeRoom !== null}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                style={{
                  opacity: isLoadingRooms || activeRoom !== null ? 0.5 : 1,
                }}
              >
                Crear sala
              </motion.button>
            </div>
            <div className="w-full flex items-center py-3 bg-[#F0E9D6] shadow-lg rounded-lg mb-4">
              <Search className="w-5 h-5 sm:w-6 sm:h-6 text-[#1A1A1A] mx-2 sm:mx-4 shrink-0" />
              <input
                type="text"
                placeholder="Buscar sala..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="flex-1 focus:outline-none text-[#1A1A1A] font-quicksand text-sm sm:text-base min-w-0"
              />
            </div>
            {isJoiningRoom && (
              <div className="mb-4 flex items-center justify-center gap-2 rounded-xl bg-[#2E4A3D]/60 py-3">
                <CustomLoadingSpinner
                  size="sm"
                  text="Uniendo a la sala..."
                  textColor="#E2D8BA"
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
                className="p-6 sm:p-8 rounded-xl bg-[#2E4A3D]/40 border-2 border-[#D4A017]/50 text-center"
              >
                <p className="text-[#E2D8BA] font-quicksand text-base sm:text-lg mb-2">
                  No hay salas disponibles.
                </p>
                <p className="text-[#B0B0B0] text-sm sm:text-base mb-4">
                  Creá una sala e invitá a tus amigos a jugar.
                </p>
                <motion.button
                  className="bg-[#2E4A3D] text-[#F5F5F5] font-poppins font-semibold py-3 px-6 rounded-xl shadow-md hover:bg-[#2E4A3D]/90 border-2 border-[#D4A017]"
                  onClick={() => setIsModalOpen(true)}
                  disabled={activeRoom !== null}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Crear sala
                </motion.button>
              </motion.div>
            ) : rooms.filter(
                (room) =>
                  room.name.includes(search) && room.status === "waiting",
              ).length === 0 ? (
              <p className="text-[#B0B0B0] italic font-quicksand text-sm sm:text-base">
                No se encontraron salas con el nombre "{search}".
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
                          className="relative flex justify-center items-center p-3 sm:p-4 py-5 sm:py-6 bg-[#F5F5F5] rounded-xl shadow-md border-2 border-[#D4A017]"
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
                          className={`relative flex items-center p-3 sm:p-4 bg-[#F5F5F5] rounded-xl shadow-md border-2 border-[#D4A017] ${
                            room.players.length >= room.maxPlayers ||
                            isJoiningRoom
                              ? "cursor-not-allowed grayscale"
                              : "cursor-pointer hover:shadow-xl hover:scale-105"
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
                            className="rounded-full mr-3 sm:mr-4 border-2 border-[#D4A017] w-8 h-8 sm:w-10 sm:h-10"
                            unoptimized
                          />
                          <div className="flex flex-col flex-grow">
                            <span className="text-base sm:text-lg font-semibold font-poppins text-[#1A1A1A]">
                              {room?.name || "Sin nombre"}
                            </span>
                            <span className="text-xs sm:text-sm text-[#B0B0B0] font-quicksand">
                              {room?.minPlayers ?? 0} a {room?.maxPlayers ?? 0}{" "}
                              jugadores
                            </span>
                          </div>
                          <span className="text-sm sm:text-md font-semibold text-[#1A1A1A] font-poppins">
                            {room?.players?.length ?? 0}/{room?.maxPlayers ?? 0}
                          </span>
                          {room?.password && (
                            <span className="absolute top-2 right-2 text-[#B0B0B0]">
                              <LockIcon size={16} className="sm:w-5 sm:h-5" />
                            </span>
                          )}
                          {passwordModal === room.id && (
                            <motion.div
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              exit={{ opacity: 0 }}
                              transition={{ duration: 0.3 }}
                              className="absolute top-0 left-0 w-full h-full bg-black/50 rounded-xl flex items-center justify-center cursor-default"
                            >
                              <motion.div
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                exit={{ scale: 0 }}
                                transition={{ duration: 0.3 }}
                                className="bg-[#F5F5F5] p-4 sm:p-6 rounded-xl shadow-md w-[90%] max-w-sm"
                              >
                                <h2 className="text-base sm:text-lg font-semibold font-poppins text-[#1A1A1A] mb-2">
                                  Ingrese la contraseña
                                </h2>
                                <input
                                  type="password"
                                  placeholder="Contraseña"
                                  className="border-2 border-[#D4A017] rounded-full px-2 py-1 sm:px-3 sm:py-2 w-full mb-2 font-quicksand focus:outline-none focus:ring-2 focus:ring-[#1A6642] text-[#1A1A1A] text-sm sm:text-base"
                                  value={password}
                                  onChange={(e) => setPassword(e.target.value)}
                                />
                                <motion.button
                                  className="bg-[#1E3A8A] text-[#F5F5F5] px-3 py-1 sm:px-4 sm:py-2 rounded-full font-poppins hover:bg-[#3B82F6] w-full text-sm sm:text-base"
                                  onClick={() => joinRoom(room.id, password)}
                                  whileHover={{ scale: 1.1 }}
                                  whileTap={{ scale: 0.9 }}
                                >
                                  Ingresar
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

          {/* Espaciador para que el scroll muestre todo el contenido por encima de la barra de jugadores */}
          {activeRoom && (
            <div
              className="min-h-[200px] sm:min-h-[180px] shrink-0"
              aria-hidden
            />
          )}
        </div>

        {/* Sala activa (barra inferior) */}
        {activeRoom && (
          <motion.div
            className="absolute bottom-0 left-0 right-0 sm:left-4 sm:right-4 sm:bottom-2 rounded-t-xl backdrop-blur-md bg-[#1E3A8A]/80 text-[#F5F5F5] p-3 sm:p-4 flex flex-col sm:flex-row justify-center sm:justify-between items-center sm:items-center gap-4 z-20 safe-area-bottom min-h-[88px]"
            initial={{ y: 100 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex flex-col sm:flex-row sm:items-center items-center gap-4 sm:gap-6">
              <div>
                <h3 className="text-base sm:text-lg font-bold font-poppins">
                  {activeRoom.name}
                </h3>
                <p className="font-quicksand text-sm sm:text-base">
                  {activeRoom.status === "waiting"
                    ? "Esperando jugadores..."
                    : "En juego"}
                </p>
              </div>
              <div className="flex gap-2 flex-wrap">
                {activeRoom?.players?.map((player) => (
                  <motion.div
                    key={player.id}
                    className="relative flex flex-col items-center bg-[#F5F5F5] p-2 sm:p-5 rounded-xl shadow-sm border-2 border-[#D4A017] mb-3"
                    whileHover={{ scale: 1.05 }}
                  >
                    <Image
                      src={player.user.image || "/default-avatar.png"}
                      alt="Foto de perfil"
                      width={40}
                      height={40}
                      className="rounded-full border-2 border-[#D4A017] w-8 h-8 sm:w-10 sm:h-10"
                      unoptimized
                    />
                    <span className="font-bold text-[#1A1A1A] font-quicksand text-xs sm:text-sm truncate max-w-[80px] sm:max-w-[100px]">
                      {player.user.name}
                    </span>
                    {loadingStatsUserId === player.userId ? (
                      <span className="absolute top-1 left-1 h-4 w-4 sm:h-5 sm:w-5 flex items-center justify-center">
                        <CustomLoadingSpinner
                          size="sm"
                          showText={false}
                          color="#1A1A1A"
                        />
                      </span>
                    ) : (
                      <ChartColumnIncreasing
                        className="absolute top-1 left-1 h-4 w-4 sm:h-5 sm:w-5 text-[#1A1A1A] cursor-pointer"
                        onClick={() => getPlayerStats(player.userId)}
                      />
                    )}
                    {session.user.id === activeRoom.ownerId &&
                      player.user.id !== session?.user?.id && (
                        <motion.div
                          whileHover={{ scale: 1.2 }}
                          whileTap={{ scale: 0.9 }}
                        >
                          <X
                            className={`absolute top-1 right-1 h-4 w-4 sm:h-5 sm:w-5 text-[#A91D2F] ${
                              isKickingUser
                                ? "opacity-50 cursor-not-allowed"
                                : "cursor-pointer"
                            }`}
                            onClick={() =>
                              !isKickingUser &&
                              handleKickPlayer(activeRoom.id, player.userId)
                            }
                          />
                        </motion.div>
                      )}
                  </motion.div>
                ))}
              </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 items-center sm:items-center">
              <p className="font-quicksand text-sm sm:text-base">
                {activeRoom?.players?.length}/{activeRoom.maxPlayers} jugadores
              </p>
              {activeRoom.ownerId === session?.user?.id && (
                <div className="flex gap-2 items-center w-full sm:w-auto">
                  <motion.button
                    onClick={() =>
                      !isStartingGame &&
                      !isDeletingRoom &&
                      startGame(activeRoom)
                    }
                    className={`flex-1 sm:flex-none bg-[#1A6642] text-[#F5F5F5] px-3 py-1 sm:px-4 sm:py-2 rounded-xl font-bold font-poppins text-sm sm:text-base ${
                      isStartingGame || isDeletingRoom
                        ? "opacity-50 cursor-not-allowed"
                        : "hover:bg-[#2E8B57]"
                    }`}
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    Iniciar Partida
                  </motion.button>
                  <motion.div
                    whileHover={{ scale: isDeletingRoom ? 1 : 1.2 }}
                    whileTap={{ scale: 0.9 }}
                    className="flex min-w-[44px] min-h-[44px] items-center justify-center"
                  >
                    {isDeletingRoom ? (
                      <CustomLoadingSpinner
                        size="sm"
                        showText={false}
                        color="#F5F5F5"
                      />
                    ) : (
                      <Trash2
                        className={`h-4 w-4 sm:h-5 sm:w-5 text-[#A91D2F] ${
                          isStartingGame
                            ? "opacity-50 cursor-not-allowed"
                            : "cursor-pointer"
                        }`}
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
                      />
                    )}
                  </motion.div>
                </div>
              )}
            </div>
          </motion.div>
        )}

        <motion.button
          onClick={() => router.push("/how-to-play")}
          className="absolute bottom-2 right-2 sm:bottom-6 sm:right-6 min-h-[35px] min-w-[44px] flex items-center justify-center bg-[#1E3A8A] text-[#F5F5F5] px-3 py-2 sm:px-4 rounded-xl font-poppins hover:bg-[#3B82F6] safe-area-bottom"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <p className="text-sm sm:text-base mt-[-8px]">¿Cómo jugar?</p>
        </motion.button>
      </main>

      {/* Modal de Creación de Sala */}
      {isModalOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 flex items-end sm:items-center justify-center bg-black/60 z-50 p-0 sm:p-4 safe-area-x"
        >
          <motion.div
            initial={{ scale: 0.8, y: 50 }}
            animate={{ scale: 1, y: 0 }}
            className="bg-[#F5F5F5] p-4 sm:p-6 rounded-t-2xl sm:rounded-2xl shadow-xl w-full sm:w-[400px] sm:max-w-[95%] border-2 border-[#D4A017] max-h-[90dvh] overflow-y-auto safe-area-bottom"
          >
            <form onSubmit={(e) => !isCreatingRoom && handleCreateRoom(e)}>
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg sm:text-xl font-bold font-poppins text-[#1A1A1A]">
                  Crear nueva sala
                </h2>
                <motion.button
                  type="button"
                  whileHover={{ scale: 1.2 }}
                  onClick={() => setIsModalOpen(false)}
                  className="min-w-[44px] min-h-[44px] flex items-center justify-center rounded-lg -mr-2"
                  aria-label="Cerrar"
                >
                  <X className="text-[#1A1A1A] w-5 h-5 sm:w-6 sm:h-6" />
                </motion.button>
              </div>
              <label
                className="block mb-2 font-quicksand text-[#1A1A1A] text-sm sm:text-base"
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
                className="w-full p-2 sm:p-3 border-2 border-[#D4A017] rounded-full focus:outline-none focus:ring-2 focus:ring-[#1A6642] font-quicksand text-[#1A1A1A] text-sm sm:text-base"
                placeholder={`Sala de ${session.user?.name}`}
                required
                minLength={3}
                maxLength={25}
              />
              <div className="flex flex-col sm:flex-row justify-between gap-4 mt-4">
                <div className="w-full sm:w-1/2">
                  <label
                    className="block mb-2 text-center font-quicksand text-[#1A1A1A] text-sm sm:text-base"
                    htmlFor="minPlayers"
                  >
                    Jugadores mínimos
                  </label>
                  <div className="flex items-center justify-between border-2 border-[#D4A017] rounded-full">
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
                      className="min-h-[44px] min-w-[44px] py-1 sm:py-2 px-3 sm:px-4 bg-[#1A6642] text-[#F5F5F5] rounded-l-full hover:bg-[#1A6642]/80 text-sm sm:text-base flex items-center justify-center"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      -
                    </motion.button>
                    <p className="text-[#1A1A1A] font-quicksand text-sm sm:text-base">
                      {gameSettings.minPlayers}
                    </p>
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
                      className="min-h-[44px] min-w-[44px] py-1 sm:py-2 px-3 sm:px-4 bg-[#1A6642] text-[#F5F5F5] rounded-r-full hover:bg-[#1A6642]/80 text-sm sm:text-base flex items-center justify-center"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      +
                    </motion.button>
                  </div>
                </div>
                <div className="w-full sm:w-1/2">
                  <label
                    className="block mb-2 text-center font-quicksand text-[#1A1A1A] text-sm sm:text-base"
                    htmlFor="maxPlayers"
                  >
                    Jugadores máximos
                  </label>
                  <div className="flex items-center justify-between border-2 border-[#D4A017] rounded-full">
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
                      className="min-h-[44px] min-w-[44px] py-1 sm:py-2 px-3 sm:px-4 bg-[#1A6642] text-[#F5F5F5] rounded-l-full hover:bg-[#1A6642]/80 text-sm sm:text-base flex items-center justify-center"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      -
                    </motion.button>
                    <p className="text-[#1A1A1A] font-quicksand text-sm sm:text-base">
                      {gameSettings.maxPlayers}
                    </p>
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
                      className="min-h-[44px] min-w-[44px] py-1 sm:py-2 px-3 sm:px-4 bg-[#1A6642] text-[#F5F5F5] rounded-r-full hover:bg-[#1A6642]/80 text-sm sm:text-base flex items-center justify-center"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      +
                    </motion.button>
                  </div>
                </div>
              </div>
              <label
                className="block mb-2 mt-4 font-quicksand text-[#1A1A1A] text-sm sm:text-base"
                htmlFor="turnTimeout"
              >
                ¿Tiempo ilimitado por ronda?
              </label>
              <input
                type="checkbox"
                name="turnTimeout"
                id="turnTimeout"
                checked={gameSettings.turnTimeout === null}
                onChange={handleCheckboxChange}
                className="mb-3 ml-2 size-4 sm:size-5"
              />
              {gameSettings.turnTimeout !== null && (
                <>
                  <label
                    className="block mb-2 font-quicksand text-[#1A1A1A] text-sm sm:text-base"
                    htmlFor="turnTimeoutAmount"
                  >
                    Tiempo por turno (segundos)
                  </label>
                  <div className="flex items-center justify-between border-2 border-[#D4A017] rounded-full w-32 sm:w-40">
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
                      className="min-h-[44px] min-w-[44px] py-1 sm:py-2 px-3 sm:px-4 bg-[#1A6642] text-[#F5F5F5] rounded-l-full hover:bg-[#1A6642]/80 text-sm sm:text-base flex items-center justify-center"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      -
                    </motion.button>
                    <p className="text-[#1A1A1A] font-quicksand text-sm sm:text-base">
                      {gameSettings.turnTimeout}
                    </p>
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
                      className="min-h-[44px] min-w-[44px] py-1 sm:py-2 px-3 sm:px-4 bg-[#1A6642] text-[#F5F5F5] rounded-r-full hover:bg-[#1A6642]/80 text-sm sm:text-base flex items-center justify-center"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      +
                    </motion.button>
                  </div>
                </>
              )}
              <label
                className="block mb-2 mt-4 font-quicksand text-[#1A1A1A] text-sm sm:text-base"
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
                  className="w-full p-2 sm:p-3 border-2 border-[#D4A017] rounded-full focus:outline-none focus:ring-2 focus:ring-[#1A6642] font-quicksand text-[#1A1A1A] text-sm sm:text-base"
                />
                <motion.div
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.9 }}
                >
                  {showPassword ? (
                    <Eye
                      className="absolute top-1/2 -translate-y-1/2 right-2 sm:right-3 cursor-pointer text-[#1A1A1A] w-4 h-4 sm:w-5 sm:h-5"
                      onClick={() => setShowPassword(!showPassword)}
                    />
                  ) : (
                    <EyeOff
                      className="absolute top-1/2 -translate-y-1/2 right-2 sm:right-3 cursor-pointer text-[#1A1A1A] w-4 h-4 sm:w-5 sm:h-5"
                      onClick={() => setShowPassword(!showPassword)}
                    />
                  )}
                </motion.div>
              </div>
              <motion.button
                type="submit"
                disabled={isCreatingRoom}
                className={`mt-4 mb-4 w-full min-h-[48px] flex items-center justify-center gap-2 bg-[#1A6642] text-[#F5F5F5] py-2 sm:py-3 px-4 rounded-full font-poppins text-sm sm:text-base ${
                  isCreatingRoom
                    ? "opacity-50 cursor-not-allowed"
                    : "hover:bg-[#2E8B57]"
                }`}
                whileTap={{ scale: 0.95 }}
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
