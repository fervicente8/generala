import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { roomId } = await req.json();

  try {
    // Traer la sala con los jugadores
    const game = await prisma.game.findUnique({
      where: { id: roomId },
      include: {
        players: {
          include: {
            user: true,
          },
        },
      },
    });

    if (!game || game.players.length === 0) {
      return NextResponse.json({ error: "Juego no encontrado o sin jugadores" }, { status: 404 });
    }

    // Elegir un jugador aleatoriamente
    const randomIndex = Math.floor(Math.random() * game.players.length);
    const firstTurnUserId = game.players[randomIndex].userId;

    // Actualizar el estado del juego y asignar currentTurnId
    const updatedRoom = await prisma.game.update({
      where: { id: roomId },
      data: {
        status: "in_progress",
        currentTurnId: firstTurnUserId,
      },
      include: {
        players: {
          include: {
            user: true,
          },
        },
      },
    });

    return NextResponse.json(updatedRoom);
  } catch (error) {
    return NextResponse.json({ error: "Error al iniciar el juego" }, { status: 500 });
  }
}
