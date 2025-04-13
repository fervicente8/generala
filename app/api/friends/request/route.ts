import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session || !session.user) return NextResponse.json({ error: "No autorizado" }, { status: 401 });

  const { receiverId } = await req.json();

  try {
    const existingRequest = await prisma.userFriendship.findFirst({
      where: {
        OR: [
          { requesterId: session.user.id, receiverId },
          { requesterId: receiverId, receiverId: session.user.id },
        ],
      },
    });

    if (existingRequest) {
      return NextResponse.json({ error: "Solicitud ya existe" }, { status: 400 });
    }

    const request = await prisma.userFriendship.create({
      data: {
        requesterId: session.user.id,
        receiverId,
        status: "PENDING",
      },
      include: {
        requester: true,
        receiver: true,
      },
    });
    
    return NextResponse.json(request);
  } catch (error) {
    return NextResponse.json({ error: "Error enviando solicitud" }, { status: 500 });
  }
}

export async function PATCH(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session || !session.user)
    return NextResponse.json({ error: "No autorizado" }, { status: 401 });

  const { friendshipId, status } = await req.json();

  if (!["ACCEPTED", "REJECTED"].includes(status)) {
    return NextResponse.json({ error: "Estado inválido" }, { status: 400 });
  }

  try {
    if (status === "REJECTED") {
      const friendshipToDelete = await prisma.userFriendship.findUnique({
        where: { id: friendshipId },
        include: {
          requester: true,
          receiver: true,
        },
      });
  
      if (!friendshipToDelete) {
        return NextResponse.json({ error: "Amistad no encontrada" }, { status: 404 });
      }
  
      await prisma.userFriendship.delete({
        where: { id: friendshipId },
      });
  
      return NextResponse.json({ ...friendshipToDelete, status: "REJECTED" });
    }

    const updatedFriendship = await prisma.userFriendship.update({
      where: { id: friendshipId },
      data: { status },
      include: {
        requester: true,
        receiver: true,
      },
    });
    
    return NextResponse.json(updatedFriendship);
  } catch (error) {
    return NextResponse.json(
      { error: "Error procesando solicitud" },
      { status: 500 }
    );
  }
}

export async function DELETE(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session || !session.user)
    return NextResponse.json({ error: "No autorizado" }, { status: 401 });

  const { friendId } = await req.json();

  try {
    // Buscar primero la amistad con los datos completos
    const friendship = await prisma.userFriendship.findFirst({
      where: {
        OR: [
          { requesterId: session.user.id, receiverId: friendId },
          { requesterId: friendId, receiverId: session.user.id },
        ],
      },
      include: {
        requester: true,
        receiver: true,
      },
    });

    if (!friendship) {
      return NextResponse.json({ error: "Amistad no encontrada" }, { status: 404 });
    }

    // Eliminar la amistad
    await prisma.userFriendship.delete({
      where: { id: friendship.id },
    });

    return NextResponse.json({ ...friendship, status: "DELETED" });
  } catch (error) {
    return NextResponse.json(
      { error: "Error eliminando amigo" },
      { status: 500 }
    );
  }
}
