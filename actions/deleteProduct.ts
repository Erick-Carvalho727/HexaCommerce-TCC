'use server'

import { db } from '@/lib/db'
import { auth } from '@/auth'
import { number } from 'zod'

export const deleteProduct = async (idProduct: number[]) => {
  const session = await auth()
  if (!session || !session.user) {
    return { error: 'Usuário não autenticado!' }
  }

  const idUser = session?.user.id

  try {
    const products = await db.product.deleteMany({
      where: {
        id: { in: idProduct },
        userId: idUser,
      },
    })

    return { products }
  } catch (error) {
    console.error('Erro ao buscar produtos:', error)
    return { error: 'Erro ao buscar os produtos, tente novamente mais tarde.' }
  }
}
