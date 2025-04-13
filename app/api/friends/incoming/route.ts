import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session || !session.user)
    return NextResponse.json({ error: "No autorizado" }, { status: 401 });

  try {
    const incomingRequests = await prisma.userFriendship.findMany({
      where: {
        receiverId: session.user.id,
        status: "PENDING",
      },
      include: {
        requester: true,
      },
    });

    return NextResponse.json(incomingRequests);
  } catch (err) {
    return NextResponse.json({ error: "Error al obtener solicitudes" }, { status: 500 });
  }
}
