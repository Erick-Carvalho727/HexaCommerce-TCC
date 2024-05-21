'use server'

import * as z from 'zod'
import { SaleSchema } from '@/schemas'
import { auth } from '@/auth'
import { db } from '@/lib/db'
import { format } from 'date-fns'

export const createSale = async (values: z.infer<typeof SaleSchema>) => {
  const validatedFields = SaleSchema.safeParse(values)

  if (!validatedFields.success) {
    return { error: 'Campos inválidos!' }
  }

  const { canal, quantidade, nomeProduto, status } = validatedFields.data

  const session = await auth()
  if (!session || !session.user) {
    return { error: 'Usuário não autenticado!' }
  }
  const idUser = session?.user.id

  const findIdProduct = await db.product.findFirst({
    where: {
      nomeProduto,
      userId: idUser!,
    },
    select: {
      id: true,
      estoque: true,
      custo: true,
      precoVenda: true,
    },
  })

  const novoEstoque = findIdProduct!.estoque - quantidade

  if (novoEstoque < 0) {
    return { error: 'Quantidade em estoque insuficiente!' }
  }

  const datePart = format(new Date(), 'yyyyMMddHHmmss') // Formata a data e hora atual
  const uniquePart = Math.floor(Math.random() * 90000) + 10000 // Gera um número entre 10000 e 99999
  const NF = `NF${datePart}${uniquePart}`

  const custoTotal = quantidade * findIdProduct!.custo
  const precoVendaTotal = quantidade * findIdProduct!.precoVenda
  const lucro = precoVendaTotal - custoTotal
  const icms = precoVendaTotal * 0.18
  const pis = precoVendaTotal * 0.0186
  const cofins = precoVendaTotal * 0.0854
  const totalTributos = icms + pis + cofins
  const lucroTotalComImposto = lucro - totalTributos

  try {
    const sale = await db.sale.create({
      data: {
        quantidade,
        canal,
        valorTotalCusto: custoTotal,
        valorTotalVenda: precoVendaTotal,
        valorTotalLucro: lucro,
        NF,
        icms,
        pis,
        cofins,
        totalTriubutos: totalTributos,
        lucroTotalComImposto,
        userId: idUser!,
        productId: findIdProduct!.id,
        status,
      },
    })

    if (status === 'Cancelado')
      return { sale, success: 'Venda cadastrada com sucesso!' }

    await db.product.update({
      where: { id: findIdProduct!.id, userId: idUser! },
      data: {
        estoque: novoEstoque,
      },
    })

    return { sale, success: 'Venda cadastrada com sucesso!' }
  } catch (error) {
    console.error('Erro ao criar produto:', error)
    return { error: 'Erro ao criar o produto, tente novamente mais tarde.' }
  }
}
