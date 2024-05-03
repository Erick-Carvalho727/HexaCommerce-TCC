'use server'

import * as z from 'zod'
import { LoginSchema } from '@/schemas'
import { signIn } from '@/auth'
import { AuthError } from 'next-auth'
import { DEFAULT_LOGIN_REDIRECT } from '@/routes'
import { getSession } from 'next-auth/react'
import { Router } from 'next/navigation'

export const login = async (values: z.infer<typeof LoginSchema>) => {
  const validatedFields = LoginSchema.safeParse(values)

  if (!validatedFields.success) {
    return { error: 'Campos inválidos!' }
  }

  const { email, password } = validatedFields.data

  try {
    await signIn('credentials', {
      redirectTo: DEFAULT_LOGIN_REDIRECT,
      email,
      password,
    })
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case 'CredentialsSignin':
          return { error: 'Credenciais inválidas!' }
        default:
          return { error: 'Algo está errado!' }
      }
    }

    throw error
  }
}
