import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { gameUserId, category, score } = await req.json();

  if (!gameUserId || !category || typeof score !== "number") {
    return NextResponse.json({ error: "Datos incompletos" }, { status: 400 });
  }

  // 1. Actualizar el score del jugador
  const updatedPlayer = await prisma.gameUser.update({
    where: { id: gameUserId },
    data: { [category]: score },
    include: { game: { include: { players: true } } },
  });

  const game = updatedPlayer.game;

  // 2. Calcular totalScore del jugador
  const categories = [
    "ones", "twos", "threes", "fours", "fives", "sixes",
    "straight", "fullHouse", "poker", "generala", "double",
  ];

  const newTotal = categories.reduce((acc, cat) => {
    const val = (updatedPlayer as any)[cat];
    return acc + (val || 0);
  }, 0);

  await prisma.gameUser.update({
    where: { id: gameUserId },
    data: { totalScore: newTotal },
  });

  // 3. Pasar turno al siguiente jugador
  const currentIndex = game.players.findIndex(p => p.userId === game.currentTurnId);
  const nextPlayer = game.players[(currentIndex + 1) % game.players.length];

  await prisma.game.update({
    where: { id: game.id },
    data: {
      currentTurnId: nextPlayer.userId,
      rollCount: 0,
      diceValues: [],
    },
  });

  return NextResponse.json({ success: true });
}
