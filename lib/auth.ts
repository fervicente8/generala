import GoogleProvider from "next-auth/providers/google";
import FacebookProvider from "next-auth/providers/facebook";
import CredentialsProvider from "next-auth/providers/credentials";
import { prisma } from "@/lib/prisma";
import { upsertUser } from "./upsertUser";

const devProvider =
    process.env.DEV_MODE === "true"
        ? CredentialsProvider({
              id: "development",
              name: "Desarrollo (sin cuenta)",
              credentials: { dev: { label: "Dev", type: "text" } },
              async authorize() {
                  await upsertUser({
                      googleId: "dev-generala-local",
                      name: "Dev",
                      email: "dev@generala.local",
                  });
                  return {
                      email: "dev@generala.local",
                      name: "Dev",
                      image: undefined,
                  };
              },
          })
        : null;

export const authOptions = {
    trustHost: true, // necesario detrás del proxy de Render (cookies y redirects)
    providers: [
        ...(devProvider ? [devProvider] : []),
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID || "",
            clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
        }),
        FacebookProvider({
            clientId: process.env.FACEBOOK_CLIENT_ID || "",
            clientSecret: process.env.FACEBOOK_CLIENT_SECRET || "",
        }),
    ],
    callbacks: {
        async signIn({ user, account } : any) {
            // Desarrollo (Credentials): el usuario ya se creó en authorize; no llamar upsertUser
            if (account?.provider === "development" || user?.email === "dev@generala.local") {
                return true;
            }
            try {
                await upsertUser({
                    googleId: user.id,
                    name: user.name || "Unnamed",
                    email: user.email || "",
                    image: user.image || undefined,
                });
                return true;
            } catch (error) {
                console.error("Error saving user:", error);
                return false;
            }
        },
        async session({ session } : any) {
            if (!session.user?.email) return session;

            if (!session.user.id) {
                const dbUser = await prisma.user.findUnique({
                    where: { email: session.user.email },
                    include: {
                        stats: true,
                        games: true,
                        friendships: {
                            include: { requester: true, receiver: true },
                        },
                        friendOf: {
                            include: { requester: true, receiver: true },
                        },
                    },
                });

                if (dbUser && session.user) {
                    session.user = {
                        id: dbUser.id,
                        googleId: dbUser.googleId,
                        name: dbUser.name,
                        email: dbUser.email,
                        image: dbUser.image ?? undefined,
                        stats: dbUser.stats ?? undefined,
                        games: dbUser.games ?? [],
                        friendships: dbUser.friendships ?? [],
                        friendOf: dbUser.friendOf ?? [],
                    };
                }
            }
            return session;
        },
    },
    pages: {
        signIn: "/login",
    },
};