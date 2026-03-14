import { Game, User } from "@/types";
import { useEffect, useState } from "react";
import { CirclePlus, CircleX, MailCheck, SendHorizonal } from "lucide-react";
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
}

export default function FriendCard({
  sessionUser,
  user,
  activeRoom,
  setFriendSearch,
  setFriendResults,
  onlineUserIds,
}: Props) {
  const [loadingIsFriend, setLoadingIsFriend] = useState(true);
  const [isFriend, setIsFriend] = useState(false);
  const [invitationSent, setInvitationSent] = useState(false);
  const [loadingFriendRequest, setLoadingFriendRequest] = useState(true);
  const [friendRequestSent, setFriendRequestSent] = useState(false);
  const [isOnline, setIsOnline] = useState(false);
  const { showAlert } = useAlert();

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
    }
  };

  const handleRemoveFriend = async () => {
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
            className='rounded-full border-2 border-[#D4A017]'
            unoptimized
          />
          <motion.div
            className={`absolute bottom-[2px] right-[2px] w-[14px] h-[14px] ${
              isOnline ? "bg-[#1A6642]" : "bg-[#A91D2F]"
            } rounded-full border-2 border-[#F5F5F5]`}
            animate={isOnline ? { scale: [1, 1.2, 1] } : {}}
            transition={{ repeat: Infinity, duration: 1 }}
          />
        </div>
        <h3 className='text-[16px] font-semibold font-poppins text-[#1A1A1A]'>
          {user.name}
        </h3>
      </div>
      {loadingIsFriend || loadingFriendRequest ? (
        <div className='pr-3.5'>
          <CustomLoadingSpinner size='sm' showText={false} />
        </div>
      ) : (
        <div className='flex items-center gap-2'>
          {activeRoom &&
            (isFriend && !invitationSent ? (
              <motion.div whileHover={{ scale: 1.2 }} whileTap={{ scale: 0.9 }}>
                <SendHorizonal
                  className='w-6 h-6 text-[#1E3A8A] cursor-pointer hover:text-[#3B82F6]'
                  onClick={onInvite}
                />
              </motion.div>
            ) : isFriend && invitationSent ? (
              <MailCheck className='w-6 h-6 text-[#1A6642]' />
            ) : null)}
          {isFriend ? (
            <motion.div whileHover={{ scale: 1.2 }} whileTap={{ scale: 0.9 }}>
              <CircleX
                className='w-6 h-6 text-[#A91D2F] cursor-pointer hover:text-[#DC2626]'
                onClick={handleRemoveFriend}
              />
            </motion.div>
          ) : friendRequestSent ? (
            <MailCheck className='w-6 h-6 text-[#B0B0B0]' />
          ) : (
            <motion.div whileHover={{ scale: 1.2 }} whileTap={{ scale: 0.9 }}>
              <CirclePlus
                className='w-6 h-6 text-[#1A6642] cursor-pointer hover:text-[#2E8B57]'
                onClick={handleSendFriendRequest}
              />
            </motion.div>
          )}
        </div>
      )}
    </div>
  );
}
