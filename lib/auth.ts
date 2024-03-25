import { PrismaAdapter } from '@auth/prisma-adapter';
import { Adapter } from 'next-auth/adapters';
import GoogleProvider from 'next-auth/providers/google';

import { AuthOptions, DefaultSession, getServerSession } from 'next-auth';
import db from './db';

declare module 'next-auth' {
    interface Session extends DefaultSession {
        user: {
            id: string;
        } & DefaultSession['user'];
    }
}

export const authConfig = {
    adapter: PrismaAdapter(db) as Adapter,
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
        }),
    ],
    session: {
        strategy: 'jwt',
    },
    callbacks: {
        async jwt({ token, user }) {
            const dbUser = await db.user.findFirst({
                where: {
                    email: token.email,
                },
            });
            if (!dbUser) {
                throw new Error('No user with email found');
            }

            return {
                id: dbUser.id,
                name: dbUser.name,
                image: dbUser.image,
                email: dbUser.email,
            };
        },
        async session({ token, session }) {
            if (token) {
                session.user = {
                    id: token.id as string,
                    name: token.name,
                    email: token.email,
                    image: token.picture,
                };
            }

            return session;
        },
    },
} satisfies AuthOptions;

export function getSession() {
    return getServerSession(authConfig);
}
