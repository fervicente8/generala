import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const userId = searchParams.get("userId");
  const otherId = searchParams.get("otherId");

  if (!userId || !otherId) {
    return NextResponse.json(
      { error: "Faltan userId y/o otherId" },
      { status: 400 }
    );
  }

  try {
    const existingFriendship = await prisma.userFriendship.findFirst({
      where: {
        OR: [
          {
            requesterId: userId,
            receiverId: otherId,
          },
          {
            requesterId: otherId,
            receiverId: userId,
          },
        ],
        status: "ACCEPTED",
      },
    });

    return NextResponse.json({ isFriend: !!existingFriendship });
  } catch (error) {
    console.error("Error verificando amistad:", error);
    return NextResponse.json(
      { error: "Error del servidor" },
      { status: 500 }
    );
  }
}
