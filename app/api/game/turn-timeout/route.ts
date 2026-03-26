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

/** Primera categoría libre para tachar por tiempo agotado (menor valor numérico primero). */
function firstEmptyCategory(
  player: Record<string, unknown>,
): ScoreCategoryKey | null {
  for (const cat of SCORE_CATEGORY_KEYS) {
    const v = player[cat];
    if (v === null || v === undefined) return cat;
  }
  return null;
}

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);
  const { gameId } = await req.json();

  if (!gameId) {
    return NextResponse.json({ error: "Falta gameId" }, { status: 400 });
  }

  if (!session?.user?.id) {
    return NextResponse.json({ error: "No autenticado" }, { status: 401 });
  }

  const game = await prisma.game.findUnique({
    where: { id: gameId },
    include: { players: true },
  });

  if (!game || game.status !== "in_progress") {
    return NextResponse.json({ error: "Partida no disponible" }, { status: 400 });
  }

  if (game.currentTurnId !== session.user.id) {
    return NextResponse.json({ error: "No es tu turno" }, { status: 403 });
  }

  if (!game.turnTimeout || game.turnTimeout <= 0) {
    return NextResponse.json(
      { error: "Esta sala no tiene tiempo límite" },
      { status: 400 },
    );
  }

  if (!isTurnTimeExpired(game.turnStartedAt, game.turnTimeout, 0)) {
    return NextResponse.json(
      { error: "El tiempo de esta tirada aún no venció" },
      { status: 400 },
    );
  }

  const gameUser = await prisma.gameUser.findUnique({
    where: {
      userId_gameId: { userId: session.user.id, gameId },
    },
  });

  if (!gameUser) {
    return NextResponse.json({ error: "Jugador no encontrado" }, { status: 404 });
  }

  const category = firstEmptyCategory(gameUser as Record<string, unknown>);
  if (!category) {
    return NextResponse.json({ error: "Sin categorías libres" }, { status: 400 });
  }

  try {
    const result = await completeTurnScore(prisma, {
      gameUserId: session.user.id,
      gameId,
      category,
      score: 0,
      requestingUserId: session.user.id,
    });

    return NextResponse.json({
      currentTurnId: result.currentTurnId,
      updatedValues: result.updatedValues,
      finished: result.finished,
      newlyUnlocked: result.newlyUnlocked,
      turnStartedAt: result.turnStartedAt,
      timedOutCategory: category,
    });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: "Error al aplicar timeout" }, { status: 500 });
  }
}
