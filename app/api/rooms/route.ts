import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const name = searchParams.get("name");

  try {
    const rooms = await prisma.game.findMany({
      where: name ? { name: { contains: name, mode: "insensitive" } } : {},
      include: { players: true, owner: true },
    });

    return NextResponse.json(rooms);
  } catch (error) {
    return NextResponse.json({ error: "Error obteniendo salas" }, { status: 500 });
  }
}
