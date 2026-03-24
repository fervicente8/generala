"use client";

const RING_COUNT = 14;

/**
 * Lomo decorativo con anillas (sin acción: abrir/cerrar va en el mini header).
 */
export function NotebookBinding({ className = "" }: { className?: string }) {
  return (
    <div
      className={`flex min-h-0 w-[14px] shrink-0 flex-col items-center border-r-2 border-stone-900/45 bg-linear-to-b from-stone-500 via-stone-600 to-stone-800 py-3 shadow-[inset_-2px_0_4px_rgba(0,0,0,0.25)] sm:w-[18px] sm:py-4 ${className}`}
      aria-hidden
    >
      <div className="flex flex-1 flex-col items-center justify-around gap-0.5">
        {Array.from({ length: RING_COUNT }, (_, i) => (
          <span
            key={i}
            className="block h-[6px] w-[10px] shrink-0 rounded-full border border-stone-800/70 bg-linear-to-b from-stone-200 via-stone-400 to-stone-600 shadow-[inset_0_1px_1px_rgba(255,255,255,0.45),0_1px_2px_rgba(0,0,0,0.35)] sm:h-[7px] sm:w-[11px]"
          />
        ))}
      </div>
    </div>
  );
}
