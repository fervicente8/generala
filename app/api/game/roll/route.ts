import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: NextRequest) {
  const { gameId, dicesToReroll } = await req.json(); // Agregar los dados a re-lanzar

  const game = await prisma.game.findUnique({
    where: { id: gameId },
    include: { players: true },
  });

  if (!game) return NextResponse.json({ error: "Juego no encontrado" }, { status: 404 });

  if (game.rollCount >= 3) {
    return NextResponse.json({ error: "Ya se tiraron los dados 3 veces" }, { status: 400 });
  }

  // Copiar el array de los dados actuales para no modificar el original
  let newDice = [...game.diceValues];

  // Si hay dados a re-lanzar, modificamos solo esos
  if (dicesToReroll?.length > 0) {
    dicesToReroll.forEach((index: number) => {
      newDice[index] = Math.floor(Math.random() * 6) + 1;
    });
  } else {
    // Si no hay dados específicos, lanzamos todos
    newDice = Array.from({ length: 5 }, () => Math.floor(Math.random() * 6) + 1);
  }

  const newRollCount = game.rollCount + 1;

  const updated = await prisma.game.update({
    where: { id: gameId },
    data: {
      diceValues: newDice,
      rollCount: newRollCount,
    },
  });

  return NextResponse.json(updated);
}
