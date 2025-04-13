import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { NextResponse } from "next/server";

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session || !session.user) return NextResponse.json({ error: "No autorizado" }, { status: 401 });

  try {
    const friends = await prisma.userFriendship.findMany({
      where: {
        OR: [
          { requesterId: session.user.id, status: "ACCEPTED" },
          { receiverId: session.user.id, status: "ACCEPTED" },
        ],
      },
      include: {
        requester: true,
        receiver: true,
      },
    });

    return NextResponse.json(friends);
  } catch (error) {
    return NextResponse.json({ error: "Error obteniendo amigos" }, { status: 500 });
  }
}
