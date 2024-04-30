'use server'

import { db } from '@/lib/db'
import { auth } from '@/auth'

export const getProductById = async (productId: string) => {
  const session = await auth()
  if (!session || !session.user) {
    return { error: 'Usuário não autenticado!' }
  }

  const idUser = session?.user.id

  const productIdNumber = parseInt(productId)

  try {
    const product = await db.product.findFirst({
      select: {
        id: true,
        codigo: true,
        nomeProduto: true,
        ean: true,
        custo: true,
        estoque: true,
        altura: true,
        largura: true,
        precoVenda: true,
        comprimento: true,
        fabricante: true,
        peso: true,
        descricao: true,
      },
      where: {
        id: productIdNumber,
        userId: idUser,
      },
    })

    return { product }
  } catch (error) {
    console.error('Erro ao buscar produtos:', error)
    return { error: 'Erro ao buscar os produtos, tente novamente mais tarde.' }
  }
}
