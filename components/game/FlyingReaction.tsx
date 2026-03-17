"use client";

import { useState, useMemo, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export interface FlyingReactionData {
  type: "emoji" | "phrase";
  value: string;
  fromUserName?: string;
}

interface FlyingReactionProps {
  startRect: DOMRect;
  endRect: DOMRect;
  reaction: FlyingReactionData;
  onComplete: () => void;
}

const FLIGHT_DURATION = 0.65;
const ARC_PEAK = 90;
const BURST_COUNT = 18;
const BURST_DURATION = 0.55;
const BURST_RADIUS = 70;

export function FlyingReaction({
  startRect,
  endRect,
  reaction,
  onComplete,
}: FlyingReactionProps) {
  const [phase, setPhase] = useState<"flying" | "burst">("flying");

  const startX = startRect.left + startRect.width / 2;
  const startY = startRect.top + startRect.height / 2;
  const endX = endRect.left + endRect.width / 2;
  const endY = endRect.top + endRect.height / 2;

  const size = reaction.type === "emoji" ? 36 : 90;
  const centerOffset = size / 2;

  const burstParticles = useMemo(
    () =>
      Array.from({ length: BURST_COUNT }, (_, i) => {
        const angle = (i / BURST_COUNT) * 2 * Math.PI + Math.random() * 0.3;
        return {
          x: Math.cos(angle) * BURST_RADIUS,
          y: Math.sin(angle) * BURST_RADIUS,
          delay: Math.random() * 0.08,
          scale: 0.7 + Math.random() * 0.6,
        };
      }),
    [],
  );

  const handleFlightComplete = () => {
    setPhase("burst");
  };

  useEffect(() => {
    if (phase !== "burst") return;
    const t = setTimeout(() => {
      onComplete();
    }, (BURST_DURATION + 0.12) * 1000);
    return () => clearTimeout(t);
  }, [phase, onComplete]);

  return (
    <div className="fixed inset-0 pointer-events-none z-10000" aria-hidden>
      <AnimatePresence>
        {phase === "flying" && (
          <motion.div
            key="flying"
            className="absolute flex items-center justify-center"
            style={{
              left: startX - centerOffset,
              top: startY - centerOffset,
              width: size,
              height: size,
            }}
            initial={{ x: 0, y: 0 }}
            animate={{
              x: [0, (endX - startX) * 0.5, endX - startX],
              y: [0, (endY - startY) * 0.5 - ARC_PEAK, endY - startY],
            }}
            transition={{
              duration: FLIGHT_DURATION,
              times: [0, 0.5, 1],
              ease: "easeInOut",
            }}
            onAnimationComplete={handleFlightComplete}
          >
            {reaction.type === "emoji" ? (
              <span className="text-2xl sm:text-3xl drop-shadow-lg select-none">
                {reaction.value}
              </span>
            ) : (
              <span className="text-[10px] sm:text-xs font-quicksand font-semibold px-2 py-1 rounded-lg bg-white/95 text-black shadow-lg max-w-[100px] truncate">
                {reaction.value}
              </span>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {phase === "burst" && (
          <motion.div
            key="burst"
            className="absolute"
            style={{
              left: endX,
              top: endY,
              width: 1,
              height: 1,
            }}
          >
            {burstParticles.map((p, i) => (
              <motion.div
                key={i}
                className="absolute flex items-center justify-center pointer-events-none"
                style={{
                  left: 0,
                  top: 0,
                  width: 28,
                  height: 28,
                  x: "-50%",
                  y: "-50%",
                }}
                initial={{ x: 0, y: 0, scale: 0.3, opacity: 1 }}
                animate={{
                  x: p.x,
                  y: p.y,
                  scale: p.scale,
                  opacity: 0,
                }}
                transition={{
                  duration: BURST_DURATION,
                  delay: p.delay,
                  ease: "easeOut",
                }}
              >
                {reaction.type === "emoji" ? (
                  <span className="text-xl sm:text-2xl drop-shadow-md select-none">
                    {reaction.value}
                  </span>
                ) : (
                  <span className="text-[9px] font-quicksand font-semibold px-1.5 py-0.5 rounded bg-white/90 text-black shadow max-w-[60px] truncate">
                    {reaction.value}
                  </span>
                )}
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

