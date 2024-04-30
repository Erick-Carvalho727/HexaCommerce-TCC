import NextAuth, { type DefaultSession } from 'next-auth'
import { PrismaAdapter } from '@auth/prisma-adapter'
import authConfig from './auth.config'
import { db } from './lib/db'

declare module 'next-auth' {
  interface Session {
    user: {
      nameCompany?: string | null
    } & DefaultSession['user']
  }
}

export const { auth, handlers, signIn, signOut } = NextAuth({
  callbacks: {
    async session({ token, session }) {
      if (token.sub && session.user) {
        session.user.id = token.sub
      }

      const user = await db.user.findUnique({
        where: { id: session.user.id },
      })

      if (user) {
        session.user.nameCompany = user.nameCompany
      }

      return session
    },
    async jwt({ token }) {
      return token
    },
  },
  adapter: PrismaAdapter(db),
  session: { strategy: 'jwt', maxAge: 1 * 60 * 60 },
  ...authConfig,
})
