import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const session = await getServerSession(authOptions);
  
  if (!session || !session.user) {
    return NextResponse.json({ error: "No autorizado" }, { status: 401 });
  }

  try {
    const invitations = await prisma.gameInvitation.findMany({
      where: {
        receiverId: session.user.id,
      },
      include: {
        game: true,
        sender: true,
        receiver: true,
      },
    });

    return NextResponse.json(invitations, { status: 200 });
  } catch (error) {
    console.error("Error al obtener invitaciones:", error);
    return NextResponse.json({ error: "Error al obtener invitaciones" }, { status: 500 });
  }
}
