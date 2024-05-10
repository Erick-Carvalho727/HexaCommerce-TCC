'use server'

import { db } from '@/lib/db'
import { auth } from '@/auth'

export const getSales = async () => {
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
        ipi: true,
        totalTriubutos: true,
        valorTotalCusto: true,
        valorTotalLucro: true,
        valorTotalVenda: true,
        id: true,
      },
      where: {
        userId: idUser,
      },
    })

    const salesWithCodigoAsString = sales.map((sale) => ({
      ...sale,
      codigo: sale.id.toString(),
      nomeProduto: sale.product.nomeProduto,
    }))

    return { sales: salesWithCodigoAsString }
  } catch (error) {}
}
