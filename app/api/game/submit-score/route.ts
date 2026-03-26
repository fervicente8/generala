import { getServerSession } from "next-auth";
import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "@/lib/auth";
import {
  completeTurnScore,
  SCORE_CATEGORY_KEYS,
  type ScoreCategoryKey,
} from "@/lib/completeTurnScore";
import { isTurnTimeExpired } from "@/lib/turnTimer";

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);
  const { gameUserId, gameId, category, score } = await req.json();

  if (!gameUserId || !category || typeof score !== "number") {
    return NextResponse.json({ error: "Datos incompletos" }, { status: 400 });
  }

  if (!session?.user?.id || session.user.id !== gameUserId) {
    return NextResponse.json({ error: "No es tu turno" }, { status: 403 });
  }

  if (!SCORE_CATEGORY_KEYS.includes(category as ScoreCategoryKey)) {
    return NextResponse.json({ error: "Categoría inválida" }, { status: 400 });
  }

  const gameBefore = await prisma.game.findUnique({
    where: { id: gameId },
    include: { players: true },
  });

  if (!gameBefore) {
    return NextResponse.json({ error: "Juego no encontrado" }, { status: 404 });
  }

  if (gameBefore.currentTurnId !== gameUserId) {
    return NextResponse.json({ error: "No es tu turno" }, { status: 403 });
  }

  if (
    isTurnTimeExpired(
      gameBefore.turnStartedAt,
      gameBefore.turnTimeout,
      /* grace */ 750,
    )
  ) {
    return NextResponse.json(
      { error: "Se acabó el tiempo de esta tirada" },
      { status: 408 },
    );
  }

  try {
    const result = await completeTurnScore(prisma, {
      gameUserId,
      gameId,
      category: category as ScoreCategoryKey,
      score,
      requestingUserId: session.user.id,
    });

    return NextResponse.json({
      currentTurnId: result.currentTurnId,
      updatedValues: result.updatedValues,
      finished: result.finished,
      newlyUnlocked: result.newlyUnlocked,
      turnStartedAt: result.turnStartedAt,
    });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: "Error al guardar" }, { status: 500 });
  }
}
