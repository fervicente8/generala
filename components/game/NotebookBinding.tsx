"use client";

const RING_COUNT = 12;

/**
 * Lomo con anillado discreto: puntito negro en el borde del papel y doble curva de alambre.
 */
export function NotebookBinding({ className = "" }: { className?: string }) {
  return (
    <div
      className={`flex min-h-0 w-[12px] shrink-0 flex-col border-r border-stone-500/30 bg-linear-to-b from-stone-200/75 via-stone-300/65 to-stone-400/55 py-2 shadow-[inset_-1px_0_2px_rgba(0,0,0,0.12)] sm:w-[14px] sm:py-2.5 ${className}`}
      aria-hidden
    >
      <div className="flex min-h-0 flex-1 flex-col">
        {Array.from({ length: RING_COUNT }, (_, i) => (
          <div
            key={i}
            className="relative flex min-h-0 flex-1 items-center justify-end px-0.5"
          >
            <svg
              className="pointer-events-none absolute right-0 top-1/2 h-[clamp(10px,2.2dvh,16px)] w-[14px] -translate-y-1/2 overflow-visible sm:w-[16px]"
              viewBox="0 0 16 14"
            >
              <path
                d="M 0.5 7 Q 5 2.5 12.5 6.2"
                fill="none"
                stroke="#94a3b8"
                strokeWidth="0.95"
                strokeLinecap="round"
              />
              <path
                d="M 0.5 7 Q 5 11.5 12.5 7.8"
                fill="none"
                stroke="#94a3b8"
                strokeWidth="0.95"
                strokeLinecap="round"
              />
              <path
                d="M 0.5 7 Q 5.2 3.2 12.2 6.5"
                fill="none"
                stroke="#e2e8f0"
                strokeWidth="0.45"
                strokeLinecap="round"
                opacity={0.95}
              />
              <path
                d="M 0.5 7 Q 5.2 10.8 12.2 7.5"
                fill="none"
                stroke="#e2e8f0"
                strokeWidth="0.45"
                strokeLinecap="round"
                opacity={0.95}
              />
            </svg>
            <div className="relative h-[3px] w-[3px] shrink-0 rounded-full bg-neutral-900 shadow-[0_0_0_0.5px_rgba(255,255,255,0.35)] sm:h-[3.5px] sm:w-[3.5px]" />
          </div>
        ))}
      </div>
    </div>
  );
}
