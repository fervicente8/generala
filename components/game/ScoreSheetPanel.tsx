"use client";

import type { ComponentProps } from "react";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronUp, ClipboardList } from "lucide-react";
import ScoreTable from "./ScoreSheet";
import { NotebookBinding } from "./NotebookBinding";
import { ScoreSheetNotebookHeader } from "./ScoreSheetNotebookHeader";
import { ScoreSheetDesktopLayer } from "./ScoreSheetDesktopLayer";
import type { DesktopScoreSheetPrefsV1 } from "@/lib/scoreSheetPrefs";

/** Marco libreta desplegada (móvil / fallback) */
const notebookChrome =
  "flex min-w-[300px] w-max max-w-[min(96vw,calc(100vw-1.25rem))] overflow-hidden rounded-2xl border-2 border-amber-900/30 sm:min-w-[340px] sm:rounded-3xl shadow-[0_10px_28px_rgba(0,0,0,0.38),0_3px_10px_rgba(0,0,0,0.16)]";

const paperFace =
  "bg-[url('/textures/marfil.png')] bg-cover shadow-[inset_0_1px_0_rgba(255,255,255,0.35)]";

const sheetOpenInsetPadding =
  "pr-[max(0.65rem,2.5vw)] sm:pr-[min(7%,3.25rem)] md:pr-[min(8%,4rem)]";

const backdropMotion = {
  initial: { opacity: 0 },
  animate: {
    opacity: 1,
    transition: { duration: 0.26, ease: [0.22, 1, 0.36, 1] as const },
  },
  exit: {
    opacity: 0,
    transition: { duration: 0.44, ease: [0.4, 0, 0.2, 1] as const },
  },
};

const sheetMotion = {
  initial: {
    opacity: 0,
    scale: 0.82,
    y: 28,
    rotateX: 6,
  },
  animate: {
    opacity: 1,
    scale: 1,
    y: 0,
    rotateX: 0,
    transition: {
      type: "spring" as const,
      stiffness: 260,
      damping: 26,
      mass: 0.72,
    },
  },
  exit: {
    opacity: 0,
    scale: 0.88,
    y: 20,
    rotateX: 4,
    transition: {
      duration: 0.38,
      ease: [0.4, 0, 0.2, 1] as const,
    },
  },
};

function useIsDesktopMd() {
  const [desktop, setDesktop] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 768px)");
    const apply = () => setDesktop(mq.matches);
    apply();
    mq.addEventListener("change", apply);
    return () => mq.removeEventListener("change", apply);
  }, []);
  return desktop;
}

interface ScoreSheetPanelProps extends ComponentProps<typeof ScoreTable> {
  open: boolean;
  onOpen: () => void;
  onClose: () => void;
  gameEnded: boolean;
  gameSurfaceRef: React.RefObject<HTMLElement | null>;
  desktopScoreSheetPrefs: DesktopScoreSheetPrefsV1 | null;
  onDesktopScoreSheetPrefsChange: (p: DesktopScoreSheetPrefsV1) => void;
}

