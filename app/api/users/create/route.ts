import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: NextRequest) {
  try {
    const userData = await req.json();

    const user = await prisma.user.upsert({
      where: { googleId: userData.googleId },
      update: {},
      create: {
        googleId: userData.googleId,
        name: userData.name,
        email: userData.email,
        image: userData.image,
        stats: {
          create: {
            gamesPlayed: 0,
            gamesWon: 0,
            gamesLost: 0,
            highestScore: 0,
            generalaServed: 0,
            straights: 0,
            fullHouses: 0,
            pokers: 0,
            generalas: 0,
            averageScore: 0.0,
            winRate: 0.0,
            totalTimePlayed: 0,
            lastGameDate: null,
            elo: 0,
            eloChange: 0,
          },
        },
      },
    });

    return NextResponse.json(user);
  } catch (error) {
    console.error("Error al crear o actualizar usuario:", error);
    return NextResponse.json({ error: "No se pudo crear o actualizar el usuario" }, { status: 500 });
  }
}
