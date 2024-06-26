'use server'

import { db } from '@/lib/db'
import { auth } from '@/auth'
import { DateRange } from 'react-day-picker'

export const getSales = async (
  date: DateRange | undefined,
  statusFilter: string[],
  canaisFilter: string[] | null | undefined,
) => {
  const session = await auth()
  if (!session || !session.user) {
    return { error: 'Usuário não autenticado!' }
  }

  const idUser = session?.user.id

  try {
    const sales = await db.sale.findMany({
      select: {
        product: true,
        canal: true,
        quantidade: true,
        cofins: true,
        createdAt: true,
        icms: true,
        lucroTotalComImposto: true,
        NF: true,
        pis: true,
        totalTriubutos: true,
        valorTotalCusto: true,
        valorTotalLucro: true,
        valorTotalVenda: true,
        id: true,
        status: true,
      },
      where: {
        userId: idUser,
        createdAt: {
          gte: date?.from,
          lte: date?.to,
        },
        status: {
          in: statusFilter,
        },
        canal: {
          in: canaisFilter || [],
        },
      },
    })

    const canaisComVendas = await db.sale.findMany({
      distinct: ['canal'],
      select: {
        canal: true,
      },
      where: {
        userId: idUser,
        quantidade: {
          gt: 0,
        },
      },
      orderBy: { quantidade: 'asc' },
    })

    const canais = canaisComVendas.map((canal) => canal.canal)

    const salesWithCodigoAsString = sales.map((sale) => ({
      ...sale,
      numeroDoPedido: sale.id.toString(),
      nomeProduto: sale.product.nomeProduto,
    }))

    return {
      sales: salesWithCodigoAsString,
      canais,
    }
  } catch (error) {
    return { error: 'Não foi possível carregar as vendas!' }
  }
}
