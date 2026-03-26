import type { PrismaClient } from "@/lib/generated/prisma";
import {
  getUnlockedAchievementIds,
  getAchievementById,
} from "@/lib/achievements";

export const SCORE_CATEGORY_KEYS = [
  "ones",
  "twos",
  "threes",
  "fours",
  "fives",
  "sixes",
  "straight",
  "fullHouse",
  "poker",
  "generala",
  "double",
] as const;

export type ScoreCategoryKey = (typeof SCORE_CATEGORY_KEYS)[number];

export type CompleteTurnScoreResult = {
  currentTurnId: string | null;
  updatedValues: Awaited<ReturnType<PrismaClient["gameUser"]["update"]>>;
  finished: boolean;
  newlyUnlocked: { id: string; name: string; description: string }[];
  turnStartedAt: string | null;
};

/**
 * Escribe categoría + puntaje, avanza turno, stats al terminar partida y logros.
 * No valida sesión ni tiempo: lo hace la ruta API.
 */
export async function completeTurnScore(
  prisma: PrismaClient,
  opts: {
    gameUserId: string;
    gameId: string;
    category: ScoreCategoryKey;
    score: number;
    requestingUserId: string | null;
  },
): Promise<CompleteTurnScoreResult> {
  const { gameUserId, gameId, category, score, requestingUserId } = opts;

  const updatedPlayer = await prisma.gameUser.update({
    where: { userId_gameId: { userId: gameUserId, gameId } },
    data: { [category]: score },
  });

  const game = await prisma.game.findUnique({
    where: { id: gameId },
    include: { players: true },
  });

  if (!game) {
    throw new Error("Juego no encontrado");
  }

  const newTotal = SCORE_CATEGORY_KEYS.reduce((acc, cat) => {
    const val = (updatedPlayer as Record<string, unknown>)[cat];
    return acc + (typeof val === "number" ? val : 0);
  }, 0);

  const updatedPlayerWithTotal = await prisma.gameUser.update({
    where: { userId_gameId: { userId: gameUserId, gameId } },
    data: { totalScore: newTotal },
  });

  const allPlayers = await prisma.gameUser.findMany({ where: { gameId } });

  const allFinished = allPlayers.every((player) =>
    SCORE_CATEGORY_KEYS.every((cat) => {
      const v = (player as Record<string, unknown>)[cat];
      return v !== null && v !== undefined;
    }),
  );

  let winners: typeof allPlayers = [];
  if (allFinished) {
    const highestScore = Math.max(...allPlayers.map((p) => p.totalScore ?? 0));
    winners = allPlayers.filter((p) => p.totalScore === highestScore);

    for (const player of allPlayers) {
      const stats = await prisma.userStats.findUnique({
        where: { userId: player.userId },
      });
      if (!stats) continue;

      const isWinner = winners.some((w) => w.userId === player.userId);
      const totalGames = stats.gamesPlayed + 1;
      const currentStreak = stats.currentWinStreak ?? 0;
      const newStreak = isWinner ? currentStreak + 1 : 0;
      const maxStreak = Math.max(stats.maxWinStreak ?? 0, newStreak);

      await prisma.userStats.update({
        where: { userId: player.userId },
        data: {
          gamesPlayed: totalGames,
          gamesWon: stats.gamesWon + (isWinner ? 1 : 0),
          gamesLost: stats.gamesLost + (isWinner ? 0 : 1),
          currentWinStreak: newStreak,
          maxWinStreak: maxStreak,
          highestScore: Math.max(stats.highestScore, player.totalScore ?? 0),
          averageScore: Math.round(
            ((stats.averageScore * stats.gamesPlayed) +
              (player.totalScore ?? 0)) /
              totalGames,
          ),
          winRate: Math.round(
            ((stats.gamesWon + (isWinner ? 1 : 0)) / totalGames) * 100,
          ),
          lastGameDate: new Date().toISOString(),
          straights: stats.straights + ((player.straight ?? 0) > 0 ? 1 : 0),
          fullHouses: stats.fullHouses + ((player.fullHouse ?? 0) > 0 ? 1 : 0),
          pokers: stats.pokers + ((player.poker ?? 0) > 0 ? 1 : 0),
          generalas:
            stats.generalas +
            ((player.generala ?? 0) > 0 ? 1 : 0) +
            ((player.double ?? 0) > 0 ? 1 : 0),
          generalaServed:
            stats.generalaServed + (player.generala === 100 ? 1 : 0),
          doubleGeneralas:
            stats.doubleGeneralas + ((player.double ?? 0) === 100 ? 1 : 0),
        },
      });
    }
  }

  const winnerUserId =
    allFinished && winners.length > 0 ? winners[0].userId : null;

  const nextTurnId = allFinished
    ? null
    : game.players[
        (game.players.findIndex((p) => p.userId === game.currentTurnId) + 1) %
          game.players.length
      ].userId;

  const now = new Date();
  const updatedGame = await prisma.game.update({
    where: { id: game.id },
    data: {
      currentTurnId: nextTurnId,
      rollCount: 0,
      diceValues: [],
      status: allFinished ? "finished" : game.status,
      winnerId: winnerUserId,
      turnStartedAt: allFinished ? null : now,
    },
  });

  const newlyUnlocked: { id: string; name: string; description: string }[] =
    [];
  if (allFinished && requestingUserId) {
    for (const player of allPlayers) {
      const stats = await prisma.userStats.findUnique({
        where: { userId: player.userId },
      });
      if (!stats) continue;
      const unlockedIds = getUnlockedAchievementIds({
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
      });
      const existing = await prisma.userAchievement.findMany({
        where: { userId: player.userId },
        select: { achievementId: true },
      });
      const existingIds = new Set(existing.map((e) => e.achievementId));
      const toInsert = unlockedIds.filter((id) => !existingIds.has(id));
      for (const achievementId of toInsert) {
        await prisma.userAchievement.create({
          data: { userId: player.userId, achievementId },
        });
        if (player.userId === requestingUserId) {
          const a = getAchievementById(achievementId);
          if (a)
            newlyUnlocked.push({
              id: a.id,
              name: a.name,
              description: a.description,
            });
        }
      }
    }
  }

  return {
    currentTurnId: updatedGame.currentTurnId,
    updatedValues: updatedPlayerWithTotal,
    finished: allFinished,
    newlyUnlocked,
    turnStartedAt: updatedGame.turnStartedAt?.toISOString() ?? null,
  };
}
