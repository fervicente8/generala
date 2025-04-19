"use client";

import { GameUser } from "@/types";
import { motion, useAnimation } from "framer-motion";
import { socket } from "@/lib/socket";
import { useAlert } from "../ui/CustomAlert";
import { useState } from "react";

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
  const { showAlert } = useAlert();

  const handleRoll = async () => {
    if (!isMyTurn || rollCount >= 3) return;

    setSendingRoll(true);

    await controls.start({
      rotate: [0, 180, 0],
      transition: {
        duration: 0.6,
        times: [0, 0.5, 1],
        ease: "easeInOut",
      },
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
        if (!sendingRoll) handleRoll();
      }}
      className={`${
        (!isMyTurn || rollCount >= 3) && "opacity-50"
      } absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 p-4 transition select-none ${
        isMyTurn && rollCount < 3 && "cursor-pointer"
      } ${
        (!isMyTurn || rollCount >= 3 || rollingLoading) && "pointer-events-none"
      }`}
      whileTap={{ scale: 0.9 }}
      animate={controls}
    >
      <motion.img src='/cup.png' alt='Cubilete' className='w-30 h-33' />
    </motion.div>
  );
}
