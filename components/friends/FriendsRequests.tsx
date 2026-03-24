import { GameInvitation, GameUser, User, UserFriendship } from "@/types";
import { Check, X } from "lucide-react";
import { useEffect, useState } from "react";
import { socket } from "@/lib/socket";
import { useSession } from "next-auth/react";
import { useAlert } from "../ui/CustomAlert";
import Image from "next/image";
import { motion } from "framer-motion";

interface Props {
  friends: UserFriendship[];
  setFriends: React.Dispatch<React.SetStateAction<UserFriendship[]>>;
  setIsJoiningRoom?: (isJoiningRoom: boolean) => void;
}

export default function FriendsRequests({
  friends,
  setFriends,
  setIsJoiningRoom,
}: Props) {
  const { data: session } = useSession();
  const [incomingRequests, setIncomingRequests] = useState<UserFriendship[]>(
    []
  );
  const [invitations, setInvitations] = useState<GameInvitation[]>([]);
  const { showAlert } = useAlert();

  useEffect(() => {
    const handleRequestSent = (data: UserFriendship) => {
      if (data.receiver.id === session?.user?.id) {
        showAlert({ type: "success", message: "Has recibido una solicitud" });
        setIncomingRequests((prev) => {
          if (!prev.some((r) => r.id === data.id)) {
            return [...prev, data];
          }
          return prev;
        });
      }
    };

    const handleGameInvitation = (data: GameInvitation) => {
      setInvitations((prevInvitations) => [...prevInvitations, data]);
      showAlert({
        type: "success",
        message: "Has recibido una invitación a una partida",
      });
    };

    const handleRequestAccepted = (data: UserFriendship) => {
      if (
        data.receiverId === session?.user?.id ||
        data.requesterId === session?.user?.id
      ) {
        setIncomingRequests((prev) => prev.filter((r) => r.id !== data.id));
        setFriends((prev) => [...prev, data]);
        showAlert({ type: "success", message: "Solicitud aceptada" });
      }
    };

    const handleRequestRejected = (data: UserFriendship) => {
      if (
        data.receiverId === session?.user?.id ||
        data.requesterId === session?.user?.id
      ) {
        setIncomingRequests((prev) => prev.filter((r) => r.id !== data.id));
      }
    };

    socket.on("requestSent", handleRequestSent);
    socket.on("gameInvited", handleGameInvitation);
    socket.on("requestAccepted", handleRequestAccepted);
    socket.on("requestRejected", handleRequestRejected);

    return () => {
      socket.off("requestSent", handleRequestSent);
      socket.off("gameInvited", handleGameInvitation);
      socket.off("requestAccepted", handleRequestAccepted);
      socket.off("requestRejected", handleRequestRejected);
    };
  }, [session, friends, setFriends, showAlert]);

  useEffect(() => {
    const fetchIncomingRequests = async () => {
      try {
        const res = await fetch("/api/friends/incoming");
        const data = await res.json();
        setIncomingRequests(data);
      } catch (err) {
        console.error("Error al obtener peticiones de amistad:", err);
      }
    };

    const fetchInvitations = async () => {
      try {
        const res = await fetch("/api/users/get-invitations");
        const data = await res.json();
        setInvitations(data);
      } catch (err) {
        console.error("Error al obtener invitaciones:", err);
      }
    };

    fetchInvitations();
    fetchIncomingRequests();
  }, []);

  const handleRequestResponse = async (
    friendshipId: string,
    action: "ACCEPTED" | "REJECTED"
  ) => {
    try {
      const res = await fetch("/api/friends/request", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ friendshipId, status: action }),
      });
      const data = await res.json();
      if (!res.ok) {
        showAlert({
          type: "error",
          message: data.error || "Error de conexión",
        });
        return;
      }
      if (action === "ACCEPTED") {
        socket.emit("acceptFriendRequest", data);
      } else {
        showAlert({
          type: "success",
          message: "Solicitud rechazada con éxito",
        });
        socket.emit("rejectFriendRequest", data);
      }
    } catch (error) {
      console.error("Error al aceptar/rechazar:", error);
    }
  };

  const handleAcceptInvitation = async (invitationId: string) => {
    if (!session?.user?.id) return;
    setIsJoiningRoom && setIsJoiningRoom(true);
    try {
      const res = await fetch("/api/rooms/accept-invitation", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ invitationId }),
      });
      const data = await res.json();
      if (res.status === 404 || res.status === 400) {
        showAlert({
          type: "error",
          message: data.error || "Error de conexión",
        });
        setInvitations((prevInvitations) =>
          prevInvitations.filter((i) => i.id !== invitationId)
        );
        return;
      }
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
      setInvitations((prevInvitations) =>
        prevInvitations.filter((i) => i.id !== invitationId)
      );
      socket.emit("acceptGameInvitation", gameUser);
    } catch (error) {
      console.error("Error al aceptar invitación:", error);
    } finally {
      setIsJoiningRoom && setIsJoiningRoom(false);
    }
  };

  const handleRejectInvitation = async (invitationId: string) => {
    try {
      const res = await fetch("/api/rooms/reject-invitation", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ invitationId }),
      });
      if (res.status === 404) {
        setInvitations((prevInvitations) =>
          prevInvitations.filter((i) => i.id !== invitationId)
        );
        return;
      }
      if (!res.ok) {
        showAlert({ type: "error", message: "Error al rechazar invitación" });
        return;
      }
      showAlert({ type: "success", message: "Invitación rechazada con éxito" });
      setInvitations((prevInvitations) =>
        prevInvitations.filter((i) => i.id !== invitationId)
      );
    } catch (error) {
      console.error("Error al rechazar invitación:", error);
    }
  };

  return (
    <div className='flex flex-col gap-2'>
      {invitations.length > 0 && (
        <div className="flex items-center gap-2 rounded-xl border border-amber-400/25 bg-amber-500/10 px-4 py-2">
          <motion.div
            animate={{ rotate: [0, 360], scale: [1, 1.2, 1] }}
            transition={{ repeat: Infinity, duration: 2 }}
          >
            <Image src="/dice-icon.png" alt="" width={24} height={24} />
          </motion.div>
          <h2 className="font-poppins text-sm font-semibold text-amber-100 sm:text-base">
            Invitaciones de juego pendientes
          </h2>
        </div>
      )}
      {invitations.length > 0 && (
        <div className='flex flex-col gap-2 overflow-scroll scrollbar-none mb-8 max-h-[25%]'>
          {invitations.map((invitation) => (
            <motion.div
              key={invitation.id}
              className="flex items-center justify-between gap-2 rounded-xl border border-white/10 bg-white/6 px-4 py-2"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <div className='flex items-center gap-2'>
                <Image
                  src={invitation.sender.image || "/default-avatar.png"}
                  alt='Avatar'
                  width={40}
                  height={40}
                  className="rounded-full border-2 border-amber-400/35"
                  unoptimized
                />
                <p className="font-quicksand text-sm text-zinc-100">
                  {invitation.sender.name} te ha invitado a jugar
                </p>
              </div>
              <div className='flex gap-2'>
                <motion.div
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <X
                    onClick={() => handleRejectInvitation(invitation.id)}
                    className="cursor-pointer text-red-400 hover:text-red-300"
                  />
                </motion.div>
                <motion.div
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <Check
                    onClick={() => handleAcceptInvitation(invitation.id)}
                    className="cursor-pointer text-emerald-400 hover:text-emerald-300"
                  />
                </motion.div>
              </div>
            </motion.div>
          ))}
        </div>
      )}
      {incomingRequests.length > 0 && (
        <div className="flex items-center gap-2 rounded-xl border border-sky-400/25 bg-sky-500/10 px-4 py-2">
          <motion.div
            animate={{ rotate: [0, 360], scale: [1, 1.2, 1] }}
            transition={{ repeat: Infinity, duration: 2 }}
          >
            <Image src="/dice-icon.png" alt="" width={24} height={24} />
          </motion.div>
          <h2 className="font-poppins text-sm font-semibold text-sky-100 sm:text-base">
            Peticiones de amistad pendientes
          </h2>
        </div>
      )}
      {incomingRequests.length > 0 && (
        <div className='flex flex-col gap-2 overflow-scroll scrollbar-none mb-8 max-h-[25%]'>
          {incomingRequests.map((request) => (
            <motion.div
              key={request.id}
              className="flex items-center justify-between gap-2 rounded-xl border border-white/10 bg-white/6 px-4 py-2"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <div className='flex items-center gap-2'>
                <Image
                  src={request.requester.image || "/default-avatar.png"}
                  alt='Avatar'
                  width={40}
                  height={40}
                  className="rounded-full border-2 border-amber-400/35"
                  unoptimized
                />
                <p className="font-quicksand text-zinc-100">
                  {request.requester.name}
                </p>
              </div>
              <div className='flex gap-2'>
                <motion.div
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <X
                    onClick={() =>
                      handleRequestResponse(request.id, "REJECTED")
                    }
                    className="cursor-pointer text-red-400 hover:text-red-300"
                  />
                </motion.div>
                <motion.div
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <Check
                    onClick={() =>
                      handleRequestResponse(request.id, "ACCEPTED")
                    }
                    className="cursor-pointer text-emerald-400 hover:text-emerald-300"
                  />
                </motion.div>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}
