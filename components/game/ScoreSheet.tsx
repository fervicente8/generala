"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { GameUser } from "@/types";
import { useAlert } from "../ui/CustomAlert";
import { useAchievement } from "@/contexts/AchievementContext";
import { socket } from "@/lib/socket";
import { useSession } from "next-auth/react";
import Image from "next/image";
import CustomLoadingSpinner from "@/components/ui/CustomLoadingSpinner";
import styles from "./ScoreSheet.module.css";

interface ScoreTableProps {
  players: GameUser[];
  currentTurnId: string;
  isMyTurn: boolean;
  diceValues: number[];
  rollCount: number;
  loadingSubmit: boolean;
  setLoadingSubmit: (loading: boolean) => void;
  onAchievementsShown?: (ids: string[]) => void;
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
  playerScore: GameUser,
): number {
  const counts = dice.reduce(
    (acc, val) => {
      if (acc[val]) {
        acc[val] += 1;
      } else {
        acc[val] = 1;
      }
      return acc;
    },
    {} as Record<number, number>,
  );

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
    case "Generala II":
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
  loadingSubmit,
  setLoadingSubmit,
  onAchievementsShown,
}: ScoreTableProps) {
  const { data: session } = useSession();
  const [loading, setLoading] = useState(false);
  const [submittingCategory, setSubmittingCategory] = useState<string | null>(
    null,
  );
  const { showAlert } = useAlert();
  const [avatarErrors, setAvatarErrors] = useState<{ [key: string]: boolean }>(
    {},
  );

  useEffect(() => {
    const pointer = document.querySelector(`.${styles.pointer}`) as HTMLElement;
    const container = document.querySelector(
      `.${styles.container}`,
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

    // Disable pointer on touch devices
    if (!("ontouchstart" in window)) {
      document.addEventListener("mousemove", trackPointer);
      if (container) {
        container.addEventListener("mouseenter", handleMouseEnter);
        container.addEventListener("mouseleave", handleMouseLeave);
      }
    }

    return () => {
      document.removeEventListener("mousemove", trackPointer);
      if (container) {
        container.removeEventListener("mouseenter", handleMouseEnter);
        container.removeEventListener("mouseleave", handleMouseLeave);
      }
    };
  }, []);

  const { showAchievement } = useAchievement();

  const handleSetScore = async (category: string, score: number) => {
    if (!isMyTurn && rollCount === 0) return;
    setLoading(true);
    setSubmittingCategory(category);
    setLoadingSubmit(true);
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
          message: data.error || "Error al guardar la puntuación",
        });
      } else if (data.newlyUnlocked?.length) {
        showAchievement(data.newlyUnlocked);
        onAchievementsShown?.(
            (data.newlyUnlocked as { id: string }[]).map((a) => a.id),
          );
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
        message: "Error al guardar la puntuación",
      });
    } finally {
      setLoading(false);
      setSubmittingCategory(null);
      setLoadingSubmit(false);
    }
  };

  const isAlreadySubmitted = (category: GameUserCategory, playerId: string) => {
    const player = players.find((p) => p.user.id === playerId);
    if (!player) return false;

    return player[category] !== null && player[category] !== undefined;
  };

  const handleImageError = (playerId: string) => {
    setAvatarErrors((prev) => ({ ...prev, [playerId]: true }));
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4, ease: "easeInOut" }}
      className={`${styles.container} bg-(--color-pearl-white) w-full h-full z-50 py-2 px-2 lg:px-4 overflow-y-auto`}
      style={{
        backgroundImage: "url('/textures/marfil.png')",
        backgroundSize: "cover",
      }}
    >
      <div className={styles.pointer} />
      <div className="overflow-x-auto">
        <h2 className="text-lg hidden lg:block sm:text-xl font-poppins font-semibold mt-2 text-(--color-black-matte)">
          Anotador
        </h2>

        <table className="w-full border-separate border-spacing-y-1">
          <thead>
            <tr>
              <th className="text-left sticky left-0 z-10"></th>
              {players.map((player) => (
                <th key={player.userId} className="px-1 sm:px-2">
                  <Image
                    src={
                      avatarErrors[player.userId] || !player.user.image
                        ? "/default-avatar.png"
                        : player.user.image
                    }
                    alt="Avatar"
                    width={40}
                    height={40}
                    className="hidden lg:block rounded-full m-auto sm:w-12 sm:h-12"
                    unoptimized
                    onError={() => handleImageError(player.userId)}
                  />
                </th>
              ))}
            </tr>
            <tr>
              <th className="text-left sticky left-0 z-10 py-1 sm:py-2"></th>
              {players.map((player) => (
                <th
                  key={player.userId}
                  className={`px-1 sm:px-2 py-1 lg:py-2 text-sm lg:text-md font-quicksand ${
                    session?.user?.id === player.userId
                      ? "text-(--color-sapphire-blue) font-bold"
                      : "text-(--color-black-matte)"
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
                  className={`px-2 lg:px-3 py-1 text-(--color-black-matte) border-b border-(--color-silver-gray)/50 text-sm md:text-md lg:text-lg font-poppins font-bold sticky left-0 z-10 ${
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
                      player.userId,
                    )
                      ? calculateScore(
                          category.label,
                          diceValues,
                          rollCount,
                          player,
                        )
                      : player[category.name as GameUserCategory] === null
                        ? ""
                        : player[category.name as GameUserCategory];
                  const canTap =
                    isMyTurn &&
                    player.userId === currentTurnId &&
                    !isAlreadySubmitted(
                      category.name as GameUserCategory,
                      player.userId,
                    );
                  return (
                    <td
                      key={player.id}
                      className={`text-center px-1 lg:px-2 min-w-[150px] border-b border-(--color-silver-gray)/50 select-none text-sm md:text-md lg:text-lg font-quicksand ${
                        index === 0 && "border-t"
                      } ${
                        isAlreadySubmitted(
                          category.name as GameUserCategory,
                          player.userId,
                        ) && "text-(--color-silver-gray)"
                      } ${
                        canTap
                          ? "transition duration-150 font-semibold text-(--color-sapphire-blue) bg-(--color-sapphire-blue)/8 rounded cursor-pointer hover:bg-(--color-sapphire-blue)/12 active:bg-(--color-sapphire-blue)/15"
                          : ""
                      }`}
                      onClick={() => {
                        if (canTap && !loading && !loadingSubmit) {
                          handleSetScore(category.name, value as number);
                        }
                      }}
                    >
                      {submittingCategory === category.name &&
                      player.userId === currentTurnId &&
                      (loading || loadingSubmit) ? (
                        <div className="flex items-center justify-center">
                          <CustomLoadingSpinner size="sm" showText={false} />
                        </div>
                      ) : (
                        value
                      )}
                    </td>
                  );
                })}
              </tr>
            ))}
            <tr>
              <td className="px-2 lg:px-3 py-1 lg:py-2 font-poppins font-bold text-sm lg:text-lg text-(--color-black-matte) sticky left-0 z-10">
                Total
              </td>
              {players.map((player) => (
                <td
                  key={player.id}
                  className="px-1 sm:px-2 py-1 sm:py-2 text-center font-quicksand font-semibold text-sm md:text-md lg:text-lg text-(--color-sapphire-blue)"
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
