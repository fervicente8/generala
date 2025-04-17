import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const gameId = params.id;
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
  
    if (!isUserInGame) {
      return NextResponse.json({ error: "No estas en esta sala" }, { status: 403 });
    }

    return NextResponse.json({
      id: game.id,
      players: game.players.map((p) => p),
      status: game.status,
      turnTimeout: game.turnTimeout,
      currentTurnId: game.currentTurnId,
      diceValues: game.diceValues,
      rollCount: game.rollCount,
    });
  } catch (error) {
    console.error("Error al obtener el juego:", error);
    return NextResponse.json({ error: "Error interno del servidor" }, { status: 500 });
  }
}
