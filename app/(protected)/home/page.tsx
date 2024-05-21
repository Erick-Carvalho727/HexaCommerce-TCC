'use client'

import { useEffect, useState, useTransition } from 'react'
import CalendarFilter from './calendar-filter'
import CardCanais from './card-canais'
import CardGerais from './card-gerais'
import HeaderDashboard from './header-dashboard'
import { getDadosGerais } from '@/actions/selectDadosGerais'
import { DateRange } from 'react-day-picker'
import { endOfMonth, startOfMonth } from 'date-fns'
import CardGrafico from './card-grafico'

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

export default function Dashboard() {
  const [isPending, startTransition] = useTransition()
  const [dadosGerais, setDadosGerais] = useState<DadosGerais>({
    vendas: 0,
    lucroTotal: 0,
    faturamento: 0,
    vendasPorCanal: {},
    dadosPorCanal: {},
  })
  const [date, setDate] = useState<DateRange | undefined>(() => {
    const today = new Date()
    today.setHours(0, 0, 0, 0)

    return {
      from: startOfMonth(today),
      to: endOfMonth(today),
    }
  })

  useEffect(() => {
    listDadosGerais()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [date])

  const listDadosGerais = () => {
    startTransition(() => {
      getDadosGerais(date).then(setDadosGerais)
    })
  }

  return (
    <div>
      <HeaderDashboard />
      <div className="flex space-x-4 h-full">
        <div className="w-9/12 space-y-4">
          <CardGerais
            vendas={dadosGerais.vendas}
            faturamento={dadosGerais.faturamento}
            lucroLiquido={dadosGerais.lucroTotal}
            date={date}
          />
          <CardCanais vendasPorCanal={dadosGerais.vendasPorCanal} date={date} />
          <CardGrafico dadosPorCanal={dadosGerais.dadosPorCanal} date={date} />
        </div>
        <CalendarFilter date={date} setDate={setDate} isPending={isPending} />
      </div>
    </div>
  )
}
