import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const gameId = (await params).id;
  const { searchParams } = new URL(req.url);
  const userId = searchParams.get("userId");

  if (!userId) {
    return NextResponse.json({ error: "Usuario no autenticado" }, { status: 400 });
  }

  try {
    // Obtener juego con jugadores
    const game = await prisma.game.findUnique({
      where: {
        id: gameId,
      },
      include: {
        players: {
          include: {
            user: true,
          },
        },
      },
    });

    if (!game) {
      return NextResponse.json({ error: "Juego no encontrado" }, { status: 404 });
    }

    const isUserInGame = game.players.some((player) => player.userId === userId);
    const canView = isUserInGame || game.status === "finished";

    if (!canView) {
      return NextResponse.json({ error: "No estás en esta sala" }, { status: 403 });
    }

    let turnStartedAt = game.turnStartedAt;
    if (
      game.turnTimeout &&
      game.turnTimeout > 0 &&
      !turnStartedAt &&
      game.currentTurnId &&
      game.status === "in_progress"
    ) {
      const now = new Date();
      await prisma.game.update({
        where: { id: gameId },
        data: { turnStartedAt: now },
      });
      turnStartedAt = now;
    }

    return NextResponse.json({
      id: game.id,
      players: game.players.map((p) => p),
      status: game.status,
      turnTimeout: game.turnTimeout,
      currentTurnId: game.currentTurnId,
      turnStartedAt: turnStartedAt?.toISOString() ?? null,
      diceValues: game.diceValues,
      rollCount: game.rollCount,
    });
  } catch (error) {
    console.error("Error al obtener el juego:", error);
    return NextResponse.json({ error: "Error interno del servidor" }, { status: 500 });
  }
}