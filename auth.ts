import NextAuth, { type DefaultSession } from 'next-auth'
import { PrismaAdapter } from '@auth/prisma-adapter'
import authConfig from './auth.config'
import { db } from './lib/db'
import { getUserById } from './data/user'

declare module 'next-auth' {
  interface Session {
    user: {
      nameCompany?: string | null
      canais?: string[] | null
    } & DefaultSession['user']
  }
}

export const { auth, handlers, signIn, signOut } = NextAuth({
  callbacks: {
    async signIn({ user }) {
      const existingUser = await getUserById(user?.id || '')

      if (!existingUser) {
        return false
      }

      return true
    },
    async session({ token, session }) {
      if (token.sub && session.user) {
        session.user.id = token.sub
      }

      const user = await db.user.findUnique({
        where: { id: session.user.id },
      })

      if (user) {
        session.user.nameCompany = user.nameCompany
        session.user.canais = user.canais
      }

      if (session.user) {
        session.user.name = token.name
        session.user.email = token.email ?? ''
        session.user.nameCompany = token.nameCompany as
          | string
          | null
          | undefined
        session.user.canais = token.canais as string[] | null | undefined
      }

      return session
    },
    async jwt({ token }) {
      if (!token?.sub) return token

      const existingUser = await getUserById(token.sub)

      if (!existingUser) return token

      token.name = existingUser.name
      token.email = existingUser.email
      token.nameCompany = existingUser.nameCompany
      token.canais = existingUser.canais

      return token
    },
  },
  adapter: PrismaAdapter(db),
  session: { strategy: 'jwt', updateAge: 24 * 60 * 60 },
  ...authConfig,
})
