"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { GameUser } from "@/types";
import { getPlayerPositions } from "@/lib/utils";
import { useSession } from "next-auth/react";

interface PlayerSlotProps {
  player: GameUser;
  position: number;
  isCurrentTurn: boolean;
  timePerTurn?: number;
  totalPlayers?: number;
  rollCount?: number;
}

export default function PlayerSlot({
  player,
  position,
  isCurrentTurn,
  timePerTurn = 0,
  totalPlayers = 2,
  rollCount = 0,
}: PlayerSlotProps) {
  const { data: session } = useSession();
  const [timeLeft, setTimeLeft] = useState(timePerTurn);
  const positions = getPlayerPositions(totalPlayers);

  useEffect(() => {
    if (isCurrentTurn && timePerTurn > 0) {
      setTimeLeft(timePerTurn);
      const interval = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            clearInterval(interval);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [isCurrentTurn, timePerTurn]);

  return (
    <motion.div
      className={`absolute w-50  ${
        positions[position % positions.length]
      } flex flex-col items-center bg-white/20 backdrop-blur-md px-4  rounded-xl shadow-lg transition-all ${
        isCurrentTurn
          ? "ring-2 ring-[var(--color-gold)] scale-105 bg-white/30 py-4"
          : "py-8"
      }`}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
    >
      <span className='text-white font-semibold mb-2 max-w-full truncate'>
        {player.user.name} {player.userId === session?.user?.id && "(Yo)"}
      </span>
      <img
        src={player.user.image ? player.user.image : "/default-avatar.png"}
        alt='Foto de perfil'
        className='w-16 h-16 rounded-full object-cover '
        onError={(e) => (e.currentTarget.src = "/default-avatar.png")}
      />
      {isCurrentTurn && timePerTurn > 0 && (
        <span className='text-[var(--color-gold)] text-sm absolute bottom-2 right-2'>
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
                  ? "border-[var(--color-gold)] bg-[var(--color-gold)]"
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
