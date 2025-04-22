"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { GameUser } from "@/types";
import { getPlayerPositions } from "@/lib/utils";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useAlert } from "../ui/CustomAlert";
import { socket } from "@/lib/socket";

interface PlayerSlotProps {
  player: GameUser;
  position: number;
  isCurrentTurn: boolean;
  timePerTurn?: number;
  currentTurnId?: string;
  totalPlayers?: number;
  players: GameUser[];
  rollCount?: number;
  isMyTurn?: boolean;
}

export default function PlayerSlot({
  player,
  position,
  isCurrentTurn,
  timePerTurn = 0,
  currentTurnId,
  totalPlayers = 2,
  players,
  rollCount = 0,
  isMyTurn,
}: PlayerSlotProps) {
  const { data: session } = useSession();
  const [timeLeft, setTimeLeft] = useState(timePerTurn);
  const positions = getPlayerPositions(totalPlayers);
  const { showAlert } = useAlert();

  useEffect(() => {
    if (isCurrentTurn && timePerTurn > 0) {
      setTimeLeft(timePerTurn);
      const interval = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            handleSetScore(getCategoryToStrike() || "double", 0);
            clearInterval(interval);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [isCurrentTurn, timePerTurn, player.user.id]);

  useEffect(() => {
    setTimeLeft(timePerTurn);
  }, [rollCount]);

  const getCategoryToStrike = () => {
    const currentPlayer = players.find(
      (player) => player.user.id === currentTurnId
    );

    if (!currentPlayer) return null;

    const categoriesInOrder = [
      "double",
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
    ];

    for (const category of categoriesInOrder) {
      const value = (currentPlayer as any)[category];
      if (value === null || value === undefined) {
        return category;
      }
    }

    return null;
  };

  const handleSetScore = async (category: string, score: number) => {
    try {
      const res = await fetch(`/api/game/submit-score`, {
        method: "POST",
        body: JSON.stringify({
          gameUserId: currentTurnId,
          gameId: players[0].gameId,
          category,
          score,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        showAlert({
          type: "error",
          message: data.error || "Error al guardar la puntuación",
        });
      }

      socket.emit("submitScore", {
        players: players.map((player) => player.user),
        currentTurnId: data.currentTurnId,
        updatedGameUserId: currentTurnId,
        updatedValues: data.updatedValues,
      });
    } catch (error) {
      showAlert({
        type: "error",
        message: "Error al guardar la puntuación",
      });
    }
  };

  return (
    <motion.div
      className={`absolute w-50  ${
        positions[position % positions.length]
      } flex flex-col items-center bg-white/20 backdrop-blur-md px-4  rounded-xl shadow-lg transition-all ${
        isCurrentTurn
          ? "ring-2 ring-blue-500 scale-105 bg-white/30 py-4"
          : "py-8"
      }`}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
    >
      <span className='text-white font-semibold mb-2 max-w-full truncate'>
        {player.user.name} {player.userId === session?.user?.id && "(Yo)"}
      </span>
      <Image
        src={player.user.image || "/default-avatar.png"}
        alt='Foto de perfil'
        width={64}
        height={64}
        className='rounded-full object-cover'
        unoptimized
      />
      {isCurrentTurn && timePerTurn > 0 && (
        <span className='text-blue-500 text-sm absolute bottom-2 right-2'>
          {timeLeft}s
        </span>
      )}
      {isCurrentTurn && (
        <div className='flex gap-2 mt-3'>
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              className={`w-4 h-4 rounded-full border-2 ${
                i < (rollCount ?? 0)
                  ? "border-blue-500 bg-blue-500"
                  : "border-white bg-transparent"
              }`}
              initial={{ scale: 0 }}
              animate={{
                scale: i < (rollCount ?? 0) ? 1.2 : 1,
              }}
              transition={{
                type: "spring",
                stiffness: 300,
                damping: 10,
                bounce: 0.5,
              }}
            />
          ))}
        </div>
      )}
    </motion.div>
  );
}
