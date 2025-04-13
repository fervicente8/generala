import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session || !session.user)
    return NextResponse.json({ error: "No autorizado" }, { status: 401 });

  try {
    const outgoingRequests = await prisma.userFriendship.findMany({
      where: {
        requesterId: session.user.id,
        status: "PENDING",
      },
      include: {
        receiver: true,
      },
    });

    return NextResponse.json(outgoingRequests);
  } catch (err) {
    return NextResponse.json({ error: "Error al obtener solicitudes" }, { status: 500 });
  }
}
