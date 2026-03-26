"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { GameUser } from "@/types";
import { useAlert } from "../ui/CustomAlert";
import { useAchievement } from "@/contexts/AchievementContext";
import { socket } from "@/lib/socket";
import { useSession } from "next-auth/react";
import Image from "next/image";
import CustomLoadingSpinner from "@/components/ui/CustomLoadingSpinner";
import styles from "./ScoreSheet.module.css";
import { mountBodyPencilCursor } from "./pencilCursor";
import { calculateCategoryScore } from "@/lib/gameScoring";

interface ScoreTableProps {
  players: GameUser[];
  currentTurnId: string;
  isMyTurn: boolean;
  diceValues: number[];
  rollCount: number;
  loadingSubmit: boolean;
  setLoadingSubmit: (loading: boolean) => void;
  onAchievementsShown?: (ids: string[]) => void;
  /** En desktop: ocupa 100% del alto sin scroll, tablero compacto */
  fitViewport?: boolean;
  /** Dentro de ScoreSheetPanel: sin fondo duplicado ni animación de entrada */
  embeddedInPanel?: boolean;
  /** Panel lateral ancho: más espacio para etiquetas y tipografía legible en escritorio */
  sidePanel?: boolean;
  /** Mientras tira / margen post-tirada: no permitir tocar (los dados mostrados vienen del padre: snapshot o actuales) */
  diceSettling?: boolean;
  /**
   * false = cursor normal (flecha/mano en celdas); sin lápiz flotante.
   * true (defecto) = lápiz custom en escritorio.
   */
  useBodyPencilCursor?: boolean;
  /** Columnas de jugadores al ancho del contenido (panel libreta) */
  autoTableWidth?: boolean;
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

export default function ScoreTable({
  players,
  currentTurnId,
  isMyTurn,
  diceValues,
  rollCount,
  loadingSubmit,
  setLoadingSubmit,
  onAchievementsShown,
  fitViewport = false,
  embeddedInPanel = false,
  sidePanel = false,
  diceSettling = false,
  useBodyPencilCursor = true,
  autoTableWidth = false,
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
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!useBodyPencilCursor) return;
    if (typeof window === "undefined" || "ontouchstart" in window) return;
    const container = containerRef.current;
    if (!container) return;
    return mountBodyPencilCursor(container);
  }, [useBodyPencilCursor]);

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

      if (res.status === 408) {
        showAlert({
          type: "warning",
          message: data.error || "Se acabó el tiempo de esta tirada",
        });
      } else if (!res.ok) {
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
        turnStartedAt: data.turnStartedAt ?? null,
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

  const compact = fitViewport;
  const labelColW = compact && sidePanel ? "6.75rem" : "5rem";
  const sideCompactText = sidePanel ? "text-xs sm:text-sm" : "text-sm";
  const playerCols =
    compact && autoTableWidth && sidePanel
      ? `repeat(${players.length}, minmax(2.65rem, max-content))`
      : `repeat(${players.length}, minmax(0, 1fr))`;
  const gridCols = compact
    ? {
        gridTemplateColumns: `${labelColW} ${playerCols}`,
      }
    : undefined;

  const paperBg = embeddedInPanel
    ? {}
    : {
        backgroundImage: "url('/textures/marfil.png')",
        backgroundSize: "cover" as const,
      };

  const tapCellCursor =
    useBodyPencilCursor === false ? "cursor-pointer" : "cursor-none";

  return (
    <motion.div
      ref={containerRef}
      data-system-cursor={useBodyPencilCursor ? undefined : "true"}
      initial={embeddedInPanel ? false : { opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={
        embeddedInPanel ? { duration: 0 } : { duration: 0.4, ease: "easeInOut" }
      }
      className={`${styles.container} z-50 ${
        compact && autoTableWidth && sidePanel
          ? "w-max min-w-[288px] max-w-[min(96vw,56rem)] sm:min-w-[300px]"
          : "w-full"
      } ${embeddedInPanel ? "bg-transparent" : "bg-(--color-pearl-white)"} ${
        compact
          ? `h-full min-h-0 flex flex-col overflow-hidden py-2 px-2 sm:px-2.5 ${
              sidePanel ? "sm:py-3 sm:px-3" : ""
            }`
          : "h-full py-2 px-2 lg:px-4 overflow-y-auto"
      }`}
      style={paperBg}
    >
      {compact ? (
        <>
          {/* Cabecera: avatares + nombres */}
          <div
            className="grid gap-x-1 shrink-0 pb-1 border-b border-(--color-silver-gray)/50"
            style={gridCols}
          >
            <div />
            {players.map((player) => (
              <div key={player.userId} className="flex justify-center">
                <Image
                  src={
                    avatarErrors[player.userId] || !player.user.image
                      ? "/default-avatar.png"
                      : player.user.image
                  }
                  alt="Avatar"
                  width={36}
                  height={36}
                  className={`rounded-full object-cover ${
                    sidePanel ? "w-8 h-8 sm:w-9 sm:h-9" : "w-9 h-9"
                  }`}
                  unoptimized
                  onError={() => handleImageError(player.userId)}
                />
              </div>
            ))}
          </div>
          {/* Filas de categorías: una línea inferior por fila a todo el ancho (libreta) */}
          <div className="flex min-h-0 flex-1 flex-col overflow-hidden">
            {CATEGORIES.map((category) => (
              <div
                key={category.name}
                className="grid min-h-0 flex-1 gap-x-1 border-b border-(--color-silver-gray)/45"
                style={gridCols}
              >
                <div
                  className={`flex min-h-0 items-center px-1 text-(--color-black-matte) font-poppins font-bold ${sideCompactText}`}
                >
                  {category.label}
                </div>
                {players.map((player) => {
                  const provisional =
                    player.userId === currentTurnId &&
                    isMyTurn &&
                    !isAlreadySubmitted(
                      category.name as GameUserCategory,
                      player.userId,
                    );
                  const value = provisional
                    ? calculateCategoryScore(
                        category.label,
                        diceValues,
                        rollCount,
                        player,
                      )
                    : player[category.name as GameUserCategory] === null
                      ? ""
                      : player[category.name as GameUserCategory];
                  const canTap = provisional && !diceSettling;
                  return (
                    <div
                      key={`${category.name}-${player.id}`}
                      className={`flex min-h-0 items-center justify-center select-none font-quicksand ${sideCompactText} ${
                        isAlreadySubmitted(
                          category.name as GameUserCategory,
                          player.userId,
                        ) && "text-(--color-silver-gray)"
                      } ${
                        canTap
                          ? `bg-(--color-sapphire-blue)/10 text-(--color-sapphire-blue) font-semibold ${tapCellCursor} hover:bg-(--color-sapphire-blue)/15 rounded-sm`
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
                        <CustomLoadingSpinner size="sm" showText={false} />
                      ) : (
                        value
                      )}
                    </div>
                  );
                })}
              </div>
            ))}
          </div>
          {/* Fila total */}
          <div
            className={`grid gap-x-1 shrink-0 py-2 border-t border-(--color-silver-gray)/50 font-semibold ${sideCompactText}`}
            style={gridCols}
          >
            <div className="font-poppins text-(--color-black-matte) flex items-center">
              Total
            </div>
            {players.map((player) => (
              <div
                key={player.id}
                className="text-center font-quicksand text-(--color-sapphire-blue) flex items-center justify-center"
              >
                {player.totalScore}
              </div>
            ))}
          </div>
        </>
      ) : (
        <div className="overflow-x-auto">
          <h2 className="text-lg hidden lg:block sm:text-xl font-poppins font-semibold mt-2 text-(--color-black-matte)">
            Anotador
          </h2>
          <table className="w-full border-collapse">
            <thead>
              <tr className="border-b border-(--color-silver-gray)/50">
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
              <tr className="border-b border-(--color-silver-gray)/50">
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
              {CATEGORIES.map((category) => (
                <tr
                  key={category.name}
                  className="border-b border-(--color-silver-gray)/50"
                >
                  <td
                    className={`px-1 lg:px-2 py-1 text-(--color-black-matte) text-sm md:text-md lg:text-lg font-poppins font-bold sticky left-0 z-10`}
                  >
                    {category.label}
                  </td>
                  {players.map((player) => {
                    const provisional =
                      player.userId === currentTurnId &&
                      isMyTurn &&
                      !isAlreadySubmitted(
                        category.name as GameUserCategory,
                        player.userId,
                      );
                    const value = provisional
                      ? calculateCategoryScore(
                          category.label,
                          diceValues,
                          rollCount,
                          player,
                        )
                      : player[category.name as GameUserCategory] === null
                        ? ""
                        : player[category.name as GameUserCategory];
                    const canTap = provisional && !diceSettling;
                    return (
                      <td
                        key={player.id}
                        className={`text-center px-1 lg:px-2 min-w-[150px] select-none text-sm md:text-md lg:text-lg font-quicksand py-1 ${
                          isAlreadySubmitted(
                            category.name as GameUserCategory,
                            player.userId,
                          ) && "text-(--color-silver-gray)"
                        } ${
                          canTap
                            ? `transition duration-150 font-semibold text-(--color-sapphire-blue) bg-(--color-sapphire-blue)/8 rounded ${tapCellCursor} hover:bg-(--color-sapphire-blue)/12`
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
              <tr className="border-t border-(--color-silver-gray)/55">
                <td className="px-1 lg:px-2 py-1 lg:py-2 font-poppins font-bold text-sm lg:text-lg text-(--color-black-matte) sticky left-0 z-10">
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
      )}
    </motion.div>
  );
}
