"use client";

import { motion, AnimatePresence } from "framer-motion";

const REACTION_EMOJIS = ["🔥", "👍", "😂", "❤️", "💔", "😡", "👀", "🎺"];
const REACTION_PHRASES = ["¡Buena!", "¿Como?", "Chupame Malena", "Y punto."];

export type ReactionType = "emoji" | "phrase";
export interface ReactionChoice {
  type: ReactionType;
  value: string;
}

interface ReactionPickerProps {
  isOpen: boolean;
  onClose: () => void;
  onPick: (choice: ReactionChoice) => void;
  anchorRef?: React.RefObject<HTMLElement | null>;
}

export function ReactionPicker({
  isOpen,
  onClose,
  onPick,
}: ReactionPickerProps) {
  const handlePick = (type: ReactionType, value: string) => {
    onPick({ type, value });
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40"
            onClick={onClose}
            aria-hidden
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 4 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ type: "spring", stiffness: 400, damping: 28 }}
            className="fixed left-1/2 bottom-20 sm:bottom-24 -translate-x-1/2 z-50 w-[min(92vw, 320px)] rounded-2xl border-2 border-amber-200/80 bg-(--color-pearl-white) shadow-xl p-3 sm:p-4"
          >
            <p className="text-xs sm:text-sm font-poppins font-semibold text-(--color-sapphire-blue) mb-2 sm:mb-3">
              Emojis
            </p>
            <div className="flex flex-wrap gap-1.5 sm:gap-2 mb-3 sm:mb-4">
              {REACTION_EMOJIS.map((emoji) => (
                <motion.button
                  key={emoji}
                  type="button"
                  onClick={() => handlePick("emoji", emoji)}
                  className="text-xl sm:text-2xl w-8 h-8 sm:w-9 sm:h-9 flex items-center justify-center rounded-lg hover:bg-amber-100 active:scale-95 transition"
                  whileHover={{ scale: 1.15 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {emoji}
                </motion.button>
              ))}
            </div>
            <p className="text-xs sm:text-sm font-poppins font-semibold text-(--color-sapphire-blue) mb-2 sm:mb-3">
              Frases
            </p>
            <div className="flex flex-wrap gap-1.5 sm:gap-2">
              {REACTION_PHRASES.map((phrase) => (
                <motion.button
                  key={phrase}
                  type="button"
                  onClick={() => handlePick("phrase", phrase)}
                  className="px-2.5 py-1.5 sm:px-3 sm:py-2 text-xs sm:text-sm font-quicksand rounded-lg bg-amber-50 border border-amber-200/80 hover:bg-amber-100 text-(--color-black-matte) transition"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {phrase}
                </motion.button>
              ))}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
