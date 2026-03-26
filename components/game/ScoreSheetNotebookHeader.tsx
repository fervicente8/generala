"use client";

import type { HTMLAttributes, ReactNode } from "react";
import { motion } from "framer-motion";
import { ClipboardList } from "lucide-react";

/**
 * Franja compacta sobre la hoja: título + acción Abrir/Cerrar (misma línea en cerrada y abierta).
 */
export function ScoreSheetNotebookHeader({
  action,
  onAction,
  subtitleOverride,
  desktopToolbar,
  dragRegionProps,
}: {
  action: "open" | "close";
  onAction: () => void;
  /** Texto bajo “Anotador” (ej. escritorio sin backdrop) */
  subtitleOverride?: string;
  /** Botones extra antes de Cerrar (solo escritorio) */
  desktopToolbar?: ReactNode;
  /** Área arrastrable en escritorio */
  dragRegionProps?: HTMLAttributes<HTMLDivElement>;
}) {
  const label = action === "open" ? "Abrir" : "Cerrar";

  const subtitle =
    subtitleOverride ??
    (action === "open"
      ? "Versión ampliada con más espacio"
      : "Tocá fuera o Cerrar para volver a la mesa");

  const {
    className: dragRegionClassName,
    ...dragRegionRest
  } = dragRegionProps ?? {};

  return (
    <div className="flex shrink-0 items-center justify-between gap-2 border-b border-(--color-metallic-gold)/50 bg-linear-to-r from-white/70 via-(--color-metallic-gold)/15 to-(--color-pearl-white)/60 px-2.5 py-2 shadow-[inset_0_-1px_0_rgba(212,160,23,0.12)] backdrop-blur-sm sm:gap-3 sm:px-3.5 sm:py-2.5">
      <div
        className={`flex min-w-0 flex-1 items-center gap-2 sm:gap-2.5 ${dragRegionClassName ?? ""}`}
        {...dragRegionRest}
      >
        <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl border-2 border-(--color-metallic-gold)/45 bg-white/70 shadow-[0_2px_8px_rgba(0,0,0,0.08)] sm:h-9 sm:w-9">
          <ClipboardList
            className="h-4 w-4 text-(--color-sapphire-blue) sm:h-[18px] sm:w-[18px]"
            aria-hidden
          />
        </span>
        <div className="min-w-0 leading-tight">
          <p className="truncate font-poppins text-xs font-bold tracking-tight text-(--color-sapphire-blue) sm:text-sm">
            Anotador
          </p>
          <p className="hidden truncate text-[10px] font-quicksand text-(--color-black-matte)/55 sm:block sm:text-xs">
            {subtitle}
          </p>
        </div>
      </div>
      <div className="flex shrink-0 items-center gap-1.5 sm:gap-2">
        {desktopToolbar}
      <motion.button
        type="button"
        onClick={onAction}
        className="shrink-0 rounded-full border-2 border-(--color-metallic-gold)/70 bg-linear-to-b from-(--color-pearl-white) to-(--color-pearl-white)/85 px-3.5 py-1.5 text-xs font-quicksand font-bold tracking-wide text-(--color-sapphire-blue) shadow-md transition hover:border-(--color-metallic-gold) hover:shadow-lg sm:px-5 sm:py-2 sm:text-sm"
        whileTap={{ scale: 0.96 }}
        aria-label={label}
      >
        {label}
      </motion.button>
      </div>
    </div>
  );
}
