"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { GameUser } from "@/types";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { Smile } from "lucide-react";

export interface PlayerReaction {
  type: "emoji" | "phrase";
  value: string;
  fromUserName?: string;
  id?: number;
}

interface PlayerSlotProps {
  player: GameUser;
  position: number;
  isCurrentTurn: boolean;
  timePerTurn?: number;
  currentTurnId?: string;
  totalPlayers?: number;
  players: GameUser[];
  rollCount?: number;
  reaction?: PlayerReaction | null;
  onReactionClick?: () => void;
  /** Ref del contenedor del avatar (para animación de reacciones) */
  avatarRef?: (el: HTMLDivElement | null) => void;
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
  reaction = null,
  onReactionClick,
  avatarRef,
}: PlayerSlotProps) {
  const { data: session } = useSession();
  const [timeLeft, setTimeLeft] = useState(timePerTurn);
  const [avatarErrors, setAvatarErrors] = useState<{ [key: string]: boolean }>(
    {},
  );

  const getPlayerPosition = (index: number, totalPlayers: number) => {
    const positions = [
      "top-2 sm:top-4 left-2 sm:left-4",
      "top-2 sm:top-4 right-2 sm:right-4",
      "bottom-2 sm:bottom-4 left-2 sm:left-4",
      "bottom-2 sm:bottom-4 right-2 sm:right-4",
      "bottom-2 sm:bottom-4 left-1/2 -translate-x-1/2",
    ];
    return positions[index % positions.length];
  };
  //   if (isCurrentTurn && timePerTurn > 0) {
  //     setTimeLeft(timePerTurn);
  //     const interval = setInterval(() => {
  //       setTimeLeft((prev) => {
  //         if (prev <= 1) {
  //           handleSetScore(getCategoryToStrike() || "double", 0);
  //           clearInterval(interval);
  //           return 0;
  //         }
  //         return prev - 1;
  //       });
  //     }, 1000);

  //     return () => clearInterval(interval);
  //   }
  // }, [isCurrentTurn, timePerTurn, player.user.id]);

  useEffect(() => {
    setTimeLeft(timePerTurn);
  }, [rollCount, timePerTurn]);
  //   try {
  //     const res = await fetch(`/api/game/submit-score`, {
  //       method: "POST",
  //       body: JSON.stringify({
  //         gameUserId: currentTurnId,
  //         gameId: players[0].gameId,
  //         category,
  //         score,
  //       }),
  //     });

  //     const data = await res.json();

  //     if (!res.ok) {
  //       showAlert({
  //         type: "error",
  //         message: data.error || "Error al guardar la puntuación",
  //       });
  //     }

  //     socket.emit("submitScore", {
  //       players: players.map((player) => player.user),
  //       currentTurnId: data.currentTurnId,
  //       updatedGameUserId: currentTurnId,
  //       updatedValues: data.updatedValues,
  //     });
  //   } catch (error) {
  //     showAlert({
  //       type: "error",
  //       message: "Error al guardar la puntuación",
  //     });
  //   }
  // };

  const handleImageError = (playerId: string) => {
    setAvatarErrors((prev) => ({ ...prev, [playerId]: true }));
  };

  return (
    <motion.div
      className={`absolute flex flex-col items-center bg-(--color-pearl-white)/20 backdrop-blur-md px-2 sm:px-4 py-2 sm:py-4 rounded-xl shadow-lg transition-all ${getPlayerPosition(
        position,
        totalPlayers,
      )} ${
        isCurrentTurn
          ? "ring-2 ring-(--color-sapphire-blue) scale-105 bg-(--color-pearl-white)/30"
          : ""
      } ${onReactionClick ? "min-w-30 sm:min-w-34 w-auto max-w-xs" : "w-24 sm:w-32 max-w-xs"}`}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
    >
      <span className="text-(--color-pearl-white) font-poppins font-semibold text-xs sm:text-sm mb-1 sm:mb-2 max-w-full truncate">
        {player.user.name} {player.userId === session?.user?.id && "(Yo)"}
      </span>
      <div className="relative inline-flex items-center gap-1.5 sm:gap-2">
        <div className="relative" ref={avatarRef}>
          <AnimatePresence>
            {reaction && (
              <motion.div
                key={reaction.id ?? reaction.value}
                initial={{ opacity: 0, scale: 0.5, y: 4 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ type: "spring", stiffness: 400, damping: 20 }}
                className="absolute left-1/2 -translate-x-1/2 -top-2 sm:-top-3 z-10 pointer-events-none flex flex-col items-center"
              >
                <span
                  className={`${
                    reaction.type === "emoji"
                      ? "text-2xl sm:text-3xl leading-none"
                      : "text-[10px] sm:text-xs font-quicksand font-semibold text-center px-2 py-1 rounded-lg bg-(--color-pearl-white)/95 text-(--color-black-matte) shadow-md max-w-[130px] truncate"
                  }`}
                >
                  {reaction.value}
                </span>
              </motion.div>
            )}
          </AnimatePresence>
          <Image
            src={
              avatarErrors[player.userId] || !player.user.image
                ? "/default-avatar.png"
                : player.user.image
            }
            alt="Foto de perfil"
            width={40}
            height={40}
            className="rounded-full object-cover sm:w-12 sm:h-12"
            unoptimized
            onError={() => handleImageError(player.userId)}
          />
        </div>
        {onReactionClick && (
          <button
            type="button"
            onClick={onReactionClick}
            className="absolute bottom-[-8px] right-[-8px] flex items-center justify-center w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-amber-500/90 hover:bg-amber-500 text-white border-2 border-amber-200/80 shadow focus:outline-none focus:ring-2 focus:ring-amber-400 shrink-0"
            aria-label="Enviar reacción"
          >
            <Smile className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>
        )}
      </div>
      {isCurrentTurn && timePerTurn > 0 && (
        <span className="text-(--color-sapphire-blue) text-xs absolute bottom-1 sm:bottom-2 right-1 sm:right-2 font-quicksand">
          {timeLeft}s
        </span>
      )}
      {isCurrentTurn && (
        <div className="flex gap-1 sm:gap-2 mt-2 sm:mt-3">
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full border-2 ${
                i < (rollCount ?? 0)
                  ? "border-(--color-sapphire-blue) bg-(--color-sapphire-blue)"
                  : "border-(--color-pearl-white) bg-transparent"
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
