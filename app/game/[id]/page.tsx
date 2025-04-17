"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { GameUser } from "@/types";
import CustomLoadingSpinner from "@/components/ui/CustomLoadingSpinner";
import { useAlert } from "@/components/ui/CustomAlert";
import { useSession } from "next-auth/react";
import { useParams } from "next/navigation";
import PlayerSlot from "@/components/game/PlayerSlot";
import Cup from "@/components/game/Cup";
import DiceBoard from "@/components/game/DiceBoard";
import { socket } from "@/lib/socket";
import ScoreTable from "@/components/game/ScoreSheet";

interface GameTableProps {
  id: string;
  players: GameUser[];
  status: "waiting" | "in progress" | "finished";
  turnTimeout: number | null;
  currentTurnId: string;
  diceValues: number[];
  rollCount: number;
}

export default function GameTable() {
  // Session
  const { data: session, status } = useSession();
  // Estados del componente
  const [loadingGame, setLoadingGame] = useState(true);
  const [game, setGame] = useState<GameTableProps | null>(null);
  const [rollingLoading, setRollingLoading] = useState(false);
  const [dicesToReroll, setDicesToReroll] = useState<number[]>([]);
  // Alerta
  const { showAlert } = useAlert();
  // Params
  const { id: gameId } = useParams();

  useEffect(() => {
    if (!session?.user?.id || !gameId) return;

    const fetchGame = async () => {
      try {
        const res = await fetch(
          `/api/rooms/get-room-by-id/${gameId}?userId=${session?.user.id}`
        );

        const data = await res.json();

        if (!res.ok) {
          showAlert({
            type: "error",
            message: data.error || "Error de conexión",
          });
          return;
        }

        setGame(data);
        setLoadingGame(false);
      } catch (error) {
        showAlert({ type: "error", message: "Error de conexión" });
      } finally {
        setLoadingGame(false);
      }
    };

    fetchGame();
  }, [gameId, session?.user.id]);

  useEffect(() => {
    if (!session?.user?.id) return;

    socket.on("connect", () => {});
    socket.emit("userOnline", {
      id: session.user.id,
      name: session.user.name,
    });
    socket.on("disconnect", () => {});

    return () => {
      socket.off("connect", () => {});
      socket.off("disconnect", () => {});
    };
  }, [session]);

  useEffect(() => {
    const handleRoll = async (data: {
      diceValues: number[];
      rollCount: number;
      dicesToReroll: number[];
    }) => {
      setRollingLoading(true);
      setDicesToReroll(data.dicesToReroll);

      setGame((prevGame) => {
        if (prevGame) {
          return {
            ...prevGame,
            diceValues: data.diceValues,
            rollCount: data.rollCount,
          };
        }
        return prevGame;
      });

      await new Promise((resolve) => setTimeout(resolve, 1500));

      setRollingLoading(false);
      setDicesToReroll([]);
    };

    socket.on("diceRolled", handleRoll);

    return () => {
      socket.off("diceRolled", handleRoll);
    };
  }, []);

  if (status === "loading") {
    return (
      <div className='flex items-center justify-center h-screen bg-[var(--color-green)]'>
        <CustomLoadingSpinner size='md' text='Cargando sesión...' />
      </div>
    );
  }

  if (loadingGame) {
    return (
      <div className='flex items-center justify-center h-screen bg-[var(--color-green)]'>
        <CustomLoadingSpinner size='md' text='Cargando juego...' />
      </div>
    );
  }

  if (!game) {
    return (
      <div className='flex items-center justify-center h-screen bg-[var(--color-green)]'>
        <p className='text-2xl text-white'>
          El juego no existe o no tienes permiso de acceso
        </p>
      </div>
    );
  }

  return (
    <div className='relative w-full h-[100vh] bg-green-800 overflow-hidden shadow-xl'>
      {/* Imagen para desktop */}
      <div className='hidden lg:block w-full h-full'>
        <Image
          src='/table-desktop.png'
          alt='Mesa de Generala - Desktop'
          layout='fill'
          objectFit='cover'
        />
      </div>

      {/* Imagen para dispositivos móviles */}
      <div className='lg:hidden w-full h-full'>
        <Image
          src='/table-mobile.png'
          alt='Mesa de Generala - Mobile'
          layout='fill'
          objectFit='cover'
        />
      </div>

      {game.players.map((player, index) => (
        <PlayerSlot
          key={player.userId}
          player={player}
          position={index}
          isCurrentTurn={player.userId === game.currentTurnId}
          timePerTurn={game.turnTimeout ? game.turnTimeout : 0}
          totalPlayers={game.players.length}
          rollCount={game.rollCount}
        />
      ))}

      <DiceBoard
        game={game}
        rollingLoading={rollingLoading}
        dicesToReroll={dicesToReroll}
        setDicesToReroll={setDicesToReroll}
        rollCount={game.rollCount}
        isMyTurn={session?.user?.id === game.currentTurnId}
      />

      <Cup
        gamePlayers={game.players}
        isMyTurn={session?.user?.id === game.currentTurnId}
        rollCount={game.rollCount}
        gameId={game.id}
        rollingLoading={rollingLoading}
        dicesToReroll={dicesToReroll}
        setDicesToReroll={setDicesToReroll}
      />

      <ScoreTable
        players={game.players}
        currentTurnId={game.currentTurnId}
        isMyTurn={session?.user?.id === game.currentTurnId}
        diceValues={game.diceValues}
        rollCount={game.rollCount}
      />
    </div>
  );
}
