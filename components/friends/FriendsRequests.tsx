import { GameInvitation, GameUser, User, UserFriendship } from "@/types";
import { Check, X } from "lucide-react";
import { useEffect, useState } from "react";
import { socket } from "@/lib/socket";
import { useSession } from "next-auth/react";
import { useAlert } from "../ui/CustomAlert";

interface Props {
  friends: UserFriendship[];
  setFriends: (friends: UserFriendship[]) => void;
}

export default function FriendsRequests({ friends, setFriends }: Props) {
  // Session
  const { data: session } = useSession();
  // Requests
  const [incomingRequests, setIncomingRequests] = useState<UserFriendship[]>(
    []
  );
  // Alerta
  const { showAlert } = useAlert();

  // Invitaciones
  const [invitations, setInvitations] = useState<GameInvitation[]>([]);

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
        message: "Has recibido una invitación a una partida",
      });
    };

    const handleRequestAccepted = (data: UserFriendship) => {
      if (
        data.receiverId === session?.user?.id ||
        data.requesterId === session?.user?.id
      ) {
        setIncomingRequests((prev) => prev.filter((r) => r.id !== data.id));
        let updatedFriends = friends;
        updatedFriends.push(data);
        setFriends(updatedFriends);
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
  }, [session]);

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
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ friendshipId, status: action }),
      });

      const data = await res.json();

      if (!res.ok) {
        showAlert({
          type: "error",
          message: data.error || "Error de conexión",
        });
        return;
      }

      if (action === "ACCEPTED") {
        socket.emit("acceptFriendRequest", data);
      } else {
        showAlert({
          type: "success",
          message: "Solicitud rechazada con éxito",
        });
        socket.emit("rejectFriendRequest", data);
      }
    } catch (error) {
      console.error("Error al aceptar/rechazar:", error);
    }
  };

  const handleAcceptInvitation = async (invitationId: string) => {
    if (!session?.user?.id) return;

    try {
      const res = await fetch("/api/rooms/accept-invitation", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ invitationId }),
      });

      const data = await res.json();

      if (res.status === 404 || res.status === 400) {
        showAlert({
          type: "error",
          message: data.error || "Error de conexión",
        });
        setInvitations((prevInvitations) =>
          prevInvitations.filter((i) => i.id !== invitationId)
        );
        return;
      }

      if (!res.ok) {
        showAlert({
          type: "error",
          message: data.error || "Error de conexión",
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
      console.error("Error al aceptar invitación:", error);
    }
  };

  const handleRejectInvitation = async (invitationId: string) => {
    try {
      const res = await fetch("/api/rooms/reject-invitation", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ invitationId }),
      });

      if (res.status === 404) {
        setInvitations((prevInvitations) =>
          prevInvitations.filter((i) => i.id !== invitationId)
        );
        return;
      }

      if (!res.ok) {
        showAlert({ type: "error", message: "Error al rechazar invitación" });
        return;
      }

      showAlert({ type: "success", message: "Invitación rechazada con éxito" });

      setInvitations((prevInvitations) =>
        prevInvitations.filter((i) => i.id !== invitationId)
      );
    } catch (error) {
      console.error("Error al rechazar invitación:", error);
    }
  };

  return (
    <div className='flex flex-col gap-2'>
      {invitations.length > 0 && (
        <h2 className='text-md bg-[var(--color-gold)] text-white px-4 py-2 rounded-lg text-center shadow-sm'>
          Invitaciones de juego pendientes
        </h2>
      )}

      {invitations.length > 0 && (
        <div className='flex flex-col gap-2 overflow-scroll scrollbar-none mb-8 max-h-[25%]'>
          {invitations.map((invitation) => (
            <div
              key={invitation.id}
              className='flex items-center justify-between gap-2 bg-white py-2 px-4 rounded-lg shadow-sm'
            >
              <div className='flex items-center gap-2'>
                <img
                  src={
                    invitation.sender.image
                      ? invitation.sender.image
                      : "/default-avatar.png"
                  }
                  alt='Avatar'
                  className='h-10 w-10 rounded-full'
                  onError={(e) => {
                    e.currentTarget.src = "/default-avatar.png";
                  }}
                />
                <p className='text-sm'>
                  {invitation.sender.name} te ha invitado a jugar
                </p>
              </div>
              <div className='flex gap-2'>
                <X
                  onClick={() => handleRejectInvitation(invitation.id)}
                  className='ml-auto cursor-pointer text-[var(--color-red)] hover:text-[var(--color-red)]/80'
                />
                <Check
                  onClick={() => handleAcceptInvitation(invitation.id)}
                  className='ml-auto cursor-pointer text-[var(--color-green)] hover:text-[var(--color-green)]/80'
                />
              </div>
            </div>
          ))}
        </div>
      )}

      {incomingRequests.length > 0 && (
        <h2 className='text-md bg-[var(--color-gold)] text-white px-4 py-2 rounded-lg text-center shadow-sm'>
          Peticiones de amistad pendientes
        </h2>
      )}

      {incomingRequests.length > 0 && (
        <div className='flex flex-col gap-2 overflow-scroll scrollbar-none mb-8 max-h-[25%]'>
          {incomingRequests.map((request) => (
            <div
              key={request.id}
              className='flex items-center justify-between gap-2 bg-white py-2 px-4 rounded-lg shadow-sm'
            >
              <div className='flex items-center gap-2'>
                <img
                  src={
                    request.requester.image
                      ? request.requester.image
                      : "/default-avatar.png"
                  }
                  alt='Avatar'
                  className='h-10 w-10 rounded-full'
                  onError={(e) => {
                    e.currentTarget.src = "/default-avatar.png";
                  }}
                />
                <p>{request.requester.name}</p>
              </div>
              <div className='flex gap-2'>
                <X
                  onClick={() => handleRequestResponse(request.id, "REJECTED")}
                  className='ml-auto cursor-pointer text-[var(--color-red)] hover:text-[var(--color-red)]/80'
                />
                <Check
                  onClick={() => handleRequestResponse(request.id, "ACCEPTED")}
                  className='ml-auto cursor-pointer text-[var(--color-green)] hover:text-[var(--color-green)]/80'
                />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