export function ScoreSheetPanel({
  open,
  onOpen,
  onClose,
  gameEnded,
  gameSurfaceRef,
  desktopScoreSheetPrefs,
  onDesktopScoreSheetPrefsChange,
  ...scoreTableProps
}: ScoreSheetPanelProps) {
  const isDesktop = useIsDesktopMd();

  if (gameEnded) return null;

  const tablePropsOpen = {
    ...scoreTableProps,
    fitViewport: true as const,
    embeddedInPanel: true as const,
    sidePanel: true as const,
    autoTableWidth: true as const,
  };

  return (
    <>
      <motion.button
        type="button"
        onClick={onOpen}
        aria-label="Abrir anotador"
        className="absolute z-55 flex touch-manipulation items-center justify-center gap-2 border-2 border-amber-900/35 bg-[url('/textures/marfil.png')] bg-cover
          left-1/2 bottom-[max(0.65rem,env(safe-area-inset-bottom,0px))] h-12 max-h-12 w-auto min-w-0 max-w-[min(92vw,22rem)] -translate-x-1/2 flex-row rounded-t-2xl border-b-0 px-4 py-0 shadow-[0_-8px_22px_rgba(0,0,0,0.32)]
          sm:left-auto sm:right-0 sm:top-1/2 sm:bottom-auto sm:h-auto sm:max-h-[min(70dvh,520px)] sm:min-h-[min(11rem,44dvh)] sm:w-14 sm:min-w-[48px] sm:max-w-none sm:translate-x-0 sm:-translate-y-1/2 sm:flex-col sm:rounded-t-none sm:rounded-l-2xl sm:rounded-tr-none sm:rounded-br-none sm:border-b-2 sm:border-r-0 sm:px-1.5 sm:py-5 sm:shadow-[-10px_4px_24px_rgba(0,0,0,0.38)] sm:gap-2.5"
        initial={false}
        animate={{
          opacity: open ? 0 : 1,
          pointerEvents: open ? ("none" as const) : ("auto" as const),
        }}
        transition={{ type: "spring", stiffness: 320, damping: 28 }}
        whileTap={{ scale: 0.97 }}
      >
        <ChevronUp
          className="h-4 w-4 shrink-0 text-(--color-black-matte)/55 sm:hidden"
          aria-hidden
        />
        <ClipboardList
          className="h-5 w-5 shrink-0 text-(--color-sapphire-blue) sm:h-6 sm:w-6"
          aria-hidden
        />
        <span className="font-poppins text-xs font-bold leading-none text-(--color-sapphire-blue) sm:hidden">
          Anotador
        </span>
        <span className="hidden max-h-36 select-none truncate text-center font-poppins text-[10px] font-bold leading-tight text-(--color-sapphire-blue) [text-orientation:mixed] [writing-mode:vertical-rl] rotate-180 sm:block sm:text-xs">
          Anotador
        </span>
        <ChevronLeft
          className="hidden h-4 w-4 shrink-0 text-(--color-black-matte)/55 sm:block sm:h-5 sm:w-5"
          aria-hidden
        />
      </motion.button>

      {isDesktop ? (
        <ScoreSheetDesktopLayer
          open={open}
          onClose={onClose}
          gameSurfaceRef={gameSurfaceRef}
          prefs={desktopScoreSheetPrefs}
          onPrefsChange={onDesktopScoreSheetPrefsChange}
          tablePropsOpen={tablePropsOpen}
        />
      ) : (
        <AnimatePresence mode="sync">
          {open && (
            <>
              <div className="absolute inset-0 z-60">
                <motion.button
                  type="button"
                  aria-label="Cerrar anotador"
                  className="absolute inset-0 cursor-default border-0 bg-black/30 p-0 backdrop-blur-[3px] w-full h-full"
                  {...backdropMotion}
                  onClick={onClose}
                />
                <p className="pointer-events-none absolute top-[max(4.5rem,env(safe-area-inset-top,0px)+3rem)] left-1/2 max-w-[min(90vw,22rem)] -translate-x-1/2 text-center text-sm font-quicksand text-(--color-pearl-white)/95 drop-shadow-[0_1px_4px_rgba(0,0,0,0.85)]">
                  Tocá fuera de la libreta para cerrar
                </p>
              </div>
              <div
                className={`absolute inset-0 z-61 pointer-events-none flex items-stretch justify-end p-0 max-sm:py-1 max-sm:pr-[max(0.5rem,2vw)] sm:p-0 ${sheetOpenInsetPadding}`}
                style={{ perspective: 900 }}
              >
                <motion.div
                  className={`pointer-events-auto flex h-full max-h-full min-h-0 flex-row ${notebookChrome}`}
                  style={{
                    transformStyle: "preserve-3d",
                    transformOrigin: "center bottom",
                  }}
                  initial={sheetMotion.initial}
                  animate={sheetMotion.animate}
                  exit={sheetMotion.exit}
                  onClick={(e) => e.stopPropagation()}
                >
                  <NotebookBinding />
                  <div
                    className={`flex h-full min-h-0 w-max min-w-0 max-w-[min(96vw,calc(100vw-2.5rem))] flex-col overflow-hidden ${paperFace}`}
                  >
                    <ScoreSheetNotebookHeader action="close" onAction={onClose} />
                    <div className="flex min-h-0 flex-1 flex-col overflow-hidden">
                      <ScoreTable {...tablePropsOpen} />
                    </div>
                  </div>
                </motion.div>
              </div>
            </>
          )}
        </AnimatePresence>
      )}
    </>
  );
}
