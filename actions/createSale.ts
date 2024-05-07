'use server'

import * as z from 'zod'
import { SaleSchema } from '@/schemas'
import { auth } from '@/auth'
import { db } from '@/lib/db'

export const createSale = async (values: z.infer<typeof SaleSchema>) => {
  const validatedFields = SaleSchema.safeParse(values)

  if (!validatedFields.success) {
    return { error: 'Campos inválidos!' }
  }

  const { canal, quantidade, nomeProduto } = validatedFields.data

  const session = await auth()
  if (!session || !session.user) {
    return { error: 'Usuário não autenticado!' }
  }
  const idUser = session?.user.id

  const findIdProduct = await db.product.findFirst({
    where: {
      nomeProduto,
    },
    select: {
      id: true,
      estoque: true,
    },
  })

  const novoEstoque = findIdProduct!.estoque - quantidade

  if (novoEstoque < 0) {
    return { error: 'Quantidade em estoque insuficiente!' }
  }

  await db.product.update({
    where: { id: findIdProduct!.id },
    data: {
      estoque: novoEstoque,
    },
  })

  console.log(quantidade, canal, idUser, findIdProduct!.id)

  try {
    const sale = await db.sale.create({
      data: {
        quantidade,
        canal,
        userId: idUser!,
        productId: findIdProduct!.id,
      },
    })

    return { sale, success: 'Venda cadastrada com sucesso!' }
  } catch (error) {
    console.error('Erro ao criar produto:', error)
    return { error: 'Erro ao criar o produto, tente novamente mais tarde.' }
  }
}
