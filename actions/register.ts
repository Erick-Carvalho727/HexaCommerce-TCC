'use server'

import bcrypt from 'bcryptjs'
import * as z from 'zod'
import { db } from '@/lib/db'
import { RegisterSchema } from '@/schemas'
import { getUserByEmail } from '@/data/user'

export const register = async (values: z.infer<typeof RegisterSchema>) => {
  const validatedFields = RegisterSchema.safeParse(values)

  if (!validatedFields.success) {
    return { error: 'Campos inválidos!' }
  }

  const { name, email, nameCompany, password } = validatedFields.data
  const hashedPassword = await bcrypt.hash(password, 10)

  const existingUser = await getUserByEmail(email)

  if (existingUser) return { error: 'Email já cadastrado!' }

  await db.user.create({
    data: {
      name,
      email,
      password: hashedPassword,
      nameCompany,
    },
  })

  return { success: 'Usuario criado com sucesso!' }
}
