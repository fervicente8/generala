import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function DELETE(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const roomId = searchParams.get("roomId");

    if (!roomId) {
      return NextResponse.json(
        { error: "Se requiere el ID de la sala" },
        { status: 400 }
      );
    }

    // Verificar si la sala existe y obtener los jugadores y propietario
    const existingRoom = await prisma.game.findUnique({
      where: { id: roomId },
      include: {
        players: true,
        owner: true,
      },
    });

    if (!existingRoom) {
      return NextResponse.json(
        { error: "La sala no existe" },
        { status: 404 }
      );
    }

    // Eliminar jugadores relacionados
    await prisma.gameUser.deleteMany({
      where: { gameId: roomId },
    });

    // Eliminar invitaciones relacionadas
    await prisma.gameInvitation.deleteMany({
      where: { gameId: roomId },
    });

    // Eliminar la sala
    const deletedRoom = await prisma.game.delete({
      where: { id: roomId },
      include: {
        players: true,
        owner: true,
      },
    });

    return NextResponse.json(deletedRoom, { status: 200 });
  } catch (error) {
    console.error("Error eliminando la sala:", error);
    return NextResponse.json(
      { error: "Error interno del servidor" },
      { status: 500 }
    );
  }
}
