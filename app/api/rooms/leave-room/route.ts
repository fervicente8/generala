import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { userId, gameId } = body;

    if (!userId || !gameId) {
      return NextResponse.json({ error: "Faltan datos" }, { status: 400 });
    }

    // Obtener la sala
    const room = await prisma.game.findUnique({
      where: { id: gameId },
      include: { players: true, owner: true },
    });

    if (!room) {
      return NextResponse.json({ error: "Sala no encontrada" }, { status: 404 });
    }

    // Si el usuario es el dueño, eliminar la sala
    if (room.ownerId === userId) {
      await prisma.game.delete({ where: { id: gameId } });
      return NextResponse.json({ message: "Sala eliminada" }, { status: 200 });
    }

    // Verificar si el usuario está en la sala
    const isPlayerInRoom = room.players.some((p) => p.userId === userId);
    if (!isPlayerInRoom) {
      return NextResponse.json({ error: "No estás en esta sala" }, { status: 403 });
    }

    // Eliminar al jugador de la sala
    await prisma.gameUser.deleteMany({
      where: { gameId, userId },
    });

    // Obtener la sala actualizada (con jugadores y dueño)
    const updatedRoom = await prisma.game.findUnique({
      where: { id: gameId },
      include: {
        owner: true,
        players: { include: { user: true } },
      },
    });

    return NextResponse.json(updatedRoom, { status: 200 });
  } catch (error) {
    console.error("Error al salir de la sala:", error);
    return NextResponse.json({ error: "Error interno del servidor" }, { status: 500 });
  }
}
