import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ userId: string }> },
) {
  const userId = (await params).userId;
  const { searchParams } = new URL(req.url);
  const limit = Math.min(parseInt(searchParams.get("limit") ?? "20", 10), 50);

  if (!userId) {
    return NextResponse.json({ error: "Falta userId" }, { status: 400 });
  }

  try {
    const games = await prisma.game.findMany({
      where: {
        status: "finished",
        players: { some: { userId } },
      },
      include: {
        players: {
          include: { user: { select: { id: true, name: true, image: true } } },
        },
      },
      orderBy: { createdAt: "desc" },
      take: limit,
    });

    const history = games.map((game) => {
      const players = game.players
        .map((p) => ({
          userId: p.userId,
          name: p.user.name,
          totalScore: p.totalScore ?? 0,
        }))
        .sort((a, b) => b.totalScore - a.totalScore);
      const position = players.findIndex((p) => p.userId === userId) + 1;
      const myPlayer = game.players.find((p) => p.userId === userId);
      return {
        gameId: game.id,
        createdAt: game.createdAt,
        players,
        winnerId: game.winnerId,
        myScore: myPlayer?.totalScore ?? 0,
        position,
      };
    });

    return NextResponse.json(history);
  } catch (error) {
    console.error("Error al obtener historial:", error);
    return NextResponse.json(
      { error: "Error al obtener historial" },
      { status: 500 },
    );
  }
}
