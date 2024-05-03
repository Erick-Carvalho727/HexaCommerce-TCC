'use server'

import { z } from 'zod'
import { db } from '@/lib/db'
import { getUserById } from '@/data/user'
import { UserSchemaConfig } from '@/schemas'
import { currentUser } from '@/lib/auth'

export const settings = async (values: z.infer<typeof UserSchemaConfig>) => {
  const user = await currentUser()

  if (!user) {
    return { error: 'Usuário não encontrado' }
  }

  if (!user.id) {
    return { error: 'ID do usuário não encontrado' }
  }

  const dbUser = await getUserById(user.id)

  if (!dbUser) {
    return { error: 'Usuário não encontrado' }
  }

  await db.user.update({
    where: { id: dbUser.id },
    data: {
      name: values.name,
    },
  })

  return { success: 'Configurações atualizadas com sucesso' }
}
