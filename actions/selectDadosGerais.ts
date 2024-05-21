'use server'

import { db } from '@/lib/db'
import { auth } from '@/auth'
import { DateRange } from 'react-day-picker'

interface DadosGerais {
  vendas: number
  lucroTotal: number
  faturamento: number
  vendasPorCanal: {
    [canal: string]: number
  }
  dadosPorCanal: {
    [canal: string]: {
      faturamento: number
      lucroLiquido: number
    }
  }
}

export const getDadosGerais = async (
  date: DateRange | undefined,
): Promise<DadosGerais> => {
  const session = await auth()
  if (!session || !session.user) {
    throw new Error('Usuário não autenticado!')
  }

  const idUser = session?.user.id

  try {
    const sale = await db.sale.findMany({
      select: {
        valorTotalVenda: true,
        lucroTotalComImposto: true,
        status: true,
        canal: true,
      },
      where: {
        userId: idUser,
        createdAt: {
          gte: date?.from,
          lte: date?.to,
        },
      },
    })

    const dadosPorCanal: DadosGerais['dadosPorCanal'] = {}

    sale
      .filter((sale) => sale.status === 'Concluído')
      .forEach((sale) => {
        if (!dadosPorCanal[sale.canal]) {
          dadosPorCanal[sale.canal] = {
            faturamento: 0,
            lucroLiquido: 0,
          }
        }

        dadosPorCanal[sale.canal].faturamento += sale.valorTotalVenda
        dadosPorCanal[sale.canal].lucroLiquido += sale.lucroTotalComImposto
      })

    const vendasPorCanal = {} as Record<string, number>

    sale
      .filter((sale) => sale.status === 'Concluído')
      .forEach((sale) => {
        if (vendasPorCanal[sale.canal]) {
          vendasPorCanal[sale.canal]++
        } else {
          vendasPorCanal[sale.canal] = 1
        }
      })

    const vendas = sale.filter((sale) => sale.status === 'Concluído').length

    const lucroTotal = sale
      .filter((sale) => sale.status === 'Concluído')
      .reduce((acc, sale) => acc + sale.lucroTotalComImposto, 0)

    const faturamento = sale
      .filter((sale) => sale.status === 'Concluído')
      .reduce((acc, sale) => acc + sale.valorTotalVenda, 0)

    return { vendas, lucroTotal, faturamento, vendasPorCanal, dadosPorCanal }
  } catch (error) {
    console.error('Erro ao buscar os produtos:', error)
    throw new Error('Erro ao buscar os produtos, tente novamente mais tarde.')
  }
}
