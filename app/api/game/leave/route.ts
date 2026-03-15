import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { userId, gameId } = body;

    if (!userId || !gameId) {
      return NextResponse.json({ error: "Faltan datos" }, { status: 400 });
    }

    const game = await prisma.game.findUnique({
      where: { id: gameId },
      include: { players: { include: { user: true } } },
    });

    if (!game) {
      return NextResponse.json({ error: "Partida no encontrada" }, { status: 404 });
    }

    const isPlayer = game.players.some((p) => p.userId === userId);
    if (!isPlayer) {
      return NextResponse.json({ error: "No estás en esta partida" }, { status: 403 });
    }

    // Solo partidas en curso: sacar al jugador y actualizar estado
    if (game.status !== "in_progress") {
      return NextResponse.json(
        { error: "Usá el lobby para salir de la sala" },
        { status: 400 }
      );
    }

    await prisma.gameUser.deleteMany({
      where: { gameId, userId },
    });

    const remaining = game.players.filter((p) => p.userId !== userId);

    // Si queda un solo jugador, gana y terminamos la partida
    const oneLeft = remaining.length === 1;
    const newOwnerId = game.ownerId === userId ? remaining[0]?.userId : game.ownerId;
    const winnerId = oneLeft ? remaining[0].userId : null;
    let newCurrentTurnId = game.currentTurnId;

    if (game.currentTurnId === userId) {
      newCurrentTurnId = remaining.length > 0 ? remaining[0].userId : null;
    }

    await prisma.game.update({
      where: { id: gameId },
      data: {
        status: oneLeft ? "finished" : "in_progress",
        ownerId: newOwnerId ?? game.ownerId,
        currentTurnId: newCurrentTurnId,
        winnerId: winnerId ?? undefined,
        diceValues: [],
        rollCount: 0,
      },
    });

    const updatedGame = await prisma.game.findUnique({
      where: { id: gameId },
      include: { players: { include: { user: true } } },
    });

    if (!updatedGame) {
      return NextResponse.json({ error: "Error al actualizar" }, { status: 500 });
    }

    return NextResponse.json({
      id: updatedGame.id,
      players: updatedGame.players,
      status: updatedGame.status,
      turnTimeout: updatedGame.turnTimeout,
      currentTurnId: updatedGame.currentTurnId,
      diceValues: updatedGame.diceValues,
      rollCount: updatedGame.rollCount,
    }, { status: 200 });
  } catch (error) {
    console.error("Error al salir de la partida:", error);
    return NextResponse.json(
      { error: "Error interno del servidor" },
      { status: 500 }
    );
  }
}
