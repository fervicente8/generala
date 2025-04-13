import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);

  if (!session || !session.user) {
    return NextResponse.json({ error: "No autorizado" }, { status: 401 });
  }

  const { invitationId } = await req.json();

  try {
    // Obtener la invitación
    const invitation = await prisma.gameInvitation.findUnique({
      where: { id: invitationId },
    });

    if (!invitation || invitation.receiverId !== session.user.id) {
      return NextResponse.json({ error: "Invitación no válida" }, { status: 404 });
    }

    // Obtener la sala para verificar el límite de jugadores
    const game = await prisma.game.findUnique({
      where: { id: invitation.gameId },
      include: {
        players: { include: { user: true } },
      },
    });

    // Eliminar la invitación, pase lo que pase
    await prisma.gameInvitation.delete({
      where: { id: invitationId },
    });

    if (!game) {
      return NextResponse.json({ error: "La sala no existe" }, { status: 404 });
    }

    if (game.players.length >= game.maxPlayers) {
      return NextResponse.json({ error: "La sala ya está completa" }, { status: 400 });
    }

    // Agregar al usuario al juego
    await prisma.gameUser.create({
      data: {
        gameId: invitation.gameId,
        userId: session.user.id,
      },
    });

    // Retornar la sala actualizada
    const updatedRoom = await prisma.game.findUnique({
      where: { id: invitation.gameId },
      include: {
        owner: true,
        players: { include: { user: true } },
      },
    });

    return NextResponse.json(updatedRoom, { status: 200 });
  } catch (error) {
    console.error("Error aceptando invitación:", error);
    return NextResponse.json({ error: "Error interno" }, { status: 500 });
  }
}
