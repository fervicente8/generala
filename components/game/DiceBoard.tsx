"use client";

import { motion } from "framer-motion";
import { Dice1, Dice2, Dice3, Dice4, Dice5, Dice6 } from "lucide-react";
import { GameUser } from "@/types";

const diceIcons = [Dice1, Dice2, Dice3, Dice4, Dice5, Dice6];

interface GameTableProps {
  id: string;
  players: GameUser[];
  status: "waiting" | "in progress" | "finished";
  turnTimeout: number | null;
  currentTurnId: string;
  diceValues: number[];
  rollCount: number;
}

interface DiceBoardProps {
  game: GameTableProps;
  rollingLoading: boolean;
  dicesToReroll: number[];
  setDicesToReroll: (dices: number[]) => void;
  rollCount: number;
  isMyTurn: boolean;
}

export default function DiceBoard({
  game,
  rollingLoading,
  dicesToReroll,
  setDicesToReroll,
  rollCount,
  isMyTurn,
}: DiceBoardProps) {
  return (
    <div className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center gap-6 select-none'>
      <div className='flex gap-4'>
        {game.diceValues.map((value, index) => {
          const Icon = diceIcons[value - 1] || Dice1;

          return (
            <motion.div
              key={`${index}-${value}-${
                rollingLoading ? "animating" : "static"
              }`}
              initial={{ scale: 1, opacity: 1 }}
              animate={
                rollingLoading &&
                (rollCount === 1 || dicesToReroll.includes(index)) && {
                  rotate: [0, 720, 1440, 2160, 2880],
                  scale: [0.9, 1, 0.9, 1],
                  x: [0, -1, 1, -1, 1, 0],
                  y: [0, 1, -1, 1, -1, 0],
                  opacity: [0.9, 0.6, 0.8, 1],
                }
              }
              transition={{
                duration: 1,
                ease: "easeInOut",
                delay: index * 0.1,
              }}
              className={`
                ${
                  rollCount < 3 && isMyTurn
                    ? "cursor-pointer hover:scale-105"
                    : ""
                }
                ${
                  dicesToReroll.includes(index)
                    ? "bg-white/20 backdrop-blur-md shadow-md rounded-lg"
                    : ""
                }
              `}
              onClick={() => {
                if (rollCount < 3 && isMyTurn) {
                  if (dicesToReroll.includes(index)) {
                    setDicesToReroll(dicesToReroll.filter((d) => d !== index));
                  } else {
                    setDicesToReroll([...dicesToReroll, index]);
                  }
                }
              }}
            >
              <Icon
                size={64}
                fill='white'
                className='text-[var(--color-black)]'
              />
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
