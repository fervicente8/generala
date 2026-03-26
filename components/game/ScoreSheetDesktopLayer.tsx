"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import type { ComponentProps } from "react";
import { AnimatePresence, motion } from "framer-motion";
import ScoreTable from "./ScoreSheet";
import { NotebookBinding } from "./NotebookBinding";
import { ScoreSheetNotebookHeader } from "./ScoreSheetNotebookHeader";
import { ScoreSheetDesktopSettings } from "./ScoreSheetDesktopSettings";
import {
  applyPreset as applyPresetLib,
  clampPrefsToContainer,
  defaultDesktopPrefs,
  type DesktopScoreSheetPrefsV1,
} from "@/lib/scoreSheetPrefs";
import { SCORE_SHEET_LIMITS } from "@/lib/scoreSheetPrefs";

const notebookChrome =
  "flex min-w-0 w-full max-w-none overflow-hidden rounded-2xl border-2 border-amber-900/30 sm:rounded-3xl shadow-[0_10px_28px_rgba(0,0,0,0.38),0_3px_10px_rgba(0,0,0,0.16)]";

const paperFace =
  "bg-[url('/textures/marfil.png')] bg-cover shadow-[inset_0_1px_0_rgba(255,255,255,0.35)]";

type ScoreTableProps = ComponentProps<typeof ScoreTable>;

type Props = {
  open: boolean;
  onClose: () => void;
  gameSurfaceRef: React.RefObject<HTMLElement | null>;
  prefs: DesktopScoreSheetPrefsV1 | null;
  onPrefsChange: (p: DesktopScoreSheetPrefsV1) => void;
  tablePropsOpen: ScoreTableProps;
};

function clamp(n: number, lo: number, hi: number) {
  return Math.min(hi, Math.max(lo, n));
}

