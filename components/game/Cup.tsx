"use client";

import { GameUser } from "@/types";
import { motion, useAnimation } from "framer-motion";
import { socket } from "@/lib/socket";
import { useAlert } from "../ui/CustomAlert";
import { useState, useEffect, useRef } from "react";

export default function Cup({
  gamePlayers,
  isMyTurn,
  rollCount,
  gameId,
  rollingLoading,
  dicesToReroll,
  setDicesToReroll,
}: {
  gamePlayers: GameUser[];
  isMyTurn: boolean;
  rollCount: number;
  gameId: string;
  rollingLoading: boolean;
  dicesToReroll: number[];
  setDicesToReroll: (dices: number[]) => void;
}) {
  const [sendingRoll, setSendingRoll] = useState(false);
  const controls = useAnimation();
  const prevIsRolling = useRef(false);
  const { showAlert } = useAlert();

  const isRolling = sendingRoll || rollingLoading;

  useEffect(() => {
    if (prevIsRolling.current && !isRolling) {
      controls.start({
        rotate: 0,
        transition: { duration: 0.25, ease: "easeOut" },
      });
    }
    prevIsRolling.current = isRolling;
  }, [isRolling, controls]);

  const handleRoll = async () => {
    if (!isMyTurn || rollCount >= 3 || isRolling) return;

    setSendingRoll(true);

    await controls.start({
      rotate: 180,
      transition: { duration: 0.25, ease: "easeInOut" },
    });

    try {
      const dicesToSend =
        rollCount > 0 && dicesToReroll.length === 0
          ? [0, 1, 2, 3, 4]
          : dicesToReroll;

      const res = await fetch(`/api/game/roll`, {
        method: "POST",
        body: JSON.stringify({ gameId, dicesToReroll: dicesToSend }),
      });

      const data = await res.json();
      if (!res.ok) {
        showAlert({
          type: "error",
          message: data.error || "Error al tirar los dados",
        });
        return;
      }

      // Emite el evento con los dados a animar
      socket.emit("rollDice", {
        players: gamePlayers.map((gameUser) => gameUser.user),
        diceValues: data.diceValues,
        rollCount: data.rollCount,
        dicesToReroll: dicesToSend,
      });
    } catch (error) {
      showAlert({
        type: "error",
        message: "Error al tirar los dados",
      });
    } finally {
      setSendingRoll(false);
    }
  };

  return (
    <motion.div
      onClick={() => {
        if (!isRolling) handleRoll();
      }}
      className={`${
        (!isMyTurn || rollCount >= 3) && "opacity-50"
      } absolute top-[25%] sm:top-1/4 lg:top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 p-2 sm:p-4 transition select-none ${
        isMyTurn && rollCount < 3 && !isRolling && "cursor-pointer"
      } ${(!isMyTurn || rollCount >= 3 || isRolling) && "pointer-events-none"}`}
      whileHover={
        isMyTurn && rollCount < 3 && !isRolling ? { scale: 1.05 } : undefined
      }
      whileTap={isRolling ? undefined : { scale: 0.92 }}
      animate={controls}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
    >
      <motion.img
        src="/cup.png"
        alt="Cubilete"
        className="w-22 h-24 sm:w-26 sm:h-28 lg:w-30 lg:h-33"
      />
    </motion.div>
  );
}
