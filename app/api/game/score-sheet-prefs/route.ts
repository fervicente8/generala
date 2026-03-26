import { getServerSession } from "next-auth";
import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "@/lib/auth";
import {
  isDesktopScoreSheetPrefsV1,
  type DesktopScoreSheetPrefsV1,
  SCORE_SHEET_LIMITS,
} from "@/lib/scoreSheetPrefs";

function clamp(n: number, min: number, max: number) {
  return Math.min(max, Math.max(min, n));
}

function sanitizePrefs(p: DesktopScoreSheetPrefsV1): DesktopScoreSheetPrefsV1 {
  const presetOk =
    p.sizePreset === "S" ||
    p.sizePreset === "M" ||
    p.sizePreset === "L" ||
    p.sizePreset === "custom"
      ? p.sizePreset
      : "custom";
  return {
    v: 1,
    leftPct: clamp(p.leftPct, 0, 100),
    topPct: clamp(p.topPct, 0, 100),
    widthPx: clamp(
      p.widthPx,
      SCORE_SHEET_LIMITS.minWidthPx,
      SCORE_SHEET_LIMITS.maxWidthPx,
    ),
    heightPx: clamp(
      p.heightPx,
      SCORE_SHEET_LIMITS.minHeightPx,
      SCORE_SHEET_LIMITS.maxHeightPx,
    ),
    backdrop: Boolean(p.backdrop),
    sizePreset: presetOk,
  };
}

export async function PATCH(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    return NextResponse.json({ error: "No autorizado" }, { status: 401 });
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "JSON inválido" }, { status: 400 });
  }

  const gameId =
    body && typeof body === "object" && "gameId" in body
      ? (body as { gameId?: string }).gameId
      : undefined;
  const prefs =
    body && typeof body === "object" && "prefs" in body
      ? (body as { prefs?: unknown }).prefs
      : undefined;

  if (!gameId || typeof gameId !== "string") {
    return NextResponse.json({ error: "gameId requerido" }, { status: 400 });
  }

  if (!isDesktopScoreSheetPrefsV1(prefs)) {
    return NextResponse.json({ error: "prefs inválidas" }, { status: 400 });
  }

  try {
    const gameUser = await prisma.gameUser.findUnique({
      where: {
        userId_gameId: { userId: session.user.id, gameId },
      },
    });

    if (!gameUser) {
      return NextResponse.json({ error: "No estás en esta partida" }, { status: 403 });
    }

    const clean = sanitizePrefs(prefs);

    await prisma.gameUser.update({
      where: { id: gameUser.id },
      data: { scoreSheetPrefs: clean },
    });

    return NextResponse.json({ ok: true, prefs: clean });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: "Error al guardar" }, { status: 500 });
  }
}
