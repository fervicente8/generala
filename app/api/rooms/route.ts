import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const name = searchParams.get("name");

  try {
    const rooms = await prisma.game.findMany({
      where: name ? { name: { contains: name, mode: "insensitive" }, status: "waiting" } : {},
      include: { players: true, owner: true },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json(rooms);
  } catch (error) {
    return NextResponse.json({ error: "Error obteniendo salas" }, { status: 500 });
  }
}
