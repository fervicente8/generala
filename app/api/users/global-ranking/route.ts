import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

const DEV_USER_ID = "62bcf05f-e6fb-411c-a4ec-d3795d775795";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const limit = Math.min(parseInt(searchParams.get("limit") ?? "50", 10), 100);

  try {
    const stats = await prisma.userStats.findMany({
      where: { userId: { not: DEV_USER_ID } },
      include: {
        user: {
          select: { id: true, name: true, image: true },
        },
      },
      orderBy: [{ gamesWon: "desc" }, { averageScore: "desc" }],
      take: limit,
    });

    const ranking = stats.map((s, index) => ({
      rank: index + 1,
      user: s.user,
      gamesWon: s.gamesWon,
      gamesPlayed: s.gamesPlayed,
      totalPoints: Math.round((s.averageScore ?? 0) * s.gamesPlayed),
    }));

    return NextResponse.json(ranking);
  } catch (error) {
    console.error("Error al obtener ranking global:", error);
    return NextResponse.json(
      { error: "Error al obtener ranking" },
      { status: 500 },
    );
  }
}
