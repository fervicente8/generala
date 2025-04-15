import { Game, User } from "@/types";
import { useEffect, useState } from "react";
import { CirclePlus, CircleX, MailCheck, SendHorizonal } from "lucide-react";
import CustomLoadingSpinner from "../ui/CustomLoadingSpinner";
import { socket } from "@/lib/socket";
import { useSession } from "next-auth/react";

interface Props {
  sessionUser: User;
  user: User;
  activeRoom?: Game;
  setFriendSearch?: (userId: string) => void;
  setFriendResults?: (users: User[]) => void;
}

export default function FriendCard({
  sessionUser,
  user,
  activeRoom,
  setFriendSearch,
  setFriendResults,
}: Props) {
  // Session
  const { data: session } = useSession();
  const [loadingIsFriend, setLoadingIsFriend] = useState(true);
  const [isFriend, setIsFriend] = useState(false);
  const [invitationSent, setInvitationSent] = useState(false);
  const [loadingFriendRequest, setLoadingFriendRequest] = useState(true);
  const [friendRequestSent, setFriendRequestSent] = useState(false);
  const [isOnline, setIsOnline] = useState(false);

  useEffect(() => {
    if (!session) return;

    const handleUserOnline = (onlineUserIds: string[]) => {
      console.log("Online users:", onlineUserIds);

      if (onlineUserIds.includes(user.id)) {
        setIsOnline(true);
      } else {
        setIsOnline(false);
      }
    };

    socket.emit("userOnline", {
      id: session.user.id,
      name: session.user.name,
    });

    socket.on("updateOnlineUsers", handleUserOnline);

    return () => {
      socket.off("updateOnlineUsers", handleUserOnline);
    };
  }, [user.id, session]);

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
        alert("No se pudo enviar la solicitud de amistad");
        return;
      }

      socket.emit("friendRequest", data);

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
        alert("No se pudo eliminar el amigo");
        return;
      }

      setIsFriend(false);

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
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ roomId: activeRoom.id, userId: user.id }),
      });

      const data = await res.json();

      if (!res.ok) {
        alert(`Error al invitar a la sala: ${data.error}`);
        return;
      }

      socket.emit("inviteGame", data);
    } catch (error) {
      console.error("Error al invitar a la sala", error);
    } finally {
      setInvitationSent(true);
    }
  };
  console.log(user.image);

  return (
    <div className='flex items-center justify-between gap-2 select-none'>
      <div className='flex items-center gap-2'>
        <div className='relative'>
          <img
            src={user.image ? user.image : "/default-avatar.png"}
            alt='Avatar'
            className='w-12 h-12 rounded-full'
            onError={(e) => {
              e.currentTarget.src = "/default-avatar.png";
            }}
          />
          <div
            className={`absolute bottom-[2px] right-[2px] w-[14px] h-[14px] ${
              isOnline ? "bg-[var(--color-green)]" : "bg-[var(--color-red)]"
            } rounded-full border-1 border-white`}
          ></div>
        </div>
        <h3 className='text-[16px] font-semibold'>{user.name}</h3>
      </div>
      {loadingIsFriend || loadingFriendRequest ? (
        <div className='pr-3.5'>
          <CustomLoadingSpinner size='sm' showText={false} />
        </div>
      ) : (
        <div className='flex items-center gap-2'>
          {activeRoom &&
            (isFriend && !invitationSent ? (
              <SendHorizonal
                className='w-6 h-6 text-[var(--color-blue)] hover:scale-110 transition-all duration-200 cursor-pointer'
                onClick={onInvite}
              />
            ) : isFriend && invitationSent ? (
              <MailCheck className='w-6 h-6 text-[var(--color-green)]' />
            ) : null)}
          {isFriend ? (
            <CircleX
              className='w-6 h-6 text-[var(--color-red)] hover:scale-110 transition-all duration-200 cursor-pointer'
              onClick={handleRemoveFriend}
            />
          ) : friendRequestSent ? (
            <MailCheck className='w-6 h-6 text-[var(--color-gray)]' />
          ) : (
            <CirclePlus
              className='w-6 h-6 text-[var(--color-green)] hover:scale-110 transition-all duration-200 cursor-pointer'
              onClick={handleSendFriendRequest}
            />
          )}
        </div>
      )}
    </div>
  );
}
