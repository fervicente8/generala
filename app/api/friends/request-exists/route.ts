import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session || !session.user) {
    return NextResponse.json({ error: "No autorizado" }, { status: 401 });
  }

  const receiverId = req.nextUrl.searchParams.get("receiverId");

  if (!receiverId) {
    return NextResponse.json({ error: "Falta receiverId" }, { status: 400 });
  }

  try {
    const request = await prisma.userFriendship.findFirst({
      where: {
        requesterId: session.user.id,
        receiverId: receiverId,
        status: "PENDING",
      },
    });

    return NextResponse.json({ exists: !!request });
  } catch (error) {
    return NextResponse.json({ error: "Error al verificar solicitud" }, { status: 500 });
  }
}
