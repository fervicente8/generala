import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { userId, gameId, password } = body;

    if (!userId || !gameId) {
      return NextResponse.json({ error: "Faltan datos" }, { status: 400 });
    }

    // Obtener la sala con sus jugadores y el dueño
    let room = await prisma.game.findUnique({
      where: { id: gameId },
      include: {
        owner: true,
        players: { include: { user: true } },
      },
    });

    if (!room) {
      return NextResponse.json({ error: "Sala no encontrada" }, { status: 404 });
    }

    // Evitar que el dueño intente unirse a su propia sala
    if (room.ownerId === userId) {
      return NextResponse.json({ error: "No puedes unirte a tu propia sala" }, { status: 403 });
    }

    // Validar si la sala está llena
    if (room.players.length >= room.maxPlayers) {
      return NextResponse.json({ error: "La sala está llena" }, { status: 403 });
    }

    // Si la sala tiene contraseña, validarla
    if (room.password && room.password !== password) {
      return NextResponse.json({ error: "Contraseña incorrecta" }, { status: 401 });
    }

    // Verificar si el usuario ya está en la sala
    const alreadyJoined = room.players.some((p) => p.user.id === userId);
    if (alreadyJoined) {
      return NextResponse.json({ error: "Ya estás en la sala" }, { status: 409 });
    }

    // Agregar al usuario a la sala
    await prisma.gameUser.create({
      data: {
        userId,
        gameId,
      },
    });

    // Obtener la sala nuevamente con los datos actualizados
    room = await prisma.game.findUnique({
      where: { id: gameId },
      include: {
        owner: true,
        players: { include: { user: true } },
      },
    });

    return NextResponse.json(room, { status: 200 });
  } catch (error) {
    console.error("Error al unirse a la sala:", error);
    return NextResponse.json({ error: "Error interno del servidor" }, { status: 500 });
  }
}
