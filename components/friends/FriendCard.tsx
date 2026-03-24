import { Game, User } from "@/types";
import { useEffect, useState } from "react";
import { BarChart2, CirclePlus, CircleX, MailCheck, SendHorizonal, Swords } from "lucide-react";
import CustomLoadingSpinner from "../ui/CustomLoadingSpinner";
import { socket } from "@/lib/socket";
import { useAlert } from "../ui/CustomAlert";
import Image from "next/image";
import { motion } from "framer-motion";

interface Props {
  sessionUser: User;
  user: User;
  activeRoom?: Game;
  setFriendSearch?: (userId: string) => void;
  setFriendResults?: (users: User[]) => void;
  onlineUserIds?: string[];
  onShowStats?: (userId: string) => void;
  statsLoadingForUserId?: string | null;
  challengeMode?: boolean;
  selectedForChallenge?: boolean;
  onToggleChallenge?: (userId: string) => void;
}

export default function FriendCard({
  sessionUser,
  user,
  activeRoom,
  setFriendSearch,
  setFriendResults,
  onlineUserIds,
  onShowStats,
  statsLoadingForUserId,
  challengeMode,
  selectedForChallenge,
  onToggleChallenge,
}: Props) {
  const [loadingIsFriend, setLoadingIsFriend] = useState(true);
  const [isFriend, setIsFriend] = useState(false);
  const [invitationSent, setInvitationSent] = useState(false);
  const [loadingFriendRequest, setLoadingFriendRequest] = useState(true);
  const [friendRequestSent, setFriendRequestSent] = useState(false);
  const [isOnline, setIsOnline] = useState(false);
  const [loadingSendRequest, setLoadingSendRequest] = useState(false);
  const [loadingRemoveFriend, setLoadingRemoveFriend] = useState(false);
  const { showAlert, showConfirm } = useAlert();
  const isLoadingStats = statsLoadingForUserId === user.id;

  useEffect(() => {
    const handleUserOnline = (ids: string[]) => {
      setIsOnline(ids.includes(user.id));
    };

    if (onlineUserIds) {
      handleUserOnline(onlineUserIds);
    }
  }, [onlineUserIds, user.id]);

  const checkIfRequestSent = async (receiverId: string) => {
    setLoadingFriendRequest(true);
    try {
      const res = await fetch(
        `/api/friends/request-exists?receiverId=${receiverId}`
      );
      const data = await res.json();
      setFriendRequestSent(data.exists);
    } catch (err) {
      console.error("Error al verificar solicitud:", err);
    } finally {
      setLoadingFriendRequest(false);
    }
  };

  useEffect(() => {
    const checkFriendship = async () => {
      setLoadingIsFriend(true);
      try {
        const res = await fetch(
          `/api/friends/is-friend?userId=${sessionUser.id}&otherId=${user.id}`
        );
        const data = await res.json();
        setIsFriend(data.isFriend);
      } catch (err) {
        console.error("Error al verificar amistad:", err);
      } finally {
        setLoadingIsFriend(false);
      }
    };

    checkFriendship();
    checkIfRequestSent(user.id);
  }, [user, sessionUser.id]);

  const handleSendFriendRequest = async () => {
    setLoadingSendRequest(true);
    try {
      const res = await fetch("/api/friends/request", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ receiverId: user.id }),
      });
      const data = await res.json();
      if (!res.ok) {
        showAlert({
          type: "error",
          message: data.error || "Error de conexión",
        });
        return;
      }
      socket.emit("friendRequest", data);
      showAlert({
        type: "success",
        message: "Solicitud de amistad enviada con éxito",
      });
      setFriendRequestSent(true);
      setFriendResults && setFriendResults([]);
      setFriendSearch && setFriendSearch("");
    } catch (err) {
      console.error("Error enviando solicitud:", err);
      showAlert({ type: "error", message: "Error de conexión" });
    } finally {
      setLoadingSendRequest(false);
    }
  };

  const handleRemoveFriend = async () => {
    setLoadingRemoveFriend(true);
    try {
      const res = await fetch("/api/friends/request", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ friendId: user.id }),
      });
      const data = await res.json();
      if (!res.ok) {
        showAlert({
          type: "error",
          message: data.error || "Error de conexión",
        });
        return;
      }
      setIsFriend(false);
      showAlert({ type: "success", message: "Amigo eliminado con éxito" });
      socket.emit("removeFriend", data);
    } catch (err) {
      console.error("Error eliminando amigo:", err);
      showAlert({ type: "error", message: "Error de conexión" });
    } finally {
      setLoadingRemoveFriend(false);
    }
  };

  const onInvite = async () => {
    if (!activeRoom) return;
    try {
      const res = await fetch("/api/rooms/invite-room", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ roomId: activeRoom.id, userId: user.id }),
      });
      const data = await res.json();
      if (!res.ok) {
        showAlert({
          type: "error",
          message: data.error || "Error de conexión",
        });
        return;
      }
      showAlert({
        type: "success",
        message: `Invitación enviada a ${user.name}`,
      });
      socket.emit("inviteGame", data);
    } catch (error) {
      console.error("Error al invitar a la sala", error);
    } finally {
      setInvitationSent(true);
    }
  };

  return (
    <div className='flex items-center justify-between gap-2 select-none'>
      <div className='flex items-center gap-2'>
        <div className='relative'>
          <Image
            src={user.image || "/default-avatar.png"}
            alt='Avatar'
            width={48}
            height={48}
            className="rounded-full border-2 border-amber-400/40"
            unoptimized
          />
          <motion.div
            className={`absolute bottom-[2px] right-[2px] w-[14px] h-[14px] ${
              isOnline ? "bg-[#1A6642]" : "bg-[#A91D2F]"
            } rounded-full border-2 border-zinc-900`}
            animate={isOnline ? { scale: [1, 1.2, 1] } : {}}
            transition={{ repeat: Infinity, duration: 1 }}
          />
        </div>
        <h3 className="font-poppins text-[16px] font-semibold text-zinc-100">
          {user.name}
        </h3>
      </div>
      {loadingIsFriend || loadingFriendRequest ? (
        <div className='pr-3.5'>
          <CustomLoadingSpinner size='sm' showText={false} />
        </div>
      ) : (
        <div className='flex items-center gap-1'>
          {isFriend && onShowStats && (
            <motion.button
              type="button"
              disabled={isLoadingStats}
              whileHover={!isLoadingStats ? { scale: 1.2 } : undefined}
              whileTap={!isLoadingStats ? { scale: 0.9 } : undefined}
              className='min-w-[44px] min-h-[44px] flex items-center justify-center rounded-lg -m-1 disabled:opacity-70'
              onClick={() => !isLoadingStats && onShowStats(user.id)}
              aria-label="Ver estadísticas"
            >
              {isLoadingStats ? (
                <CustomLoadingSpinner size="sm" showText={false} />
              ) : (
                <BarChart2 className="h-6 w-6 text-sky-400 hover:text-sky-300" />
              )}
            </motion.button>
          )}
          {isFriend && challengeMode && onToggleChallenge && (
            <motion.button
              type="button"
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
              className={`-m-1 flex min-h-[44px] min-w-[44px] items-center justify-center rounded-lg transition-colors ${
                selectedForChallenge
                  ? "bg-emerald-600 text-white"
                  : "text-emerald-400 hover:bg-emerald-500/15"
              }`}
              onClick={() => onToggleChallenge(user.id)}
              aria-label={selectedForChallenge ? "Quitar del desafío" : "Desafiar"}
            >
              <Swords className="w-6 h-6" />
            </motion.button>
          )}
          {activeRoom &&
            (isFriend && !invitationSent ? (
              <motion.button
                type="button"
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
                className='min-w-[44px] min-h-[44px] flex items-center justify-center rounded-lg -m-1'
                onClick={onInvite}
                aria-label="Invitar a la sala"
              >
                <SendHorizonal className="h-6 w-6 text-sky-400 hover:text-sky-300" />
              </motion.button>
            ) : isFriend && invitationSent ? (
              <span className='min-w-[44px] min-h-[44px] flex items-center justify-center' aria-hidden>
                <MailCheck className="h-6 w-6 text-emerald-400" />
              </span>
            ) : null)}
          {isFriend ? (
            <motion.button
              type="button"
              disabled={loadingRemoveFriend}
              whileHover={!loadingRemoveFriend ? { scale: 1.2 } : undefined}
              whileTap={!loadingRemoveFriend ? { scale: 0.9 } : undefined}
              className='min-w-[44px] min-h-[44px] flex items-center justify-center rounded-lg -m-1 disabled:opacity-70'
              onClick={async () => {
                const ok = await showConfirm({
                  title: "Eliminar amigo",
                  message: `¿Eliminar a ${user.name} de tus amigos?`,
                  confirmLabel: "Eliminar",
                  cancelLabel: "Cancelar",
                  danger: true,
                });
                if (ok) handleRemoveFriend();
              }}
              aria-label={`Eliminar a ${user.name} de amigos`}
            >
              {loadingRemoveFriend ? (
                <CustomLoadingSpinner size="sm" showText={false} />
              ) : (
                <CircleX className="h-6 w-6 text-red-400 hover:text-red-300" />
              )}
            </motion.button>
          ) : friendRequestSent ? (
            <span className='min-w-[44px] min-h-[44px] flex items-center justify-center' aria-hidden>
              <MailCheck className="h-6 w-6 text-zinc-500" />
            </span>
          ) : (
            <motion.button
              type="button"
              disabled={loadingSendRequest}
              whileHover={!loadingSendRequest ? { scale: 1.2 } : undefined}
              whileTap={!loadingSendRequest ? { scale: 0.9 } : undefined}
              className='min-w-[44px] min-h-[44px] flex items-center justify-center rounded-lg -m-1 disabled:opacity-70'
              onClick={handleSendFriendRequest}
              aria-label={`Enviar solicitud a ${user.name}`}
            >
              {loadingSendRequest ? (
                <CustomLoadingSpinner size="sm" showText={false} />
              ) : (
                <CirclePlus className="h-6 w-6 text-emerald-400 hover:text-emerald-300" />
              )}
            </motion.button>
          )}
        </div>
      )}
    </div>
  );
}
