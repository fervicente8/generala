"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { GameUser } from "@/types";
import { ChevronDown, ChevronUp } from "lucide-react";
import { useAlert } from "../ui/CustomAlert";
import { socket } from "@/lib/socket";
import { useSession } from "next-auth/react";

interface ScoreTableProps {
  players: GameUser[];
  currentTurnId: string;
  isMyTurn: boolean;
  diceValues: number[];
  rollCount: number;
}

const CATEGORIES = [
  { label: "1", name: "ones" },
  { label: "2", name: "twos" },
  { label: "3", name: "threes" },
  { label: "4", name: "fours" },
  { label: "5", name: "fives" },
  { label: "6", name: "sixes" },
  { label: "Escalera", name: "straight" },
  { label: "Full", name: "fullHouse" },
  { label: "Poker", name: "poker" },
  { label: "Generala", name: "generala" },
  { label: "Doble Generala", name: "double" },
];

type GameUserCategory = keyof Pick<
  GameUser,
  | "ones"
  | "twos"
  | "threes"
  | "fours"
  | "fives"
  | "sixes"
  | "straight"
  | "fullHouse"
  | "poker"
  | "generala"
  | "double"
>;

function calculateScore(
  category: string,
  dice: number[],
  rollCount: number
): number {
  const counts = dice.reduce((acc, val) => {
    acc[val] = (acc[val] || 0) + 1;
    return acc;
  }, {} as Record<number, number>);

  const sorted = [...dice].sort();
  let baseScore = 0;
  let servedBonus = rollCount === 1 ? 5 : 0;

  switch (category) {
    case "1":
    case "2":
    case "3":
    case "4":
    case "5":
    case "6":
      const num = parseInt(category);
      return dice.filter((d) => d === num).reduce((a, b) => a + b, 0);

    case "Escalera":
      baseScore = ["12345", "23456", "34561"].includes(sorted.join(""))
        ? 20
        : 0;
      break;

    case "Full":
      baseScore =
        Object.values(counts).includes(3) && Object.values(counts).includes(2)
          ? 30
          : 0;
      break;

    case "Poker":
      baseScore = Object.values(counts).some((c) => c >= 4) ? 40 : 0;
      break;

    case "Generala":
      baseScore = Object.values(counts).some((c) => c === 5) ? 50 : 0;
      break;

    case "Doble Generala":
      baseScore = Object.values(counts).some((c) => c === 5) ? 100 : 0;
      break;

    default:
      return 0;
  }

  return baseScore > 0 ? baseScore + servedBonus : 0;
}

export default function ScoreTable({
  players,
  currentTurnId,
  isMyTurn,
  diceValues,
  rollCount,
}: ScoreTableProps) {
  // Session
  const { data: session } = useSession();

  const [loading, setLoading] = useState(false);
  const [visible, setVisible] = useState(false);
  const { showAlert } = useAlert();

  useEffect(() => {
    if (rollCount === 3 && isMyTurn) {
      setVisible(true);
    }
  }, [rollCount, isMyTurn]);

  const handleSetScore = async (category: string, score: number) => {
    if (!isMyTurn) return;
    setLoading(true);

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
    } finally {
      setLoading(false);
    }
  };

  const isAlreadySubmitted = (category: GameUserCategory, playerId: string) => {
    const player = players.find((p) => p.user.id === playerId);
    if (!player) return false;

    return player[category] !== null && player[category] !== undefined;
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={false}
        animate={{ height: visible ? "auto" : 48, opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.4, ease: "easeInOut" }}
        className='fixed bottom-0 left-0 w-1/3 bg-white rounded-t-2xl shadow-lg z-50 overflow-hidden'
      >
        <div className='relative px-4 py-2 border-b border-gray-200'>
          <h2 className='text-lg font-semibold text-center'>Anotador</h2>
          {visible ? (
            <ChevronDown
              onClick={() => setVisible(false)}
              className='absolute top-2 right-4 cursor-pointer'
            />
          ) : (
            <ChevronUp
              onClick={() => setVisible(true)}
              className='absolute top-2 right-4 cursor-pointer'
            />
          )}
        </div>

        {visible && (
          <div className='p-4'>
            <table className='w-full border-collapse'>
              <thead>
                <tr>
                  <th className='text-left'></th>
                  {players.map((player) => (
                    <th
                      key={player.userId}
                      className={`p-2 ${
                        session?.user?.id === player.userId
                          ? " text-blue-900"
                          : ""
                      }`}
                    >
                      {player.user.name}
                      {player.user.id === session?.user?.id && " (Yo)"}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {CATEGORIES.map((category) => (
                  <tr key={category.name}>
                    <td className='p-2 font-medium'>{category.label}</td>
                    {players.map((player) => {
                      const value =
                        player.userId === currentTurnId &&
                        isMyTurn &&
                        !isAlreadySubmitted(
                          category.name as GameUserCategory,
                          player.userId
                        )
                          ? calculateScore(
                              category.label,
                              diceValues,
                              rollCount
                            )
                          : player[category.name as GameUserCategory] === null
                          ? ""
                          : player[category.name as GameUserCategory];
                      return (
                        <td
                          key={player.id}
                          className={`p-2 text-center select-none ${
                            isAlreadySubmitted(
                              category.name as GameUserCategory,
                              player.userId
                            ) && "text-[#333] cursor-default"
                          } ${
                            isMyTurn &&
                            player.userId === currentTurnId &&
                            !isAlreadySubmitted(
                              category.name as GameUserCategory,
                              player.userId
                            ) &&
                            "cursor-pointer bg-blue-100 hover:text-blue-900 transition duration-200 ease-in-out font-semibold rounded"
                          }`}
                          onClick={() => {
                            if (
                              isMyTurn &&
                              player.userId === currentTurnId &&
                              !loading &&
                              !isAlreadySubmitted(
                                category.name as GameUserCategory,
                                player.userId
                              )
                            ) {
                              handleSetScore(category.name, value as number);
                            }
                          }}
                        >
                          {value}
                        </td>
                      );
                    })}
                  </tr>
                ))}
                <tr>
                  <td className='p-2 font-medium'>Total</td>
                  {players.map((player) => (
                    <td
                      key={player.id}
                      className='p-2 text-center cursor-default font-semibold text-blue-900'
                    >
                      {player.totalScore}
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>
        )}
      </motion.div>
    </AnimatePresence>
  );
}
