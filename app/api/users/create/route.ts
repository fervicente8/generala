import { prisma } from "@/lib/prisma";

export async function upsertUser(userData: {
  googleId: string;
  name: string;
  email: string;
  image?: string;
}) {
  try {
    const user = await prisma.user.upsert({
      where: { googleId: userData.googleId },
      update: {},
      create: {
        googleId: userData.googleId,
        name: userData.name,
        email: userData.email,
        image: userData.image,
        stats: {
          create: {
            gamesPlayed: 0,
            gamesWon: 0,
            gamesLost: 0,
            highestScore: 0,
            generalaServed: 0,
            straights: 0,
            fullHouses: 0,
            pokers: 0,
            generalas: 0,
            averageScore: 0.0,
            winRate: 0.0,
            totalTimePlayed: 0,
            lastGameDate: null,
            elo: 0, // Elo inicial
            eloChange: 0,
          },
        },
      },
    });

    return user;
  } catch (error) {
    console.error("Error upserting user:", error);
    throw new Error("Failed to upsert user");
  }
}
