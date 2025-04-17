import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: NextRequest) {
  const { roomId, playerId } = await req.json();
  
  try {
    // Eliminar al jugador específico del GameUser
    await prisma.gameUser.deleteMany({
      where: {
        gameId: roomId,
        userId: playerId,
      },
    });

    const room = await prisma.game.findUnique({
      where: { id: roomId },
      include: {
        players: {
          include: { user: true },
        },
        owner: true,
      },
    });

    if (!room) {
      return NextResponse.json({ error: "Sala no encontrada" }, { status: 404 });
    }

    if (room.ownerId === playerId) {
      return NextResponse.json({ error: "No puedes expulsar al dueño de la sala" }, { status: 403 });
    }

    return NextResponse.json(room);
  } catch (error) {
    console.error("Error al expulsar jugador:", error);
    return NextResponse.json({ error: "Error al expulsar jugador" }, { status: 500 });
  }
}
