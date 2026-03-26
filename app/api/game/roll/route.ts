import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { prisma } from "@/lib/prisma";
import { authOptions } from "@/lib/auth";
import { isTurnTimeExpired } from "@/lib/turnTimer";

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);
  const { gameId, dicesToReroll } = await req.json();

  if (!session?.user?.id) {
    return NextResponse.json({ error: "No autenticado" }, { status: 401 });
  }

  const game = await prisma.game.findUnique({
    where: { id: gameId },
    include: { players: true },
  });

  if (!game) {
    return NextResponse.json({ error: "Juego no encontrado" }, { status: 404 });
  }

  if (game.currentTurnId !== session.user.id) {
    return NextResponse.json({ error: "No es tu turno" }, { status: 403 });
  }

  if (
    isTurnTimeExpired(game.turnStartedAt, game.turnTimeout, /* grace */ 500)
  ) {
    return NextResponse.json(
      { error: "Se acabó el tiempo de esta tirada" },
      { status: 408 },
    );
  }

  if (game.rollCount >= 3) {
    return NextResponse.json(
      { error: "Ya se tiraron los dados 3 veces" },
      { status: 400 },
    );
  }

  let newDice = [...game.diceValues];

  if (dicesToReroll?.length > 0) {
    dicesToReroll.forEach((index: number) => {
      newDice[index] = Math.floor(Math.random() * 6) + 1;
    });
  } else {
    newDice = Array.from({ length: 5 }, () => Math.floor(Math.random() * 6) + 1);
  }

  const newRollCount = game.rollCount + 1;
  const now = new Date();

  const updated = await prisma.game.update({
    where: { id: gameId },
    data: {
      diceValues: newDice,
      rollCount: newRollCount,
      /** Cada tirada reinicia la ventana de tiempo límite (no el turno entero). */
      turnStartedAt: now,
    },
  });

  return NextResponse.json({
    ...updated,
    turnStartedAt: updated.turnStartedAt?.toISOString() ?? null,
  });
}
