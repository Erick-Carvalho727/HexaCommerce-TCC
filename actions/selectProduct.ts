'use server'

import { db } from '@/lib/db'
import { auth } from '@/auth'

export const getProducts = async () => {
  const session = await auth()
  if (!session || !session.user) {
    return { error: 'Usuário não autenticado!' }
  }

  const idUser = session?.user.id

  try {
    const products = await db.product.findMany({
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
        createdAt: true,
        fabricante: true,
        peso: true,
      },
      where: {
        userId: idUser,
      },
    })

    const productsWithCodigoAsString = products.map((product) => ({
      ...product,
      codigo: product.codigo.toString(),
    }))

    return { products: productsWithCodigoAsString }
  } catch (error) {
    return { error: 'Erro ao buscar os produtos, tente novamente mais tarde.' }
  }
}
