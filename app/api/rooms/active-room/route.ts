import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get("userId");
    
    if (!userId) {
      return NextResponse.json({ error: "Falta el ID del usuario" }, { status: 400 });
    }

    const activeRoom = await prisma.game.findFirst({
      where: {
        OR: [
          { ownerId: userId }, 
          { players: { some: { userId } } }, 
        ],
      },
      include: {
        owner: true, 
        players: {
          include: {
            user: true, 
          },
        },
      },
    });
    
    return NextResponse.json(activeRoom || null, { status: 200 });
  } catch (error) {
    console.error("Error al obtener la sala activa:", error);
    return NextResponse.json({ error: "Error interno del servidor" }, { status: 500 });
  }
}
