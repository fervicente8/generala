"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { GameUser } from "@/types";
import { useAlert } from "../ui/CustomAlert";
import { socket } from "@/lib/socket";
import { useSession } from "next-auth/react";
import Image from "next/image";
import styles from "./ScoreSheet.module.css";

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
  { label: "Generala II", name: "double" },
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
  rollCount: number,
  playerScore: GameUser
): number {
  const counts = dice.reduce((acc, val) => {
    if (acc[val]) {
      acc[val] += 1;
    } else {
      acc[val] = 1;
    }
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
      return (counts[num] || 0) * num;

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
      baseScore =
        Object.values(counts).some((c) => c === 5) && playerScore.generala
          ? 100
          : 0;
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
  const { showAlert } = useAlert();

  useEffect(() => {
    const pointer = document.querySelector(`.${styles.pointer}`) as HTMLElement;
    const container = document.querySelector(
      `.${styles.container}`
    ) as HTMLElement;

    const trackPointer = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      if (pointer) {
        pointer.style.left = `${clientX - pointer.offsetWidth / 2 + 10}px`;
        pointer.style.top = `${clientY - pointer.offsetHeight / 2 - 10}px`;
      }
    };

    const handleMouseEnter = () => {
      if (pointer) {
        pointer.style.opacity = "1";
      }
    };

    const handleMouseLeave = () => {
      if (pointer) {
        pointer.style.opacity = "0";
      }
    };

    document.addEventListener("mousemove", trackPointer);
    if (container) {
      container.addEventListener("mouseenter", handleMouseEnter);
      container.addEventListener("mouseleave", handleMouseLeave);
    }

    return () => {
      document.removeEventListener("mousemove", trackPointer);
      if (container) {
        container.removeEventListener("mouseenter", handleMouseEnter);
        container.removeEventListener("mouseleave", handleMouseLeave);
      }
    };
  }, []);

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
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4, ease: "easeInOut" }}
      className={`${styles.container} bg-white max-w-[600px] h-[100vh] z-50 py-2 px-4`}
      style={{
        backgroundImage: "url('/textures/paper.png')",
        backgroundSize: "cover",
      }}
    >
      <div className={styles.pointer} />
      <div className='overflow-x-scroll'>
        <h2 className='text-xl font-semibold mb-6 mt-2'>Anotador</h2>

        <table className='w-full border-separate border-spacing-y-1 h-[88vh]'>
          <thead>
            <tr>
              <th className='text-left'></th>
              {players.map((player) => (
                <th key={player.userId} className={``}>
                  <Image
                    src={player.user.image || "/default-avatar.png"}
                    alt='Avatar'
                    width={64}
                    height={64}
                    className='rounded-full m-auto'
                    unoptimized
                  />
                </th>
              ))}
            </tr>
            <tr>
              <th className='text-left'></th>
              {players.map((player) => (
                <th
                  key={player.userId}
                  className={`p-2 text-md ${
                    session?.user?.id === player.userId ? "text-blue-500" : ""
                  }`}
                >
                  {player.user.name}
                  {player.user.id === session?.user?.id && " (Yo)"}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {CATEGORIES.map((category, index) => (
              <tr key={category.name}>
                <td
                  className={`p-2 text-[#333] min-w-[120px] border-b border-gray-400 text-lg font-bold ${
                    index === 0 && "border-t"
                  }`}
                >
                  {category.label}
                </td>
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
                          rollCount,
                          player
                        )
                      : player[category.name as GameUserCategory] === null
                      ? ""
                      : player[category.name as GameUserCategory];
                  return (
                    <td
                      key={player.id}
                      className={`text-center min-w-[150px] border-b border-gray-400 select-none text-lg ${
                        index === 0 && "border-t"
                      } ${
                        isAlreadySubmitted(
                          category.name as GameUserCategory,
                          player.userId
                        ) && "text-[#555]"
                      } ${
                        isMyTurn &&
                        player.userId === currentTurnId &&
                        !isAlreadySubmitted(
                          category.name as GameUserCategory,
                          player.userId
                        ) &&
                        "transition duration-200 ease-in-out font-semibold text-blue-500 hover:text-blue-600"
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
              <td className='p-2 font-bold'>Total</td>
              {players.map((player) => (
                <td
                  key={player.id}
                  className='p-2 text-center font-semibold text-blue-500'
                >
                  {player.totalScore}
                </td>
              ))}
            </tr>
          </tbody>
        </table>
      </div>
    </motion.div>
  );
}
