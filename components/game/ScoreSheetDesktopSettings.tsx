"use client";

import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import { createPortal } from "react-dom";
import { motion } from "framer-motion";
import { Settings2 } from "lucide-react";
import type { DesktopScoreSheetPrefsV1 } from "@/lib/scoreSheetPrefs";
import {
  SCORE_SHEET_PRESETS,
  type ScoreSheetSizePreset,
} from "@/lib/scoreSheetPrefs";

const MENU_WIDTH = 272;
const MENU_Z = 200;

type Props = {
  prefs: DesktopScoreSheetPrefsV1;
  onChange: (next: DesktopScoreSheetPrefsV1) => void;
  containerWidth: number;
  containerHeight: number;
  applyPreset: (preset: Exclude<ScoreSheetSizePreset, "custom">) => void;
};

export function ScoreSheetDesktopSettings({
  prefs,
  onChange,
  containerWidth,
  containerHeight,
  applyPreset,
}: Props) {
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const [menuPos, setMenuPos] = useState<{ top: number; left: number } | null>(
    null,
  );

  useEffect(() => {
    setMounted(true);
  }, []);

  const updateMenuPosition = useCallback(() => {
    const btn = buttonRef.current;
    if (!btn) return;
    const r = btn.getBoundingClientRect();
    const w = Math.min(MENU_WIDTH, window.innerWidth - 16);
    const left = Math.min(Math.max(8, r.right - w), window.innerWidth - w - 8);
    const top = Math.min(r.bottom + 8, window.innerHeight - 8);
    setMenuPos({ top, left });
  }, []);

  useLayoutEffect(() => {
    if (!open) {
      setMenuPos(null);
      return;
    }
    updateMenuPosition();
    const onResizeOrScroll = () => updateMenuPosition();
    window.addEventListener("resize", onResizeOrScroll);
    window.addEventListener("scroll", onResizeOrScroll, true);
    return () => {
      window.removeEventListener("resize", onResizeOrScroll);
      window.removeEventListener("scroll", onResizeOrScroll, true);
    };
  }, [open, updateMenuPosition]);

  useEffect(() => {
    if (!open) return;
    const close = (e: MouseEvent) => {
      const t = e.target as Node;
      if (buttonRef.current?.contains(t)) return;
      if (menuRef.current?.contains(t)) return;
      setOpen(false);
    };
    document.addEventListener("mousedown", close);
    return () => document.removeEventListener("mousedown", close);
  }, [open]);

  const presetKeys = Object.keys(SCORE_SHEET_PRESETS) as Exclude<
    ScoreSheetSizePreset,
    "custom"
  >[];

  const menuWidth =
    typeof window !== "undefined"
      ? Math.min(MENU_WIDTH, window.innerWidth - 16)
      : MENU_WIDTH;

  return (
    <div className="relative shrink-0">
      <motion.button
        ref={buttonRef}
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          setOpen((o) => !o);
        }}
        onPointerDown={(e) => e.stopPropagation()}
        className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border-2 border-(--color-metallic-gold)/55 bg-white/90 text-(--color-sapphire-blue) shadow-sm transition hover:bg-white hover:shadow-md sm:h-10 sm:w-10"
        whileTap={{ scale: 0.94 }}
        aria-expanded={open}
        aria-haspopup="dialog"
        aria-label="Configuración del anotador"
      >
        <Settings2 className="h-4 w-4 sm:h-[18px] sm:w-[18px]" />
      </motion.button>

      {mounted &&
        open &&
        menuPos &&
        createPortal(
          <motion.div
            ref={menuRef}
            role="dialog"
            aria-label="Configuración del anotador"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2 }}
            style={{
              position: "fixed",
              top: menuPos.top,
              left: menuPos.left,
              width: menuWidth,
              zIndex: MENU_Z,
            }}
            className="rounded-xl border-2 border-amber-900/35 bg-(--color-pearl-white) p-3.5 shadow-[0_20px_50px_rgba(0,0,0,0.45),0_0_0_1px_rgba(0,0,0,0.06)] ring-1 ring-black/10 backdrop-blur-sm"
            onPointerDown={(e) => e.stopPropagation()}
          >
            <p className="mb-2 font-poppins text-xs font-bold text-(--color-sapphire-blue)">
              Anotador
            </p>
            <p className="mb-3 text-[11px] leading-snug text-(--color-black-matte)/80 font-quicksand">
              Arrastrá el encabezado para mover. Redimensioná desde la esquina
              inferior derecha.
            </p>

            <label className="mb-3 flex cursor-pointer items-start gap-2.5 rounded-lg bg-white p-2.5 text-left shadow-[inset_0_0_0_1px_rgba(212,160,23,0.2)]">
              <input
                type="checkbox"
                className="mt-0.5 h-4 w-4 shrink-0 rounded border-(--color-metallic-gold) text-(--color-sapphire-blue)"
                checked={prefs.backdrop}
                onChange={(e) =>
                  onChange({ ...prefs, backdrop: e.target.checked })
                }
              />
              <span className="text-xs font-quicksand text-(--color-black-matte)">
                Fondo oscuro al abrir
                <span className="mt-1 block text-[10px] leading-snug text-(--color-black-matte)/65">
                  Si lo desactivás, no se cierra al clic fuera de la libreta.
                </span>
              </span>
            </label>

            <p className="mb-1.5 text-[10px] font-semibold uppercase tracking-wide text-(--color-black-matte)/55">
              Tamaño
            </p>
            <div className="mb-1 flex flex-wrap gap-2">
              {presetKeys.map((key) => (
                <button
                  key={key}
                  type="button"
                  onClick={() => applyPreset(key)}
                  className={`rounded-lg border-2 px-3 py-1.5 text-xs font-quicksand font-bold transition ${
                    prefs.sizePreset === key
                      ? "border-(--color-sapphire-blue) bg-(--color-sapphire-blue)/12 text-(--color-sapphire-blue)"
                      : "border-(--color-metallic-gold)/45 bg-white text-(--color-black-matte) hover:border-(--color-metallic-gold) hover:bg-(--color-pearl-white)"
                  }`}
                >
                  {key === "S" ? "Chica" : key === "M" ? "Media" : "Grande"}
                </button>
              ))}
              {prefs.sizePreset === "custom" && (
                <span className="self-center text-[10px] font-quicksand text-(--color-black-matte)/60">
                  Personalizado ({Math.round(prefs.widthPx)}×
                  {Math.round(prefs.heightPx)})
                </span>
              )}
            </div>
            <p className="mt-2.5 border-t border-(--color-silver-gray)/40 pt-2 text-[10px] text-(--color-black-matte)/50 font-quicksand">
              Área mesa: {Math.round(containerWidth)}×
              {Math.round(containerHeight)} px
            </p>
          </motion.div>,
          document.body,
        )}
    </div>
  );
}
