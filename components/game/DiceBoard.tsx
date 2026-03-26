"use client";

import { GameUser } from "@/types";
import Dice from "./Dice";
import type { PossibleMarkHint } from "@/lib/gameScoring";
import CustomLoadingSpinner from "@/components/ui/CustomLoadingSpinner";

interface GameTableProps {
  id: string;
  players: GameUser[];
  status: "waiting" | "in progress" | "finished";
  turnTimeout: number | null;
  currentTurnId: string;
  diceValues: number[];
  rollCount: number;
}

interface DiceBoardProps {
  game: GameTableProps;
  rollingLoading: boolean;
  dicesToReroll: number[];
  setDicesToReroll: (dices: number[]) => void;
  rollCount: number;
  isMyTurn: boolean;
  /** Categorías libres con puntos > 0 (orden menor → mayor). */
  markHints?: PossibleMarkHint[];
  /** Tocar chip = anotar (misma API que el anotador). */
  onQuickSubmit?: (category: string, score: number) => void;
  /** Mientras se guarda una anotación (desde chip o anotador). */
  loadingSubmit?: boolean;
  /** Si el envío viene de una chip, spinner en esa categoría; si es del anotador, null. */
  submittingQuickCategory?: string | null;
  /** Tirada en curso o dados asentando (misma regla que celdas del anotador). */
  scoreHintsLocked?: boolean;
}

export default function DiceBoard({
  game,
  rollingLoading,
  dicesToReroll,
  setDicesToReroll,
  rollCount,
  isMyTurn,
  markHints = [],
  onQuickSubmit,
  loadingSubmit = false,
  submittingQuickCategory = null,
  scoreHintsLocked = false,
}: DiceBoardProps) {
  const canTapHints =
    Boolean(onQuickSubmit) && !scoreHintsLocked && !loadingSubmit;

  return (
    <div className="absolute top-[50%] sm:top-[55%] left-1/2 -translate-x-1/2 -translate-y-1/2 select-none">
      <div className="relative inline-flex flex-col items-center">
        <div className="flex gap-4">
          {isMyTurn &&
            game.diceValues.length === 0 &&
            Array(5)
              .fill(0)
              .map((value, index) => (
                <Dice
                  key={index}
                  value={value}
                  rolling={
                    rollingLoading &&
                    (rollCount === 1 || dicesToReroll.includes(index))
                  }
                  rollCount={rollCount}
                  isMyTurn={isMyTurn}
                />
              ))}
          {game.diceValues.map((value, index) => {
            return (
              <Dice
                key={index}
                value={value as 0 | 1 | 2 | 3 | 4 | 5 | 6}
                rolling={
                  rollingLoading &&
                  (rollCount === 1 || dicesToReroll.includes(index))
                }
                selectedForReroll={dicesToReroll.includes(index)}
                rollCount={rollCount}
                onClick={() => {
                  if (rollCount < 3 && isMyTurn) {
                    if (dicesToReroll.includes(index)) {
                      setDicesToReroll(
                        dicesToReroll.filter((d) => d !== index),
                      );
                    } else {
                      setDicesToReroll([...dicesToReroll, index]);
                    }
                  }
                }}
                isMyTurn={isMyTurn}
              />
            );
          })}
        </div>
        {isMyTurn && markHints.length > 0 && (
          <div
            className="absolute left-1/2 top-[140%] z-10 mt-2 flex w-max max-w-[min(94vw,22rem)] -translate-x-1/2 flex-col items-center gap-1.5 px-1 sm:mt-3"
            role="group"
            aria-label="Anotaciones posibles: tocá para anotar sin abrir el anotador"
          >
            <p className="pointer-events-none text-center text-[10px] font-quicksand font-medium uppercase tracking-wide text-(--color-pearl-white)/75 sm:text-xs">
              {onQuickSubmit && !scoreHintsLocked
                ? "Tocá para anotar"
                : "Posibles anotaciones"}
            </p>
            <div className="flex flex-wrap justify-center gap-1.5 sm:gap-2">
              {markHints.map((h) => {
                const isSubmittingThis =
                  loadingSubmit && submittingQuickCategory === h.category;
                const dimPeer =
                  loadingSubmit &&
                  (submittingQuickCategory === null ||
                    submittingQuickCategory !== h.category);
                const disabled =
                  !onQuickSubmit || scoreHintsLocked || loadingSubmit;
                return (
                  <button
                    key={h.category}
                    type="button"
                    disabled={disabled}
                    onClick={() => onQuickSubmit?.(h.category, h.score)}
                    className={`inline-flex min-h-[36px] min-w-11 items-center justify-center gap-1.5 rounded-lg border px-2 py-1 text-center text-[11px] font-semibold leading-tight shadow-md ring-1 transition sm:min-h-[40px] sm:px-2.5 sm:py-1.5 sm:text-sm ${
                      canTapHints
                        ? "cursor-pointer border-emerald-400/55 bg-emerald-950/90 text-emerald-100 ring-emerald-500/25 hover:bg-emerald-900/95 hover:ring-emerald-400/40 active:scale-[0.98]"
                        : "border-emerald-400/40 bg-emerald-950/75 text-emerald-100/80 ring-emerald-500/15"
                    } ${dimPeer ? "opacity-55" : ""}`}
                  >
                    {isSubmittingThis ? (
                      <CustomLoadingSpinner
                        size="sm"
                        showText={false}
                        color="#d1fae5"
                      />
                    ) : null}
                    <span className={isSubmittingThis ? "sr-only" : ""}>
                      {h.line}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
