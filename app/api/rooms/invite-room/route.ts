// /api/rooms/invite.ts
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { prisma } from "@/lib/prisma";

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
        players: true,
      },
    });

    if (!room) {
      return NextResponse.json({ error: "Sala no encontrada" }, { status: 404 });
    }

    // Verifica si ya existe una invitación pendiente para ese usuario en esa sala
    const existingInvitation = await prisma.gameInvitation.findUnique({
      where: {
        gameId_receiverId: {
          gameId: roomId,
          receiverId: userId,
        },
      },
    });

    if (existingInvitation) {
      return NextResponse.json(
        { error: "El usuario ya fue invitado a esta sala" },
        { status: 400 }
      );
    }

    // Verifica si el usuario ya es un jugador de la sala
    const isPlayerInRoom = room.players.some((p) => p.userId === userId);
    
    if (isPlayerInRoom) {
      return NextResponse.json({ error: "El usuario ya es un jugador de la sala" }, { status: 400 });
    }

    // Crear la invitación
    const invitation = await prisma.gameInvitation.create({
      data: {
        gameId: roomId,
        senderId: session.user.id,
        receiverId: userId,
      },
      include: {
        receiver: {
          select: {
            id: true,
            name: true,
            image: true,
          },
        },
        sender: {
          select: {
            id: true,
            name: true,
            image: true,
          },
        },
        game: {
          select: {
            id: true,
            name: true,
            invitations: {
              select: {
                id: true,
                receiverId: true,
              },
            },
          },
        },
      },
    });

    return NextResponse.json(invitation, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: "Error creando la invitación" }, { status: 500 });
  }
}
