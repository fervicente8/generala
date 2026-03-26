/**
 * Preferencias del anotador en escritorio (persistidas por jugador y partida).
 */

export const SCORE_SHEET_DESKTOP_V = 1 as const;

export type ScoreSheetSizePreset = "S" | "M" | "L" | "custom";

export type DesktopScoreSheetPrefsV1 = {
  v: typeof SCORE_SHEET_DESKTOP_V;
  /** Esquina superior izquierda del panel, % del área de juego */
  leftPct: number;
  topPct: number;
  widthPx: number;
  heightPx: number;
  backdrop: boolean;
  sizePreset: ScoreSheetSizePreset;
};

export const SCORE_SHEET_PRESETS: Record<
  Exclude<ScoreSheetSizePreset, "custom">,
  { widthPx: number; heightPx: number }
> = {
  S: { widthPx: 300, heightPx: 420 },
  M: { widthPx: 360, heightPx: 520 },
  L: { widthPx: 440, heightPx: 640 },
};

export const SCORE_SHEET_LIMITS = {
  minWidthPx: 260,
  minHeightPx: 340,
  maxWidthPx: 560,
  maxHeightPx: 720,
} as const;

function clamp(n: number, min: number, max: number): number {
  return Math.min(max, Math.max(min, n));
}

export function isDesktopScoreSheetPrefsV1(
  x: unknown,
): x is DesktopScoreSheetPrefsV1 {
  if (!x || typeof x !== "object") return false;
  const o = x as Record<string, unknown>;
  return (
    o.v === SCORE_SHEET_DESKTOP_V &&
    typeof o.leftPct === "number" &&
    typeof o.topPct === "number" &&
    typeof o.widthPx === "number" &&
    typeof o.heightPx === "number" &&
    typeof o.backdrop === "boolean" &&
    typeof o.sizePreset === "string"
  );
}

export function parseScoreSheetPrefs(
  raw: unknown,
): DesktopScoreSheetPrefsV1 | null {
  if (raw == null) return null;
  if (!isDesktopScoreSheetPrefsV1(raw)) return null;
  return raw;
}

/** Ajusta tamaño y posición para que el panel quede dentro del área de juego. */
export function clampPrefsToContainer(
  p: DesktopScoreSheetPrefsV1,
  containerWidth: number,
  containerHeight: number,
): DesktopScoreSheetPrefsV1 {
  const cw = Math.max(1, containerWidth);
  const ch = Math.max(1, containerHeight);
  const w = clamp(
    p.widthPx,
    SCORE_SHEET_LIMITS.minWidthPx,
    Math.min(SCORE_SHEET_LIMITS.maxWidthPx, cw - 8),
  );
  const h = clamp(
    p.heightPx,
    SCORE_SHEET_LIMITS.minHeightPx,
    Math.min(SCORE_SHEET_LIMITS.maxHeightPx, ch - 8),
  );
  const maxLeftPx = Math.max(8, cw - w - 8);
  const maxTopPx = Math.max(8, ch - h - 8);
  const leftPx = clamp((p.leftPct / 100) * cw, 8, maxLeftPx);
  const topPx = clamp((p.topPct / 100) * ch, 8, maxTopPx);
  return {
    ...p,
    widthPx: w,
    heightPx: h,
    leftPct: (leftPx / cw) * 100,
    topPct: (topPx / ch) * 100,
  };
}

/** Valores por defecto alineados al panel anclado a la derecha (comportamiento previo). */
export function defaultDesktopPrefs(
  containerWidth: number,
  containerHeight: number,
): DesktopScoreSheetPrefsV1 {
  const cw = Math.max(320, containerWidth);
  const ch = Math.max(280, containerHeight);
  const { widthPx, heightPx } = SCORE_SHEET_PRESETS.M;
  const w = clamp(
    widthPx,
    SCORE_SHEET_LIMITS.minWidthPx,
    Math.min(SCORE_SHEET_LIMITS.maxWidthPx, cw - 16),
  );
  const h = clamp(
    heightPx,
    SCORE_SHEET_LIMITS.minHeightPx,
    Math.min(SCORE_SHEET_LIMITS.maxHeightPx, ch - 16),
  );
  const rightMargin = Math.min(24, cw * 0.04);
  const leftPx = Math.max(8, cw - w - rightMargin);
  const topPx = Math.max(8, (ch - h) / 2);
  return {
    v: SCORE_SHEET_DESKTOP_V,
    leftPct: (leftPx / cw) * 100,
    topPct: (topPx / ch) * 100,
    widthPx: w,
    heightPx: h,
    backdrop: true,
    sizePreset: "M",
  };
}

export function applyPreset(
  preset: Exclude<ScoreSheetSizePreset, "custom">,
  current: DesktopScoreSheetPrefsV1,
  containerWidth: number,
  containerHeight: number,
): DesktopScoreSheetPrefsV1 {
  const { widthPx, heightPx } = SCORE_SHEET_PRESETS[preset];
  return clampPrefsToContainer(
    {
      ...current,
      widthPx,
      heightPx,
      sizePreset: preset,
    },
    containerWidth,
    containerHeight,
  );
}
