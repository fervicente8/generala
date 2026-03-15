import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { ACHIEVEMENTS, type StatsForAchievements } from "@/lib/achievements";

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    return NextResponse.json({ error: "No autorizado" }, { status: 401 });
  }

  try {
    const [stats, unlockedRecords] = await Promise.all([
      prisma.userStats.findUnique({ where: { userId: session.user.id } }),
      prisma.userAchievement.findMany({
        where: { userId: session.user.id },
        select: { achievementId: true, unlockedAt: true },
      }),
    ]);

    const statsForCheck: StatsForAchievements = stats
      ? {
          gamesPlayed: stats.gamesPlayed,
          gamesWon: stats.gamesWon,
          gamesLost: stats.gamesLost,
          currentWinStreak: stats.currentWinStreak,
          maxWinStreak: stats.maxWinStreak,
          highestScore: stats.highestScore,
          generalaServed: stats.generalaServed,
          doubleGeneralas: stats.doubleGeneralas ?? 0,
          straights: stats.straights,
          fullHouses: stats.fullHouses,
          pokers: stats.pokers,
          generalas: stats.generalas,
        }
      : {
          gamesPlayed: 0,
          gamesWon: 0,
          gamesLost: 0,
          highestScore: 0,
          generalaServed: 0,
          straights: 0,
          fullHouses: 0,
          pokers: 0,
          generalas: 0,
        };

    const unlockedMap = new Map(
      unlockedRecords.map((r) => [r.achievementId, r.unlockedAt.toISOString()]),
    );

    const list = ACHIEVEMENTS.map((a) => {
      const unlockedAt = unlockedMap.get(a.id) ?? null;
      const progress = a.progress?.(statsForCheck);
      return {
        id: a.id,
        name: a.name,
        description: a.description,
        unlockedAt,
        progress: progress
          ? { current: progress.current, target: progress.target }
          : null,
      };
    });

    return NextResponse.json(list);
  } catch (error) {
    console.error("Error al obtener logros:", error);
    return NextResponse.json(
      { error: "Error al obtener logros" },
      { status: 500 },
    );
  }
}
