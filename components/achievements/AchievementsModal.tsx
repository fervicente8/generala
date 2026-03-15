"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Lock, Trophy, X } from "lucide-react";
import CustomLoadingSpinner from "../ui/CustomLoadingSpinner";

export interface AchievementItem {
  id: string;
  name: string;
  description: string;
  unlockedAt: string | null;
  progress: { current: number; target: number } | null;
}

interface AchievementsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function AchievementsModal({ isOpen, onClose }: AchievementsModalProps) {
  const [list, setList] = useState<AchievementItem[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!isOpen) return;
    setLoading(true);
    fetch("/api/users/achievements")
      .then((res) => res.json())
      .then((data) => setList(Array.isArray(data) ? data : []))
      .catch(() => setList([]))
      .finally(() => setLoading(false));
  }, [isOpen]);

  if (!isOpen) return null;

  const unlockedCount = list.filter((a) => a.unlockedAt).length;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4 backdrop-blur-sm">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="relative max-h-[85vh] w-full max-w-lg overflow-hidden rounded-2xl border-2 border-amber-200/60 bg-[#F5F5F5] shadow-xl"
      >
        <div className="border-b border-amber-200/50 bg-gradient-to-r from-amber-50 to-amber-100/80 px-4 py-3">
          <div className="flex items-center justify-between">
            <h2 className="flex items-center gap-2 font-poppins text-lg font-bold text-[#1A1A1A]">
              <Trophy className="h-5 w-5 text-amber-600" />
              Logros
            </h2>
            <button
              onClick={onClose}
              className="rounded-lg p-1 text-[#666] transition hover:bg-amber-200/50 hover:text-[#1A1A1A]"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
          <p className="mt-1 text-sm text-[#555]">
            {unlockedCount} de {list.length} desbloqueados
          </p>
        </div>

        <div className="overflow-y-auto p-4 max-h-[calc(85vh-100px)]">
          {loading ? (
            <div className="flex justify-center py-12">
              <CustomLoadingSpinner size="sm" showText={false} color="#D4A017" />
            </div>
          ) : (
            <ul className="space-y-3">
              <AnimatePresence>
                {list.map((item, i) => {
                  const unlocked = !!item.unlockedAt;
                  return (
                    <motion.li
                      key={item.id}
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.02 }}
                      className={`flex gap-3 rounded-xl border-2 p-3 ${
                        unlocked
                          ? "border-amber-300/60 bg-amber-50/50"
                          : "border-gray-200 bg-white/80"
                      }`}
                    >
                      <div
                        className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full ${
                          unlocked
                            ? "bg-amber-400 text-white"
                            : "bg-gray-300 text-gray-500"
                        }`}
                      >
                        {unlocked ? (
                          <Trophy className="h-5 w-5" />
                        ) : (
                          <Lock className="h-5 w-5" />
                        )}
                      </div>
                      <div className="min-w-0 flex-1">
                        <p
                          className={`font-poppins font-semibold ${
                            unlocked ? "text-[#1A1A1A]" : "text-[#888]"
                          }`}
                        >
                          {item.name}
                        </p>
                        <p className="text-sm text-[#555]">{item.description}</p>
                        {item.progress && item.progress.target > 1 && (
                          <div className="mt-1.5">
                            <div className="h-1.5 w-full overflow-hidden rounded-full bg-gray-200">
                              <div
                                className="h-full rounded-full bg-amber-500 transition-all"
                                style={{
                                  width: `${Math.min(
                                    100,
                                    (item.progress.current / item.progress.target) * 100
                                  )}%`,
                                }}
                              />
                            </div>
                            <p className="mt-0.5 text-xs text-[#666]">
                              {item.progress.current} / {item.progress.target}
                            </p>
                          </div>
                        )}
                        {unlocked && item.unlockedAt && (
                          <p className="mt-0.5 text-xs text-amber-600">
                            Desbloqueado{" "}
                            {new Date(item.unlockedAt).toLocaleDateString("es-AR", {
                              day: "numeric",
                              month: "short",
                              year: "numeric",
                            })}
                          </p>
                        )}
                      </div>
                    </motion.li>
                  );
                })}
              </AnimatePresence>
            </ul>
          )}
        </div>
      </motion.div>
    </div>
  );
}
