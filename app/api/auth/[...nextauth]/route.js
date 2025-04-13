import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import FacebookProvider from "next-auth/providers/facebook";
import { prisma } from "@/lib/prisma";
import { upsertUser } from "@/app/api/users/create/route";

export const authOptions = {
    providers: [
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
        async signIn({ user }) {
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
        async session({ session }) {
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
        }
    },
    pages: {
        signIn: "/login",
    },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };