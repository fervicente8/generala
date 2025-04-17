"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { GameUser } from "@/types";
import CustomLoadingSpinner from "@/components/ui/CustomLoadingSpinner";
import { useAlert } from "@/components/ui/CustomAlert";
import { useSession } from "next-auth/react";
import { useParams } from "next/navigation";
import { useRouter } from "next/navigation";
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
  // Sonidos
  const diceRollSound = new Audio("/sounds/dice-roll.mp3");
  const pencilSound = new Audio("/sounds/pencil.mp3");
  // Router
  const router = useRouter();

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
      diceRollSound.currentTime = 0;
      diceRollSound.play();

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

    const handleScoreSubmitted = async (data: {
      currentTurnId: string;
      updatedGameUserId: string;
      updatedValues: GameUser;
    }) => {
      pencilSound.currentTime = 0;
      pencilSound.play();

      setGame((prevGame) => {
        if (prevGame) {
          return {
            ...prevGame,
            rollCount: 0,
            diceValues: [],
            dicesToReroll: [],
            currentTurnId: data.currentTurnId,
            players: prevGame.players.map((player) => {
              if (player.user.id === data.updatedValues.userId) {
                const { user, ...rest } = player;
                return {
                  ...data.updatedValues,
                  user,
                };
              }
              return player;
            }),
          };
        }
        return prevGame;
      });
    };

    socket.on("diceRolled", handleRoll);

    socket.on("scoreSubmitted", handleScoreSubmitted);

    return () => {
      socket.off("diceRolled", handleRoll);

      socket.off("scoreSubmitted", handleScoreSubmitted);
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

  const verifyGameEnd = () => {
    const isCompleted = game.players.every((player) => {
      const scoreFields = [
        "ones",
        "twos",
        "threes",
        "fours",
        "fives",
        "sixes",
        "straight",
        "fullHouse",
        "poker",
        "generala",
        "double",
      ];

      return scoreFields.every(
        (key) =>
          player[key as keyof GameUser] !== null &&
          player[key as keyof GameUser] !== undefined
      );
    });

    return isCompleted;
  };

  const getWinnersAndRanking = () => {
    const completedPlayers = game.players
      .filter((player) => typeof player.totalScore === "number")
      .sort((a, b) => b.totalScore! - a.totalScore!); // Orden descendente

    if (completedPlayers.length === 0) return { winners: [], ranking: [] };

    const maxScore = completedPlayers[0].totalScore!;
    const winners = completedPlayers.filter((p) => p.totalScore === maxScore);

    return { winners, ranking: completedPlayers };
  };

  const { winners, ranking } = getWinnersAndRanking();

  return (
    <div className='relative w-full h-[100vh] bg-green-800 overflow-hidden shadow-xl'>
      {/* Imagen para desktop */}
      <div className='hidden lg:block w-full h-full'>
        <Image
          src='/table-desktop.png'
          alt='Mesa de Generala - Desktop'
          layout='fill'
          className='relative object-fit-cover'
        />
      </div>

      {/* Imagen para dispositivos móviles */}
      <div className='lg:hidden w-full h-full'>
        <Image
          src='/table-mobile.png'
          alt='Mesa de Generala - Mobile'
          layout='fill'
          className='relative object-fit-cover'
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

      {!verifyGameEnd() ? (
        <>
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
        </>
      ) : (
        <div className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center gap-6 select-none'>
          <div className='flex flex-col items-center gap-4'>
            <p className='text-2xl text-[var(--color-gold)] font-bold'>
              Juego terminado
            </p>
            {winners.length === 1 ? (
              <p className='text-2xl text-white font-bold'>
                {winners[0].user.name} es el ganador!
              </p>
            ) : (
              <p className='text-2xl text-white font-bold'>
                ¡Empate entre {winners.map((w) => w.user.name).join(", ")}!
              </p>
            )}
          </div>

          <div className='flex flex-col gap-2 items-center text-white'>
            <p className='text-xl font-semibold underline'>Ranking</p>
            {ranking.map((player, index) => (
              <div
                key={player.id}
                className={`text-lg ${
                  winners.some((w) => w.id === player.id)
                    ? "text-[var(--color-gold)] font-bold"
                    : ""
                }`}
              >
                {index + 1}. {player.user.name} - {player.totalScore} pts
              </div>
            ))}
          </div>

          <button
            className='bg-[var(--color-gold)] text-black py-2 px-4 rounded-lg font-semibold hover:bg-[var(--color-gold)]/80 transition-all duration-200 cursor-pointer'
            onClick={() => {
              router.push("/");
            }}
          >
            Volver al lobby
          </button>
        </div>
      )}

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
