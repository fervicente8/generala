// /api/rooms/invite.ts
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import {prisma} from "@/lib/prisma";

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session || !session.user) {
    return NextResponse.json({ error: "No autorizado" }, { status: 401 });
  }

  const { roomId, userId } = await req.json();

  try {
    // Verifica si la sala existe
    const room = await prisma.game.findUnique({
      where: { id: roomId },
      include: {
        players: true, // Incluimos los jugadores en la consulta
      },
    });

    if (!room) {
      return NextResponse.json({ error: "Sala no encontrada" }, { status: 404 });
    }

    // Verifica si el usuario ya está en la sala
    const userInRoom = room.players.find((player) => player.userId === userId);
    if (userInRoom) {
      return NextResponse.json({ error: "El usuario ya está en la sala" }, { status: 400 });
    }

    // Verifica si la sala no ha alcanzado el límite de jugadores
    if (room.players.length >= room.maxPlayers) {
      return NextResponse.json({ error: "La sala está llena" }, { status: 400 });
    }

    // Agregar al usuario a la sala
    await prisma.gameUser.create({
      data: {
        gameId: roomId,
        userId,
      },
    });

    // Emitir un evento de WebSocket para notificar a los demás usuarios que un nuevo usuario ha sido invitado
    // socket.emit("userInvited", { roomId, userId });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Error procesando la invitación" }, { status: 500 });
  }
}
