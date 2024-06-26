'use client'

import HeaderGestaoVendas from '@/components/header-gestao-vendas'
import { DataTable } from './data-table'
import { columns } from './columns'
import { useEffect, useState, useTransition } from 'react'
import { z } from 'zod'
import { SaleSchemaSelector } from '@/schemas'
import { getSales } from '@/actions/selectSales'
import { Skeleton } from '@/components/ui/skeleton'
import { Loader2 } from 'lucide-react'
import { DateRange } from 'react-day-picker'
import { endOfWeek, startOfWeek } from 'date-fns'
import { useCurrentUser } from '@/hooks/use-current-user'

interface SaleResponse {
  sales?: z.infer<typeof SaleSchemaSelector>[]
  error?: string | undefined
  success?: string | undefined
  canais?: string[]
}

export default function GestaoVendasPage() {
  const user = useCurrentUser()

  const [, setError] = useState<string | undefined>('')
  const [isPending, startTransition] = useTransition()
  const [sales, setSales] = useState<z.infer<typeof SaleSchemaSelector>[]>([])
  const [canais, setCanais] = useState<string[]>([])
  const [date, setDate] = useState<DateRange | undefined>(() => {
    const today = new Date()
    today.setHours(0, 0, 0, 0)

    return {
      from: startOfWeek(today),
      to: endOfWeek(today),
    }
  })
  const [statusFilter, setStatusFilter] = useState<string[]>([
    'Concluído',
    'Aguardando Pagamento',
    'Cancelado',
  ])
  const [canaisFilter, setCanaisFilter] = useState<string[] | null | undefined>(
    user?.canais ? user.canais : [],
  )

  const listSales = () => {
    startTransition(() => {
      getSales(date, statusFilter, canaisFilter)
        .then((data: SaleResponse) => {
          if (data.sales) setSales(data.sales)
          if (data.canais) setCanais(data.canais)
        })
        .catch((e) => setError(e))
    })
  }

  useEffect(() => {
    listSales()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [date, statusFilter, canaisFilter])

  if (isPending) {
    return (
      <>
        <HeaderGestaoVendas />
        <div className="flex flex-col w-full h-full relative">
          <div className="flex justify-between">
            <Skeleton className="w-[384px] h-[36px] my-4" />
            <div className="flex items-center space-x-4">
              <Skeleton className="w-[384px] h-[36px] my-4" />
              <Skeleton className="w-[148px] h-[36px] my-4" />
            </div>
          </div>
          <div className="absolute top-80 left-1/2">
            <Loader2 className="size-6 text-slate-300 animate-spin" />
          </div>
        </div>
      </>
    )
  }

  return (
    <div>
      <HeaderGestaoVendas />
      <DataTable
        columns={columns}
        data={sales}
        setDate={setDate}
        date={date}
        canais={canais}
        statusFilter={statusFilter}
        setStatusFilter={setStatusFilter}
        canaisFilter={canaisFilter}
        setCanaisFilter={setCanaisFilter}
      />
    </div>
  )
}
