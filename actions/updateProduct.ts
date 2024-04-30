'use server'

import * as z from 'zod'
import { ProductSchema } from '@/schemas'
import { auth } from '@/auth'
import { db } from '@/lib/db'

export const updateProduct = async (
  productId: string,
  values: z.infer<typeof ProductSchema>,
) => {
  const validatedFields = ProductSchema.safeParse(values)

  if (!validatedFields.success) {
    return { error: 'Campos inválidos!' }
  }

  const {
    altura,
    comprimento,
    custo,
    estoque,
    fabricante,
    largura,
    nomeProduto,
    peso,
    precoVenda,
    descricao,
  } = validatedFields.data

  const session = await auth()
  if (!session || !session.user) {
    return { error: 'Usuário não autenticado!' }
  }
  const idUser = session?.user.id

  const newProductId = parseInt(productId)

  try {
    const product = await db.product.update({
      where: {
        id: newProductId,
        userId: idUser,
      },
      data: {
        altura,
        comprimento,
        custo,
        estoque,
        fabricante,
        largura,
        nomeProduto,
        peso,
        precoVenda,
        descricao,
      },
    })
    return { product, success: 'Produto atualizado com sucesso!' }
  } catch (error) {
    console.error('Erro ao atualizar produto:', error)
    return { error: 'Erro ao atualizar o produto, tente novamente mais tarde.' }
  }
}
