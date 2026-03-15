import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const id = (await params).id;
  const { searchParams } = new URL(req.url);
  const viewerId = searchParams.get("viewerId") ?? undefined;

  if (!id) {
    return NextResponse.json({ error: "Falta el userId" }, { status: 400 });
  }

  try {
    const stats = await prisma.userStats.findUnique({
      where: { userId: id },
    });

    if (!stats) {
      return NextResponse.json({ error: "Estadísticas no encontradas" }, { status: 404 });
    }

    let headToHead: { gamesAgainst: number; myWins: number; theirWins: number } | null = null;
    let streak = 0;

    const finishedGamesWithPlayers = await prisma.game.findMany({
      where: {
        status: "finished",
        players: { some: { userId: id } },
      },
      include: {
        players: { select: { userId: true, totalScore: true } },
      },
      orderBy: { createdAt: "desc" },
    });

    for (const game of finishedGamesWithPlayers) {
      const winnerId =
        game.winnerId ??
        (game.players.length > 0
          ? game.players.reduce((a, b) =>
              (a.totalScore ?? 0) >= (b.totalScore ?? 0) ? a : b,
            ).userId
          : null);

      if (winnerId === id) streak++;
      else break;
    }

    if (viewerId && viewerId !== id) {
      const sharedGames = finishedGamesWithPlayers.filter((g) =>
        g.players.some((p) => p.userId === viewerId),
      );
      let myWins = 0;
      let theirWins = 0;
      for (const game of sharedGames) {
        const winnerId =
          game.winnerId ??
          (game.players.length > 0
            ? game.players.reduce((a, b) =>
                (a.totalScore ?? 0) >= (b.totalScore ?? 0) ? a : b,
              ).userId
            : null);
        if (winnerId === viewerId) myWins++;
        else if (winnerId === id) theirWins++;
      }
      headToHead = {
        gamesAgainst: sharedGames.length,
        myWins,
        theirWins,
      };
    }

    return NextResponse.json(
      { ...stats, headToHead, streak },
      { status: 200 },
    );
  } catch (error) {
    return NextResponse.json({ error: "Error al obtener estadísticas" }, { status: 500 });
  }
}
