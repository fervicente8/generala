"use client";

import { Game, GameUser, User, UserFriendship } from "@/types";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { LogOut, Search, X, LockIcon, Trash2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import CustomLoadingSpinner from "@/components/ui/CustomLoadingSpinner";
import { socket } from "@/lib/socket";
import FriendCard from "@/components/friends/FriendCard";
import FriendsRequests from "@/components/friends/FriendsRequests";

export default function MainMenu() {
  // Session
  const { data: session, status } = useSession();
  // Variables
  const router = useRouter();
  // Estados del componente
  const [isLoadingRooms, setIsLoadingRooms] = useState(false);
  const [rooms, setRooms] = useState<Game[]>([]);
  const [friends, setFriends] = useState<UserFriendship[]>([]);
  const [isLoadingFriends, setIsLoadingFriends] = useState(false);
  const [search, setSearch] = useState("");
  const [friendSearch, setFriendSearch] = useState("");
  const [friendResults, setFriendResults] = useState<User[]>([]);
  const [isSearchingFriends, setIsSearchingFriends] = useState(false);
  // Estados de creación de sala
  const [isCreatingRoom, setIsCreatingRoom] = useState(false);
  const [gameSettings, setGameSettings] = useState<{
    name: string;
    maxPlayers: number;
    minPlayers: number;
    turnTimeout: number | null;
    password: string;
  }>({
    name: "",
    maxPlayers: 4,
    minPlayers: 2,
    turnTimeout: 30,
    password: "",
  });
  const [isModalOpen, setIsModalOpen] = useState(false);
  // Sala activa
  const [activeRoom, setActiveRoom] = useState<Game | null>(null);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  useEffect(() => {
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
      } else {
        setRooms((prevRooms) =>
          prevRooms.filter((room) => room.id !== data.id)
        );
      }
    };

    const handleUserJoined = (data: any) => {
      setActiveRoom(data.game);
    };

    const handleUserLeft = (data: any) => {
      if (
        data.game.players.find(
          (player: any) => player.userId === session?.user?.id
        )
      ) {
        setActiveRoom(data.game);
      } else {
        setActiveRoom(null);
      }
    };

    const handleRequestAccepted = (data: UserFriendship) => {
      if (
        data.receiverId === session?.user?.id ||
        data.requesterId === session?.user?.id
      ) {
        let updatedFriends = friends;
        updatedFriends.push(data);
        setFriends(updatedFriends);
      }
    };

    const handleRemoveFriend = (data: UserFriendship) => {
      if (
        data.receiverId === session?.user?.id ||
        data.requesterId === session?.user?.id
      ) {
        let updatedFriends = friends;
        updatedFriends = updatedFriends.filter(
          (friend) => friend.id !== data.id
        );
        setFriends(updatedFriends);
      }
    };

    socket.on("connect", () => {});
    socket.on("disconnect", () => {});

    socket.on("gameCreated", handleCreateRoom);
    socket.on("gameDeleted", handleDeleteRoom);

    socket.on("userJoined", handleUserJoined);
    socket.on("userLeft", handleUserLeft);

    socket.on("requestAccepted", handleRequestAccepted);
    socket.on("friendRemoved", handleRemoveFriend);

    return () => {
      socket.off("connect", () => {});
      socket.off("disconnect", () => {});

      socket.off("gameCreated", handleCreateRoom);
      socket.off("gameDeleted", handleDeleteRoom);

      socket.off("userJoined", handleUserJoined);
      socket.off("userLeft", handleUserLeft);

      socket.off("requestAccepted", handleRequestAccepted);
      socket.off("friendRemoved", handleRemoveFriend);
    };
  }, [session, activeRoom?.id]);

  useEffect(() => {
    if (status === "authenticated" && session?.user) {
      socket.emit("userOnline", {
        id: session.user.id,
        name: session.user.name,
      });

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
          setRooms(data || []);
          setIsLoadingRooms(false);
        })
        .catch(() => setIsLoadingRooms(false));
    }
  }, [status, session, activeRoom]);

  useEffect(() => {
    const fetchActiveRoom = async () => {
      if (!session?.user?.id) return;

      try {
        const res = await fetch(
          `/api/rooms/active-room?userId=${session.user.id}`
        );
        const data = await res.json();

        if (res.ok && data) {
          setActiveRoom(data);
        }
      } catch (error) {
        console.error("Error obteniendo la sala activa:", error);
      }
    };

    fetchActiveRoom();
  }, [session]);

  useEffect(() => {
    if (!friendSearch.trim()) {
      setFriendResults([]);
    }
  }, [friendSearch]);

  if (status === "loading") {
    return (
      <div className='flex items-center justify-center h-screen bg-[var(--color-green)]'>
        <CustomLoadingSpinner size='md' text='Verificando sesión...' />
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
        (friend: User) => friend.id !== session.user.id
      );
      setFriendResults(filteredData || []);
    } finally {
      setIsSearchingFriends(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setGameSettings((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setGameSettings((prev) => ({
      ...prev,
      turnTimeout: e.target.checked ? null : prev.turnTimeout ?? 30,
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
        body: JSON.stringify({
          ...gameSettings,
          ownerId: session?.user?.id,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.error || "Error desconocido al crear la sala");
        return;
      }

      socket.emit("createGame", data);
      setIsModalOpen(false);
      setGameSettings({
        name: "",
        maxPlayers: 4,
        minPlayers: 2,
        turnTimeout: 30,
        password: "",
      });
    } catch (error) {
      alert("Error de conexión con el servidor.");
    } finally {
      setIsCreatingRoom(false);
    }
  };

  const handleDeleteRoom = async (roomId: string) => {
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
      alert("No se pudo eliminar la sala");
    }
  };

  const joinRoom = async (gameId: string, password?: string) => {
    if (!session?.user?.id) return;

    try {
      const res = await fetch("/api/rooms/join-room", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId: session.user.id,
          gameId,
          password,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.error || "No se pudo unir a la sala");
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
      alert("Error de conexión con el servidor");
    }
  };

  const leaveRoom = async (gameId: string) => {
    if (!session?.user?.id) return;

    try {
      const res = await fetch("/api/rooms/leave-room", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId: session.user.id,
          gameId,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.error || "Error al salir de la sala");
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
      alert("Error de conexión");
    }
  };

  const startGame = (room: Game) => {};

  return (
    <div className='flex min-h-screen bg-[var(--color-green)] text-[var(--color-black)] overflow-hidden'>
      {/* Lista de amigos */}
      <aside className='relative w-full md:w-1/4 p-6 bg-[var(--color-beige)] shadow-lg rounded-r-2xl'>
        <h2 className='text-2xl font-bold mb-4 text-[var(--color-black)]'>
          Amigos
        </h2>
        {/* Buscador de amigos */}
        <div className='mt-4 relative'>
          <input
            type='text'
            placeholder='Buscar amigos...'
            value={friendSearch}
            onChange={(e) => setFriendSearch(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSearchFriends()}
            className='w-full p-3 border border-[var(--color-black)]/20 rounded-lg bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-gold)] transition-all duration-200'
          />
          <button
            onClick={handleSearchFriends}
            disabled={isSearchingFriends}
            className='mt-3 w-full bg-[var(--color-gold)] hover:bg-[var(--color-gold)]/80 text-white font-semibold py-3 px-4 rounded-lg shadow-md transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed'
          >
            {isSearchingFriends ? "Buscando..." : "Buscar"}
          </button>
          {friendResults && (
            <div>
              {isSearchingFriends ? (
                <div className='mt-5'>
                  <CustomLoadingSpinner
                    size='sm'
                    textColor='var(--color-black)'
                    text='Buscando amigos'
                  />
                </div>
              ) : (
                Array.isArray(friendResults) &&
                friendResults.length > 0 && (
                  <ul className='mt-4 space-y-2 overflow-scroll scrollbar-none'>
                    <AnimatePresence>
                      {friendResults.map((user) => (
                        <motion.li
                          key={user.id}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          transition={{ duration: 0.3 }}
                          className='p-3 bg-white rounded-lg shadow-sm transition-colors duration-200'
                        >
                          <FriendCard
                            sessionUser={session?.user as User}
                            user={user}
                            setFriendSearch={setFriendSearch}
                            setFriendResults={setFriendResults}
                            activeRoom={activeRoom ? activeRoom : undefined}
                          />
                        </motion.li>
                      ))}
                    </AnimatePresence>
                  </ul>
                )
              )}
            </div>
          )}
        </div>

        {!isSearchingFriends && friendResults.length === 0 && (
          <div>
            {isLoadingFriends ? (
              <div className='mt-5'>
                <CustomLoadingSpinner
                  size='sm'
                  textColor='var(--color-black)'
                  text='Cargando amigos'
                />
              </div>
            ) : friends.length === 0 ? (
              <p className='text-[var(--color-black)]/70 italic mt-5 text-center'>
                No tienes amigos agregados.
              </p>
            ) : (
              <ul className='mt-4 space-y-3 overflow-scroll scrollbar-none'>
                <AnimatePresence>
                  {Array.isArray(friends) &&
                    friends.map((friend) => (
                      <motion.li
                        key={friend.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.3 }}
                        className='p-3 bg-white rounded-lg shadow-md transition-colors duration-200'
                      >
                        <FriendCard
                          sessionUser={session?.user as User}
                          user={
                            friend.receiver.id === session?.user?.id
                              ? friend.requester
                              : friend.receiver
                          }
                          activeRoom={activeRoom ? activeRoom : undefined}
                        />
                      </motion.li>
                    ))}
                </AnimatePresence>
              </ul>
            )}
          </div>
        )}
        <div className='absolute bottom-2 w-[90%] left-1/2 transform -translate-x-1/2'>
          <FriendsRequests />
        </div>
      </aside>

      {/* Contenido principal */}
      <main className='relative flex-1 p-6 md:p-15 overflow-y-scroll scrollbar-none'>
        <div className='w-full mx-auto'>
          <h1 className='text-4xl font-extrabold mb-4 text-[var(--color-beige)] drop-shadow-md'>
            Bienvenido, {session.user?.name}
          </h1>

          {/* Barra de búsqueda de salas */}
          <div className='w-full flex items-center bg-white shadow-md rounded-lg '>
            <Search className='w-6 h-6 text-[var(--color-black)] mx-4' />
            <input
              type='text'
              placeholder='Buscar sala...'
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className='flex-1 p-4 border border-[var(--color-black)]/20   rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--color-gold)] text-[var(--color-black)] transition-all duration-200'
            />
          </div>
          {/* Tu sala */}
          {activeRoom && (
            <section className='mt-6'>
              <h2 className='text-2xl font-bold text-[var(--color-beige)] mb-4'>
                Sala activa
              </h2>
              <div className='flex items-center justify-between p-4 bg-white rounded-lg shadow-md md:w-2/4'>
                <div className='flex flex-col gap-2'>
                  <p className='text-[var(--color-black)] text-lg italic'>
                    {activeRoom.name}
                  </p>
                  <div className='flex gap-2 items-center'>
                    {activeRoom.players.map((player) => (
                      <img
                        key={player.id}
                        src={player.user.image || "/default-avatar.png"}
                        alt='Foto de perfil'
                        className='w-15 h-15 rounded-full'
                      />
                    ))}
                  </div>
                </div>
                <div className='flex flex-col gap-2'>
                  <p className='text-[var(--color-black)] text-lg text-right font-bold'>
                    {activeRoom.players.length}/{activeRoom.maxPlayers}{" "}
                    jugadores
                  </p>
                  <button
                    className='bg-[var(--color-red)] hover:bg-[var(--color-red)]/80 text-white font-semibold py-3 px-6 rounded-lg shadow-md transition-all duration-200 cursor-pointer text-sm'
                    onClick={() => {
                      if (activeRoom.ownerId === session.user?.id) {
                        handleDeleteRoom(activeRoom.id);
                      } else {
                        leaveRoom(activeRoom.id);
                      }
                    }}
                  >
                    {activeRoom.ownerId === session.user?.id
                      ? "Eliminar sala"
                      : "Salir de la sala"}
                  </button>
                </div>
              </div>
            </section>
          )}

          {/* Listado de salas */}
          <section className='mt-6'>
            <div className='flex justify-between items-center mb-4'>
              <h2 className='text-2xl font-bold text-[var(--color-beige)]'>
                Salas disponibles
              </h2>
              {/* Botón para agregar sala */}
              <button
                className='bg-[var(--color-gold)] hover:bg-[var(--color-gold)]/80 text-white font-semibold py-3 px-6 rounded-lg shadow-md transition-all duration-200'
                onClick={() => setIsModalOpen(true)}
                disabled={isLoadingRooms || activeRoom !== null}
                style={{
                  cursor:
                    isLoadingRooms || activeRoom !== null
                      ? "not-allowed"
                      : "pointer",
                  opacity: isLoadingRooms || activeRoom !== null ? 0.5 : 1,
                }}
              >
                Crear sala
              </button>
            </div>
            {isLoadingRooms || isCreatingRoom ? (
              <CustomLoadingSpinner />
            ) : rooms.filter((room) => activeRoom?.id !== room.id).length ===
              0 ? (
              <p className='text-[var(--color-beige)]/70 italic'>
                No hay salas disponibles.
              </p>
            ) : rooms.filter((room) => room.name.includes(search)).length ===
              0 ? (
              <p className='text-[var(--color-beige)]/70 italic'>
                No se encontraron salas con el nombre "{search}".
              </p>
            ) : (
              <ul className='grid gap-4 md:grid-cols-2'>
                <AnimatePresence>
                  {Array.isArray(rooms) &&
                    rooms
                      .filter(
                        (room) =>
                          room.name.includes(search) &&
                          activeRoom?.id !== room.id
                      )
                      .map((room, index) =>
                        !room ? (
                          <div
                            key={index}
                            className='relative flex justify-center items-center p-4 py-6 bg-white rounded-lg shadow-md'
                          >
                            <CustomLoadingSpinner size='md' showText={false} />
                          </div>
                        ) : (
                          <motion.li
                            key={room.id}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            transition={{ duration: 0.3 }}
                            className='relative flex items-center p-4 bg-white rounded-lg shadow-md hover:shadow-lg hover:scale-105 transition-transform duration-200 cursor-pointer'
                            onClick={() => joinRoom(room.id)}
                          >
                            {/* Imagen del propietario */}
                            <img
                              src={room?.owner?.image || "/default-avatar.png"}
                              alt='Imagen del propietario'
                              className='w-10 h-10 rounded-full mr-4'
                              onError={(e) => {
                                e.currentTarget.src = "/default-avatar.png";
                              }}
                            />

                            {/* Información de la sala */}
                            <div className='flex flex-col flex-grow'>
                              <span className='text-lg font-semibold'>
                                {room?.name || "Sin nombre"}
                              </span>
                              <span className='text-sm text-gray-500'>
                                {room?.minPlayers ?? 0} a{" "}
                                {room?.maxPlayers ?? 0} jugadores
                              </span>
                            </div>

                            {/* Cantidad de jugadores */}
                            <span className='text-md font-semibold text-gray-700'>
                              {room?.players?.length ?? 0}/
                              {room?.maxPlayers ?? 0} jugadores
                            </span>

                            {/* Icono de candado si la sala tiene contraseña */}
                            {room?.password && (
                              <span className='absolute top-2 right-2 text-gray-500'>
                                <LockIcon size={20} />
                              </span>
                            )}
                          </motion.li>
                        )
                      )}
                </AnimatePresence>
              </ul>
            )}
          </section>
        </div>

        {activeRoom && (
          <div className='absolute bottom-2 left-[1%] w-[98%] bg-blue-500 text-white p-4 flex justify-between items-center rounded-lg'>
            <div className='flex gap-16 items-center'>
              <div>
                <h3 className='text-lg font-bold'>{activeRoom.name}</h3>
                <p>
                  {activeRoom.status === "waiting"
                    ? "Esperando jugadores..."
                    : "En juego"}
                </p>
              </div>
              <div className='flex gap-2'>
                {activeRoom?.players?.map((player) => (
                  <div
                    key={player.id}
                    className='flex flex-col gap-2 items-center justify-content-center bg-white p-4 rounded-lg'
                  >
                    <img
                      src={player.user.image || "/default-avatar.png"}
                      alt='Foto de perfil'
                      className='w-15 h-15 rounded-full'
                    />
                    <span className=' font-bold text-[var(--color-black)]'>
                      {player.user.name}
                    </span>
                  </div>
                ))}
              </div>
            </div>
            <div className='flex gap-4 items-center'>
              <p>
                {activeRoom?.players?.length}/{activeRoom.maxPlayers} jugadores
              </p>
              {activeRoom.ownerId === session?.user?.id && (
                <div className='flex gap-2 items-center'>
                  <button
                    onClick={() => startGame(activeRoom)}
                    className='bg-white text-blue-500 px-4 py-2 rounded font-bold hover:bg-blue-600 hover:text-white transition-colors duration-200 cursor-pointer'
                  >
                    Iniciar Partida
                  </button>
                  <Trash2
                    className='h-5 w-5 text-[var(--color-red)] cursor-pointer hover:text-[var(--color-red)]/80 transition-colors duration-200'
                    onClick={() => handleDeleteRoom(activeRoom.id)}
                  />
                </div>
              )}
            </div>
          </div>
        )}
      </main>

      {/* Botón de cierre de sesión */}
      <div className='absolute top-4 right-4'>
        <button
          onClick={handleCloseSession}
          className='bg-[var(--color-red)] hover:bg-[var(--color-red)]/80 text-white font-semibold py-3 px-4 rounded-lg shadow-md flex items-center transition-all duration-200'
        >
          <LogOut className='mr-2 h-5 w-5' />
          Cerrar sesión
        </button>
      </div>

      {isModalOpen && (
        <div className='fixed inset-0 flex items-center justify-center bg-[var(--color-black)]/50'>
          <div className='bg-white p-6 rounded-lg shadow-lg w-96'>
            <form action='POST' onSubmit={handleCreateRoom}>
              <div className='flex justify-between items-center'>
                <h2 className='text-xl font-bold'>Crear nueva sala</h2>
                <button onClick={() => setIsModalOpen(false)}>
                  <X className='text-gray-600 hover:text-gray-800' />
                </button>
              </div>

              <label className='block mb-2'>Nombre de la sala</label>
              <input
                type='text'
                name='name'
                value={gameSettings.name}
                onChange={handleChange}
                className='w-full p-2 border rounded mb-3 border-[var(--color-black)]/20 focus:outline-none focus:ring-2 focus:ring-[var(--color-gold)] text-[var(--color-black)] transition-all duration-200'
                placeholder={`Sala de ${session.user?.name}`}
                required
              />
              <label className='block mb-2'>Jugadores mínimos</label>
              <input
                type='number'
                name='minPlayers'
                value={gameSettings.minPlayers}
                onChange={handleChange}
                className='w-full p-2 border rounded mb-3 border-[var(--color-black)]/20 focus:outline-none focus:ring-2 focus:ring-[var(--color-gold)] text-[var(--color-black)] transition-all duration-200'
                min='2'
                max={gameSettings.maxPlayers}
              />

              <label className='block mb-2'>Jugadores máximos</label>
              <input
                type='number'
                name='maxPlayers'
                value={gameSettings.maxPlayers}
                onChange={handleChange}
                className='w-full p-2 border rounded mb-3 border-[var(--color-black)]/20 focus:outline-none focus:ring-2 focus:ring-[var(--color-gold)] text-[var(--color-black)] transition-all duration-200'
                min={gameSettings.minPlayers}
                max='5'
              />

              <label className='block mb-2'>¿Tiempo ilimitado por ronda?</label>
              <input
                type='checkbox'
                checked={gameSettings.turnTimeout === null}
                onChange={handleCheckboxChange}
                className='mb-3 ml-2 size-4'
              />

              <label className='block mb-2'>Tiempo por turno (segundos)</label>
              <input
                type='number'
                name='turnTimeout'
                value={gameSettings.turnTimeout || ""}
                onChange={handleChange}
                className='w-full p-2 border rounded mb-3 border-[var(--color-black)]/20 focus:outline-none focus:ring-2 focus:ring-[var(--color-gold)] text-[var(--color-black)] transition-all duration-200'
                min='10'
                max='120'
                disabled={gameSettings.turnTimeout === null}
              />

              <label className='block mb-2'>Contraseña (opcional)</label>
              <input
                type='password'
                name='password'
                value={gameSettings.password}
                onChange={handleChange}
                className='w-full p-2 border rounded mb-3 border-[var(--color-black)]/20 focus:outline-none focus:ring-2 focus:ring-[var(--color-gold)] text-[var(--color-black)] transition-all duration-200'
              />

              <button
                onClick={handleCreateRoom}
                className='mt-4 w-full bg-[var(--color-gold)] hover:bg-[var(--color-gold)]/80 text-white py-2 px-4 rounded '
              >
                Crear
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