export function ScoreSheetDesktopLayer({
  open,
  onClose,
  gameSurfaceRef,
  prefs,
  onPrefsChange,
  tablePropsOpen,
}: Props) {
  const panelRef = useRef<HTMLDivElement>(null);
  const [dims, setDims] = useState({ w: 800, h: 600 });

  const measure = useCallback(() => {
    const el = gameSurfaceRef.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    if (r.width > 0 && r.height > 0) {
      setDims({ w: r.width, h: r.height });
    }
  }, [gameSurfaceRef]);

  useEffect(() => {
    if (!open) return;
    measure();
    const el = gameSurfaceRef.current;
    if (!el) return;
    const ro = new ResizeObserver(() => measure());
    ro.observe(el);
    window.addEventListener("resize", measure);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, [open, measure, gameSurfaceRef]);

  const resolved = useMemo(() => {
    const base = prefs ?? defaultDesktopPrefs(dims.w, dims.h);
    return clampPrefsToContainer(base, dims.w, dims.h);
  }, [prefs, dims.w, dims.h]);

  const dragState = useRef<{
    startX: number;
    startY: number;
    startLeftPx: number;
    startTopPx: number;
  } | null>(null);

  const resizeState = useRef<{
    startX: number;
    startY: number;
    startW: number;
    startH: number;
  } | null>(null);

  const applyPreset = useCallback(
    (preset: "S" | "M" | "L") => {
      const next = applyPresetLib(preset, resolved, dims.w, dims.h);
      onPrefsChange(next);
    },
    [resolved, dims.w, dims.h, onPrefsChange],
  );

  const onDragRegionPointerDown = (e: React.PointerEvent) => {
    if ((e.target as HTMLElement).closest("button, a, input, label")) return;
    const container = gameSurfaceRef.current;
    const panel = panelRef.current;
    if (!container || !panel) return;
    e.preventDefault();
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
    const c = container.getBoundingClientRect();
    const p = panel.getBoundingClientRect();
    dragState.current = {
      startX: e.clientX,
      startY: e.clientY,
      startLeftPx: p.left - c.left,
      startTopPx: p.top - c.top,
    };
  };

  const onDragRegionPointerMove = (e: React.PointerEvent) => {
    if (!dragState.current) return;
    const container = gameSurfaceRef.current;
    const panel = panelRef.current;
    if (!container || !panel) return;
    const c = container.getBoundingClientRect();
    const { startX, startY, startLeftPx, startTopPx } = dragState.current;
    const dx = e.clientX - startX;
    const dy = e.clientY - startY;
    const w = panel.offsetWidth;
    const h = panel.offsetHeight;
    let leftPx = startLeftPx + dx;
    let topPx = startTopPx + dy;
    leftPx = clamp(leftPx, 8, c.width - w - 8);
    topPx = clamp(topPx, 8, c.height - h - 8);
    onPrefsChange({
      ...resolved,
      leftPct: (leftPx / c.width) * 100,
      topPct: (topPx / c.height) * 100,
    });
  };

  const endDrag = (e: React.PointerEvent) => {
    if (dragState.current) {
      try {
        (e.currentTarget as HTMLElement).releasePointerCapture(e.pointerId);
      } catch {
        /* ignore */
      }
    }
    dragState.current = null;
  };

  const onResizePointerDown = (e: React.PointerEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const panel = panelRef.current;
    if (!panel) return;
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
    resizeState.current = {
      startX: e.clientX,
      startY: e.clientY,
      startW: panel.offsetWidth,
      startH: panel.offsetHeight,
    };
  };

  const onResizePointerMove = (e: React.PointerEvent) => {
    if (!resizeState.current) return;
    const container = gameSurfaceRef.current;
    const panel = panelRef.current;
    if (!container || !panel) return;
    const c = container.getBoundingClientRect();
    const { startX, startY, startW, startH } = resizeState.current;
    const dw = e.clientX - startX;
    const dh = e.clientY - startY;
    const maxW = Math.min(SCORE_SHEET_LIMITS.maxWidthPx, c.width - 16);
    const maxH = Math.min(SCORE_SHEET_LIMITS.maxHeightPx, c.height - 16);
    let w = clamp(startW + dw, SCORE_SHEET_LIMITS.minWidthPx, maxW);
    let h = clamp(startH + dh, SCORE_SHEET_LIMITS.minHeightPx, maxH);
    const leftPx = (resolved.leftPct / 100) * c.width;
    const topPx = (resolved.topPct / 100) * c.height;
    if (leftPx + w > c.width - 8) w = c.width - 8 - leftPx;
    if (topPx + h > c.height - 8) h = c.height - 8 - topPx;
    w = clamp(w, SCORE_SHEET_LIMITS.minWidthPx, maxW);
    h = clamp(h, SCORE_SHEET_LIMITS.minHeightPx, maxH);
    onPrefsChange({
      ...resolved,
      widthPx: w,
      heightPx: h,
      sizePreset: "custom",
    });
  };

  const endResize = (e: React.PointerEvent) => {
    if (resizeState.current) {
      try {
        (e.currentTarget as HTMLElement).releasePointerCapture(e.pointerId);
      } catch {
        /* ignore */
      }
    }
    resizeState.current = null;
  };

  const backdropMotion = {
    initial: { opacity: 0 },
    animate: {
      opacity: 1,
      transition: { duration: 0.22, ease: [0.22, 1, 0.36, 1] as const },
    },
    exit: {
      opacity: 0,
      transition: { duration: 0.32, ease: [0.4, 0, 0.2, 1] as const },
    },
  };

  return (
    <AnimatePresence mode="sync">
      {open && (
        <>
          {resolved.backdrop && (
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
          )}
          <div className="absolute inset-0 z-61 pointer-events-none">
            <motion.div
              ref={panelRef}
              className={`pointer-events-auto absolute flex min-h-0 flex-row ${notebookChrome}`}
              style={{
                left: `${resolved.leftPct}%`,
                top: `${resolved.topPct}%`,
                width: resolved.widthPx,
                height: resolved.heightPx,
              }}
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ type: "spring", stiffness: 320, damping: 30 }}
              onClick={(e) => e.stopPropagation()}
            >
              <NotebookBinding />
              <div
                className={`flex min-h-0 min-w-0 flex-1 flex-col overflow-hidden ${paperFace}`}
              >
                <ScoreSheetNotebookHeader
                  action="close"
                  onAction={onClose}
                  subtitleOverride={
                    resolved.backdrop
                      ? "Arrastrá el encabezado para mover · esquina ↘ para tamaño"
                      : "Cerrá con el botón — no se cierra al clic fuera"
                  }
                  desktopToolbar={
                    <ScoreSheetDesktopSettings
                      prefs={resolved}
                      onChange={onPrefsChange}
                      containerWidth={dims.w}
                      containerHeight={dims.h}
                      applyPreset={applyPreset}
                    />
                  }
                  dragRegionProps={{
                    className:
                      "cursor-grab touch-none select-none active:cursor-grabbing rounded-lg py-0.5 -my-0.5",
                    onPointerDown: onDragRegionPointerDown,
                    onPointerMove: onDragRegionPointerMove,
                    onPointerUp: endDrag,
                    onPointerCancel: endDrag,
                  }}
                />
                <div className="flex min-h-0 flex-1 flex-col overflow-hidden">
                  <ScoreTable {...tablePropsOpen} />
                </div>
              </div>
              <div
                role="separator"
                aria-label="Redimensionar anotador"
                className="absolute bottom-0 right-0 z-30 h-5 w-5 cursor-nwse-resize rounded-tl-md border-t border-l border-amber-900/35 bg-linear-to-br from-white/50 to-stone-200/80 shadow-sm touch-none"
                onPointerDown={onResizePointerDown}
                onPointerMove={onResizePointerMove}
                onPointerUp={endResize}
                onPointerCancel={endResize}
              />
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}
