"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { GameUser } from "@/types";
import CustomLoadingSpinner from "@/components/ui/CustomLoadingSpinner";
import { useAlert } from "@/components/ui/CustomAlert";
import { useSession } from "next-auth/react";
import { useParams, useRouter } from "next/navigation";
import PlayerSlot from "@/components/game/PlayerSlot";
import Cup from "@/components/game/Cup";
import DiceBoard from "@/components/game/DiceBoard";
import { socket } from "@/lib/socket";
import ScoreTable from "@/components/game/ScoreSheet";
import { Pause, Play, Volume2, VolumeX } from "lucide-react";
import { motion } from "framer-motion";

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
  const [loadingSubmit, setLoadingSubmit] = useState(false);
  // Alert
  const { showAlert } = useAlert();
  // Params
  const { id: gameId } = useParams();
  // Sound
  const [isMuted, setIsMuted] = useState(false);
  const [isSoundPlaying, setIsSoundPlaying] = useState(true);
  const backSoundRef = useRef<HTMLAudioElement | null>(null);
  // Variables
  const router = useRouter();

  const playBackSound = () => {
    const backSound = new Audio("/sounds/backSound.mp3");
    backSound.loop = true;
    backSound.volume = 0.03;
    backSound.currentTime = 0;
    backSound.play();
    backSoundRef.current = backSound;
  };

  const playDiceSound = useCallback(() => {
    if (isMuted) return;
    const diceRollSound = new Audio("/sounds/dice-roll.mp3");
    diceRollSound.volume = 0.2;
    diceRollSound.currentTime = 0;
    diceRollSound.play();
  }, [isMuted]);

  const playPencilSound = useCallback(() => {
    if (isMuted) return;
    const pencilSound = new Audio("/sounds/pencil.mp3");
    pencilSound.volume = 0.2;
    pencilSound.currentTime = 0;
    pencilSound.play();
  }, [isMuted]);

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
            message: data.error || "Error de conexión",
          });
          return;
        }

        setGame(data);
        setLoadingGame(false);
      } catch (error) {
        showAlert({ type: "error", message: "Error de conexión" });
      } finally {
        setLoadingGame(false);
      }
    };

    fetchGame();
  }, [gameId, session?.user?.id, showAlert]);

  useEffect(() => {
    playBackSound();

    return () => {
      backSoundRef.current?.pause();
      backSoundRef.current = null;
    };
  }, []);

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
      playDiceSound();
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

      await new Promise((resolve) => setTimeout(resolve, 500));
      setRollingLoading(false);
      setDicesToReroll([]);
    };

    const handleScoreSubmitted = async (data: {
      currentTurnId: string;
      updatedGameUserId: string;
      updatedValues: GameUser;
    }) => {
      playPencilSound();

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
      setLoadingSubmit(false);
    };

    socket.on("diceRolled", handleRoll);
    socket.on("scoreSubmitted", handleScoreSubmitted);

    return () => {
      socket.off("diceRolled", handleRoll);
      socket.off("scoreSubmitted", handleScoreSubmitted);
    };
  }, [playDiceSound, playPencilSound]);

  if (status === "loading") {
    return (
      <div className='flex items-center justify-center h-screen bg-[var(--color-black-matte)]'>
        <CustomLoadingSpinner size='md' text='Cargando sesión...' />
      </div>
    );
  }

  if (loadingGame) {
    return (
      <div className='flex items-center justify-center h-screen bg-[var(--color-black-matte)]'>
        <CustomLoadingSpinner size='md' text='Cargando juego...' />
      </div>
    );
  }

  if (!game) {
    return (
      <div className='flex items-center justify-center h-screen bg-[var(--color-black-matte)]'>
        <p className='text-lg sm:text-2xl text-[var(--color-pearl-white)] font-poppins'>
          El juego no existe o no tienes permiso de acceso
        </p>
      </div>
    );
  }

  const toggleBackSound = () => {
    if (!backSoundRef.current) return;

    if (isSoundPlaying) {
      backSoundRef.current.pause();
    } else {
      backSoundRef.current.play();
    }

    setIsSoundPlaying((prev) => !prev);
  };

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
      .sort((a, b) => b.totalScore! - a.totalScore!);

    if (completedPlayers.length === 0) return { winners: [], ranking: [] };

    const maxScore = completedPlayers[0].totalScore!;
    const winners = completedPlayers.filter((p) => p.totalScore === maxScore);

    return { winners, ranking: completedPlayers };
  };

  const { winners, ranking } = getWinnersAndRanking();

  return (
    <div className='relative flex flex-col lg:flex-row w-full h-screen overflow-hidden bg-[var(--color-black-matte)] font-quicksand'>
      <div className='w-full lg:w-2/8 lg:flex-shrink-0 h-1/2 lg:h-screen overflow-y-auto'>
        <ScoreTable
          players={game.players}
          currentTurnId={game.currentTurnId}
          isMyTurn={session?.user?.id === game.currentTurnId}
          diceValues={game.diceValues}
          rollCount={game.rollCount}
          loadingSubmit={loadingSubmit}
          setLoadingSubmit={setLoadingSubmit}
        />
      </div>
      <div className='flex-1 relative h-1/2 lg:h-screen'>
        <div className='absolute bottom-2 sm:bottom-4 right-2 sm:right-4 flex flex-row gap-2 z-[100]'>
          <motion.button
            className='bg-[var(--color-pearl-white)] text-[var(--color-black-matte)] p-2 sm:px-3 sm:py-1 rounded-full shadow-md border-2 border-[var(--color-metallic-gold)] hover:bg-[var(--color-silver-gray)] transition '
            onClick={() => setIsMuted(!isMuted)}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            {isMuted ? (
              <Volume2 className='h-4 w-4 sm:h-5 sm:w-5 text-[var(--color-black-matte)]' />
            ) : (
              <VolumeX className='h-4 w-4 sm:h-5 sm:w-5 text-[var(--color-black-matte)]' />
            )}
          </motion.button>
          <motion.button
            className='bg-[var(--color-pearl-white)] text-[var(--color-black-matte)] p-2 sm:px-3 sm:py-1 rounded-full shadow-md border-2 border-[var(--color-metallic-gold)] hover:bg-[var(--color-silver-gray)] transition'
            onClick={toggleBackSound}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            {isSoundPlaying ? (
              <Pause className='h-4 w-4 sm:h-5 sm:w-5 text-[var(--color-black-matte)]' />
            ) : (
              <Play className='h-4 w-4 sm:h-5 sm:w-5 text-[var(--color-black-matte)]' />
            )}
          </motion.button>
        </div>
        <div className='relative w-full h-full overflow-hidden shadow-xl z-50 bg-[url("/table-mobile.png")] sm:bg-[url("/table-desktop.png")] bg-cover bg-no-repeat bg-center'>
          {game.players.map((player, index) => (
            <PlayerSlot
              key={player.userId}
              player={player}
              position={index}
              isCurrentTurn={player.userId === game.currentTurnId}
              currentTurnId={game.currentTurnId}
              timePerTurn={game.turnTimeout ? game.turnTimeout : 0}
              totalPlayers={game.players.length}
              players={game.players}
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
            <motion.div
              className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center gap-4 sm:gap-6 select-none bg-[var(--color-pearl-white)] p-4 sm:p-6 rounded-xl shadow-lg border-2 border-[var(--color-metallic-gold)] w-11/12 sm:w-auto max-w-md'
              initial={{ opacity: 0, scale: 0.85 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ type: "spring", stiffness: 300, damping: 22 }}
            >
              <div className='flex flex-col items-center gap-3 sm:gap-4'>
                <p className='text-xl sm:text-3xl text-[var(--color-sapphire-blue)] font-poppins font-bold drop-shadow-[0_2px_2px_rgba(212,160,23,0.5)]'>
                  ¡Juego terminado!
                </p>
                {winners.length === 1 ? (
                  <p className='text-base sm:text-2xl text-[var(--color-black-matte)] font-poppins font-bold text-center'>
                    {winners[0].user.name} es el ganador!
                  </p>
                ) : (
                  <p className='text-base sm:text-2xl text-[var(--color-black-matte)] font-poppins font-bold text-center'>
                    ¡Empate entre {winners.map((w) => w.user.name).join(", ")}!
                  </p>
                )}
              </div>

              <div className='flex flex-col gap-2 items-center text-[var(--color-black-matte)]'>
                <p className='text-base sm:text-xl font-poppins font-semibold underline text-[var(--color-metallic-gold)]'>
                  Ranking
                </p>
                {ranking.map((player, index) => (
                  <div
                    key={player.id}
                    className={`text-sm sm:text-lg ${
                      winners.some((w) => w.id === player.id)
                        ? "text-[var(--color-sapphire-blue)] font-bold"
                        : "text-[var(--color-silver-gray)]"
                    } font-quicksand`}
                  >
                    {index + 1}. {player.user.name} - {player.totalScore} pts
                  </div>
                ))}
              </div>

              <motion.button
                className='bg-[var(--color-ruby-red)] text-[var(--color-pearl-white)] py-2 px-4 sm:px-6 rounded-lg font-poppins font-semibold border-2 border-[var(--color-metallic-gold)] hover:bg-[#DC2626] transition-all duration-200 text-sm sm:text-base'
                onClick={() => router.push("/")}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Volver al lobby
              </motion.button>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}
