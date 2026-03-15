import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    return NextResponse.json({ error: "No autorizado" }, { status: 401 });
  }

  try {
    const friendships = await prisma.userFriendship.findMany({
      where: {
        status: "ACCEPTED",
        OR: [
          { requesterId: session.user.id },
          { receiverId: session.user.id },
        ],
      },
      include: {
        requester: { include: { stats: true } },
        receiver: { include: { stats: true } },
      },
    });

    const friendUsers = friendships.map((f) =>
      f.requesterId === session.user!.id ? f.receiver : f.requester,
    );

    const withStats = friendUsers
      .filter((u) => u.stats)
      .map((u) => ({
        user: {
          id: u.id,
          name: u.name,
          image: u.image,
        },
        stats: u.stats!,
      }))
      .sort(
        (a, b) =>
          (b.stats?.gamesWon ?? 0) - (a.stats?.gamesWon ?? 0) ||
          (b.stats?.averageScore ?? 0) - (a.stats?.averageScore ?? 0),
      );

    const ranking = withStats.map((item, index) => ({
      rank: index + 1,
      user: item.user,
      gamesWon: item.stats.gamesWon,
      gamesPlayed: item.stats.gamesPlayed,
      totalPoints: Math.round(
        (item.stats.averageScore ?? 0) * item.stats.gamesPlayed,
      ),
    }));

    return NextResponse.json(ranking);
  } catch (error) {
    console.error("Error al obtener ranking de amigos:", error);
    return NextResponse.json(
      { error: "Error al obtener ranking" },
      { status: 500 },
    );
  }
}
