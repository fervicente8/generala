import { GameInvitation, GameUser, User, UserFriendship } from "@/types";
import { Check, X } from "lucide-react";
import { useEffect, useState } from "react";
import { socket } from "@/lib/socket";
import { useSession } from "next-auth/react";

export default function FriendsRequests() {
  // Session
  const { data: session } = useSession();
  // Requests
  const [incomingRequests, setIncomingRequests] = useState<UserFriendship[]>(
    []
  );
  const [outgoingRequests, setOutgoingRequests] = useState<UserFriendship[]>(
    []
  );

  // Invitaciones
  const [invitations, setInvitations] = useState<GameInvitation[]>([]);

  useEffect(() => {
    const handleRequestSent = (data: UserFriendship) => {
      if (data.requester.id === session?.user?.id) {
        setOutgoingRequests((prev) => {
          if (!prev.some((r) => r.id === data.id)) {
            return [...prev, data];
          }
          return prev;
        });
      }

      if (data.receiver.id === session?.user?.id) {
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
    };

    const handleRequestAccepted = (data: UserFriendship) => {
      if (data.requesterId === session?.user?.id) {
        setOutgoingRequests((prev) => prev.filter((r) => r.id !== data.id));
      }

      if (data.receiverId === session?.user?.id) {
        setIncomingRequests((prev) => prev.filter((r) => r.id !== data.id));
      }
    };

    socket.on("requestSent", handleRequestSent);
    socket.on("gameInvited", handleGameInvitation);
    socket.on("requestCanceled", handleRequestAccepted);
    socket.on("requestAccepted", handleRequestAccepted);
    socket.on("requestRejected", handleRequestAccepted);

    return () => {
      socket.off("requestSent", handleRequestSent);
      socket.off("gameInvited", handleGameInvitation);
      socket.off("requestCanceled", handleRequestAccepted);
      socket.off("requestAccepted", handleRequestAccepted);
      socket.off("requestRejected", handleRequestAccepted);
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

    const fetchOutgoingRequests = async () => {
      try {
        const res = await fetch("/api/friends/outgoing");
        const data = await res.json();
        setOutgoingRequests(data);
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
    fetchOutgoingRequests();
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
        alert("Error al aceptar/rechazar solicitud");
        return;
      }

      if (action === "ACCEPTED") {
        socket.emit("acceptFriendRequest", data);
      } else {
        socket.emit("rejectFriendRequest", data);
      }
    } catch (error) {
      console.error("Error al aceptar/rechazar:", error);
    }
  };

  const handleCancelRequest = async (friendId: string) => {
    try {
      const res = await fetch("/api/friends/request", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ friendId }),
      });

      const data = await res.json();

      if (!res.ok) {
        alert("Error al cancelar solicitud");
        return;
      }

      socket.emit("cancelFriendRequest", data);
    } catch (error) {
      console.error("Error al cancelar:", error);
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

      if (!res.ok) {
        alert("Error al aceptar invitación");
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

      if (!res.ok) {
        alert("Error al rechazar invitación");
        return;
      }

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
                  src={invitation.sender.image || "/default-avatar.png"}
                  alt='Avatar'
                  className='h-10 w-10 rounded-full'
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
                  src={request.requester.image || "/default-avatar.png"}
                  alt='Avatar'
                  className='h-10 w-10 rounded-full'
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

      {outgoingRequests.length > 0 && (
        <h2 className='text-md bg-[var(--color-gold)] text-white px-4 py-2 rounded-lg text-center shadow-sm'>
          Peticiones de amistad enviadas
        </h2>
      )}

      {outgoingRequests.length > 0 && (
        <div className='flex flex-col gap-2 overflow-scroll scrollbar-none mb-8 max-h-[25%]'>
          {outgoingRequests.map((request) => (
            <div
              key={request.id}
              className='flex items-center gap-2 bg-white py-2 px-4 rounded-lg shadow-sm'
            >
              <img
                src={request.receiver.image || "/default-avatar.png"}
                alt='Avatar'
                className='h-10 w-10 rounded-full'
              />
              <p>{request.receiver.name}</p>
              <button
                className='ml-auto rounded-lg bg-[var(--color-gold)] px-4 py-2 text-white hover:bg-[var(--color-gold)]/80 text-sm cursor-pointer'
                onClick={() => handleCancelRequest(request.receiverId)}
              >
                Cancelar
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
