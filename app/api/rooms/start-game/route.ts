import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { roomId } = await req.json();

  try {
    const updatedRoom = await prisma.game.update({
      where: { id: roomId },
      data: { status: "in_progress" },
    });

    return NextResponse.json(updatedRoom);
  } catch (error) {
    return NextResponse.json({ error: "Error al iniciar el juego" }, { status: 500 });
  }
}
