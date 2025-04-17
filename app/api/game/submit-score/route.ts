import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { gameUserId, gameId, category, score } = await req.json();

  if (!gameUserId || !category || typeof score !== "number") {
    return NextResponse.json({ error: "Datos incompletos" }, { status: 400 });
  }

  // 1. Actualizar la categoría del jugador
  const updatedPlayer = await prisma.gameUser.update({
    where: { userId_gameId: { userId: gameUserId, gameId: gameId } },
    data: { [category]: score },
  });

  if (!updatedPlayer) {
    return NextResponse.json({ error: "Jugador no encontrado" }, { status: 404 });
  }

  // 2. Obtener el juego
  const game = await prisma.game.findUnique({
    where: { id: gameId },
    include: { players: true },
  });

  if (!game) {
    return NextResponse.json({ error: "Juego no encontrado" }, { status: 404 });
  }

  // 3. Calcular totalScore
  const categories = [
    "ones", "twos", "threes", "fours", "fives", "sixes",
    "straight", "fullHouse", "poker", "generala", "double",
  ];

  const newTotal = categories.reduce((acc, cat) => {
    const val = (updatedPlayer as any)[cat];
    return acc + (val || 0);
  }, 0);

  const updatedPlayerWithTotal = await prisma.gameUser.update({
    where: { userId_gameId: { userId: gameUserId, gameId: gameId } },
    data: { totalScore: newTotal },
  });

  // 4. Verificar si todos terminaron
  const allPlayers = await prisma.gameUser.findMany({ where: { gameId } });

  const allFinished = allPlayers.every(player =>
    categories.every(cat => (player as any)[cat] !== null && (player as any)[cat] !== undefined)
  );

  if (allFinished) {
    // Determinar ganadores
    const highestScore = Math.max(...allPlayers.map(p => p.totalScore ?? 0));
    const winners = allPlayers.filter(p => p.totalScore === highestScore);

    for (const player of allPlayers) {
      const stats = await prisma.userStats.findUnique({ where: { userId: player.userId } });
      if (!stats) continue;

      const isWinner = winners.some(w => w.userId === player.userId);
      const totalGames = stats.gamesPlayed + 1;

      await prisma.userStats.update({
        where: { userId: player.userId },
        data: {
          gamesPlayed: totalGames,
          gamesWon: stats.gamesWon + (isWinner ? 1 : 0),
          gamesLost: stats.gamesLost + (isWinner ? 0 : 1),
          highestScore: Math.max(stats.highestScore, player.totalScore ?? 0),
          averageScore: Math.round(((stats.averageScore * stats.gamesPlayed) + (player.totalScore ?? 0)) / totalGames),
          winRate: Math.round(((stats.gamesWon + (isWinner ? 1 : 0)) / totalGames) * 100),
          lastGameDate: new Date().toISOString(),
          straights: stats.straights + ((player.straight ?? 0) > 0 ? 1 : 0),
          fullHouses: stats.fullHouses + ((player.fullHouse ?? 0) > 0 ? 1 : 0),
          pokers: stats.pokers + ((player.poker ?? 0) > 0 ? 1 : 0),
          generalas: stats.generalas + ((player.generala ?? 0) > 0 ? 1 : 0),
          generalaServed: stats.generalaServed + (player.generala === 100 ? 1 : 0),
        },
      });
    }
  }

  // 5. Actualizar juego
  const updatedGame = await prisma.game.update({
    where: { id: game.id },
    data: {
      currentTurnId: allFinished
        ? null
        : game.players[(game.players.findIndex(p => p.userId === game.currentTurnId) + 1) % game.players.length].userId,
      rollCount: 0,
      diceValues: [],
      status: allFinished ? "finished" : game.status,
    },
  });

  return NextResponse.json({
    currentTurnId: updatedGame.currentTurnId,
    updatedValues: updatedPlayerWithTotal,
    finished: allFinished,
  });
}
