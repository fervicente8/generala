"use client";

import { GameUser } from "@/types";
import Dice from "./Dice";

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
          return (
            <Dice
              key={index}
              value={value as 1 | 2 | 3 | 4 | 5 | 6}
              rolling={
                rollingLoading &&
                (rollCount === 1 || dicesToReroll.includes(index))
              }
              selectedForReroll={dicesToReroll.includes(index)}
              onClick={() => {
                if (rollCount < 3 && isMyTurn) {
                  if (dicesToReroll.includes(index)) {
                    setDicesToReroll(dicesToReroll.filter((d) => d !== index));
                  } else {
                    setDicesToReroll([...dicesToReroll, index]);
                  }
                }
              }}
              isMyTurn={isMyTurn}
            />
          );
        })}
      </div>
    </div>
  );
}
