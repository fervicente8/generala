import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, maxPlayers, minPlayers, turnTimeout, password, ownerId } = body;

    if (!name || !ownerId) {
      return NextResponse.json(
        { error: "El nombre y el propietario son obligatorios" },
        { status: 400 }
      );
    }

    // 🔍 Verificar si el usuario ya tiene una sala en estado "waiting"
    const existingUserRoom = await prisma.game.findFirst({
      where: {
        ownerId,
        status: "waiting",
      },
    });

    if (existingUserRoom) {
      return NextResponse.json(
        { error: "Ya tienes una sala en espera. Úsala o elimínala antes de crear otra." },
        { status: 409 }
      );
    }

    const existingRoom = await prisma.game.findFirst({
      where: {
        name,
        status: "waiting",
      },
    });

    if (existingRoom) {
      return NextResponse.json(
        { error: "Ya existe una sala con ese nombre" },
        { status: 409 }
      );
    }

    // 🆕 Crear la nueva sala
    const newRoom = await prisma.game.create({
      data: {
        status: "waiting",
        name,
        maxPlayers,
        minPlayers,
        turnTimeout: turnTimeout ?? null,
        password: password || null,
        owner: { connect: { id: ownerId } },
        players: {
          create: {
            user: {
              connect: { id: ownerId },
            },
          },
        },
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

    return NextResponse.json(newRoom, { status: 201 });
  } catch (error) {
    console.error("Error al crear la sala:", error);
    return NextResponse.json({ error: "Error interno del servidor" }, { status: 500 });
  }
}
