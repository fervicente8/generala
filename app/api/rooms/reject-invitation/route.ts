import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);

  if (!session || !session.user) {
    return NextResponse.json({ error: "No autorizado" }, { status: 401 });
  }

  const { invitationId } = await req.json();

  try {
    // Obtener la invitación
    const invitation = await prisma.gameInvitation.findUnique({
      where: { id: invitationId },
    });

    if (!invitation || invitation.receiverId !== session.user.id) {
      return NextResponse.json({ error: "Invitación no válida" }, { status: 404 });
    }

    // Eliminar la invitación (rechazo)
    await prisma.gameInvitation.delete({
      where: { id: invitationId },
    });

    return NextResponse.json({ message: "Invitación rechazada y eliminada" }, { status: 200 });
  } catch (error) {
    console.error("Error rechazando invitación:", error);
    return NextResponse.json({ error: "Error interno" }, { status: 500 });
  }
}
