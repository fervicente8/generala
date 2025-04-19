import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const { id } = params;
  
  if (!id) {
    return NextResponse.json({ error: "Falta el userId" }, { status: 400 });
  }

  try {
    const stats = await prisma.userStats.findUnique({
      where: {
        userId: id,
      },
    });

    if (!stats) {
      return NextResponse.json({ error: "Estadísticas no encontradas" }, { status: 404 });
    }

    return NextResponse.json(stats, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Error al obtener estadísticas" }, { status: 500 });
  }
}
