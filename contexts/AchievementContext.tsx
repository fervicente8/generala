"use client";

import {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
} from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Trophy } from "lucide-react";

export interface AchievementUnlocked {
  id: string;
  name: string;
  description: string;
}

interface AchievementContextType {
  showAchievement: (achievements: AchievementUnlocked[]) => void;
}

const AchievementContext = createContext<AchievementContextType | undefined>(
  undefined,
);

const TOAST_DURATION_MS = 4500;

export function AchievementProvider({ children }: { children: React.ReactNode }) {
  const [queue, setQueue] = useState<AchievementUnlocked[]>([]);
  const [current, setCurrent] = useState<AchievementUnlocked | null>(null);

  const showAchievement = useCallback((achievements: AchievementUnlocked[]) => {
    if (!achievements?.length) return;
    setQueue((prev) => [...prev, ...achievements]);
  }, []);

  useEffect(() => {
    if (current !== null || queue.length === 0) return;
    setCurrent(queue[0]);
    setQueue((prev) => prev.slice(1));
  }, [current, queue]);

  useEffect(() => {
    if (current === null) return;
    const t = setTimeout(() => {
      setCurrent(null);
    }, TOAST_DURATION_MS);
    return () => clearTimeout(t);
  }, [current]);

  return (
    <AchievementContext.Provider value={{ showAchievement }}>
      {children}
      <AnimatePresence>
        {current && (
          <motion.div
            key={current.id}
            initial={{ y: -120, opacity: 0, scale: 0.7 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: -80, opacity: 0, scale: 0.9 }}
            transition={{
              type: "spring",
              stiffness: 300,
              damping: 24,
              mass: 0.8,
            }}
            className="fixed left-1/2 top-6 z-[100] flex -translate-x-1/2 flex-col items-center"
          >
            <motion.div
              initial={{ rotate: -20, scale: 0.5 }}
              animate={{ rotate: 0, scale: 1 }}
              transition={{
                type: "spring",
                stiffness: 400,
                damping: 12,
                delay: 0.05,
              }}
              className="mb-2 flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-amber-400 to-amber-600 text-white shadow-lg shadow-amber-500/40 ring-4 ring-amber-200/60"
            >
              <Trophy className="h-8 w-8" strokeWidth={2.5} />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.2 }}
              className="rounded-2xl border-2 border-amber-200/80 bg-[#F5F5F5]/98 px-6 py-4 shadow-xl backdrop-blur-sm max-w-[min(90vw, 320px)]"
            >
              <p className="text-center text-xs font-semibold uppercase tracking-wider text-amber-600">
                Logro desbloqueado
              </p>
              <p className="mt-1 text-center font-poppins text-lg font-bold text-[#1A1A1A]">
                {current.name}
              </p>
              <p className="mt-0.5 text-center text-sm text-[#555]">
                {current.description}
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </AchievementContext.Provider>
  );
}

export function useAchievement() {
  const context = useContext(AchievementContext);
  if (!context) {
    throw new Error("useAchievement must be used within AchievementProvider");
  }
  return context;
}
