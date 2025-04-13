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
        players: true, // Incluir jugadores
        owner: true, // Incluir propietario
      },
    });

    if (!existingRoom) {
      return NextResponse.json(
        { error: "La sala no existe" },
        { status: 404 }
      );
    }

    // Eliminar jugadores relacionados en GameUser antes de eliminar la sala
    await prisma.gameUser.deleteMany({
      where: { gameId: roomId },
    });

    // Eliminar la sala
    const deletedRoom = await prisma.game.delete({
      where: { id: roomId },
      include: {
        players: true, // Incluir jugadores después de eliminar la sala
        owner: true,   // Incluir propietario después de eliminar la sala
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
