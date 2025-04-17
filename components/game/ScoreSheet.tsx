"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { GameUser } from "@/types";
import { ChevronDown, ChevronUp } from "lucide-react";

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

function calculateScore(category: string, dice: number[]): number {
  const counts = dice.reduce((acc, val) => {
    acc[val] = (acc[val] || 0) + 1;
    return acc;
  }, {} as Record<number, number>);

  const sorted = [...dice].sort();

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
      return ["12345", "23456", "34561"].includes(sorted.join("")) ? 25 : 0;
    case "Full":
      return Object.values(counts).includes(3) &&
        Object.values(counts).includes(2)
        ? 30
        : 0;
    case "Poker":
      return Object.values(counts).some((c) => c >= 4) ? 40 : 0;
    case "Generala":
      return Object.values(counts).some((c) => c === 5) ? 50 : 0;
    case "Doble Generala":
      return Object.values(counts).some((c) => c === 5) ? 100 : 0;
    default:
      return 0;
  }
}

export default function ScoreTable({
  players,
  currentTurnId,
  isMyTurn,
  diceValues,
  rollCount,
}: ScoreTableProps) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (rollCount === 3 && isMyTurn) {
      setVisible(true);
    } else {
      setVisible(false);
    }
  }, [rollCount, isMyTurn]);

  const handleSetScore = (category: string, score: number) => {};

  return (
    <AnimatePresence>
      {visible ? (
        <motion.div
          initial={{ y: "100%", opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: "100%", opacity: 0 }}
          transition={{ duration: 0.4, ease: "easeInOut" }}
          className='fixed bottom-0 left-0 w-1/3 bg-white rounded-t-2xl shadow-lg p-4 z-50'
        >
          <div className='relative'>
            <h2 className='text-lg font-semibold mb-4 text-center'>Anotador</h2>
            <ChevronDown
              onClick={() => setVisible(false)}
              className='absolute top-1 right-2 cursor-pointer'
            />
          </div>
          <table className='w-full border-collapse'>
            <thead>
              <tr>
                <th className='text-left p-2'>Categoría</th>
                {players.map((player) => (
                  <th
                    key={player.userId}
                    className={`p-2 ${
                      currentTurnId === player.userId
                        ? "bg-blue-100 text-blue-900 rounded"
                        : ""
                    }`}
                  >
                    {player.user.name}
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
                      player.userId === currentTurnId && isMyTurn
                        ? calculateScore(category.label, diceValues)
                        : "-";
                    return (
                      <td
                        key={player.id}
                        className={`p-2 text-center ${
                          isMyTurn &&
                          player.userId === currentTurnId &&
                          "cursor-pointer hover:bg-blue-100 hover:text-blue-900 rounded"
                        }`}
                        onClick={() => {
                          if (isMyTurn && player.userId === currentTurnId) {
                            handleSetScore(
                              category.name,
                              value === "-" ? 0 : value
                            );
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
                  <td key={player.id} className='p-2 text-center'>
                    {player.totalScore}
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </motion.div>
      ) : (
        <div className='fixed bottom-0 left-0 w-1/3 bg-white rounded-t-2xl shadow-lg p-4 z-50'>
          <div className='relative'>
            <h2 className='text-lg font-semibold text-center'>Anotador</h2>
            <ChevronUp
              onClick={() => setVisible(true)}
              className='absolute bottom-1/2 translate-y-1/2 right-2 cursor-pointer'
            />
          </div>
        </div>
      )}
    </AnimatePresence>
  );
}
