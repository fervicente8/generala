/** turnTimeout en segundos desde turnStartedAt (ISO o Date). */
export function isTurnTimeExpired(
  turnStartedAt: Date | string | null | undefined,
  turnTimeoutSec: number | null | undefined,
  graceMs = 0,
): boolean {
  if (turnTimeoutSec == null || turnTimeoutSec <= 0) return false;
  if (turnStartedAt == null) return false;
  const startMs =
    typeof turnStartedAt === "string"
      ? new Date(turnStartedAt).getTime()
      : turnStartedAt.getTime();
  if (Number.isNaN(startMs)) return false;
  return Date.now() > startMs + turnTimeoutSec * 1000 + graceMs;
}

export function secondsRemainingOnTurn(
  turnStartedAt: Date | string | null | undefined,
  turnTimeoutSec: number | null | undefined,
): number | null {
  if (turnTimeoutSec == null || turnTimeoutSec <= 0) return null;
  if (turnStartedAt == null) return null;
  const startMs =
    typeof turnStartedAt === "string"
      ? new Date(turnStartedAt).getTime()
      : turnStartedAt.getTime();
  if (Number.isNaN(startMs)) return null;
  const end = startMs + turnTimeoutSec * 1000;
  return Math.max(0, Math.ceil((end - Date.now()) / 1000));
}

/** 1 = recién empieza el turno, 0 = vencido (para animar borde sin saltos de segundo). */
export function turnTimeRemainingFraction(
  turnStartedAt: Date | string | null | undefined,
  turnTimeoutSec: number | null | undefined,
): number | null {
  if (turnTimeoutSec == null || turnTimeoutSec <= 0) return null;
  if (turnStartedAt == null) return null;
  const startMs =
    typeof turnStartedAt === "string"
      ? new Date(turnStartedAt).getTime()
      : turnStartedAt.getTime();
  if (Number.isNaN(startMs)) return null;
  const totalMs = turnTimeoutSec * 1000;
  const left = startMs + totalMs - Date.now();
  return Math.max(0, Math.min(1, left / totalMs));
}
