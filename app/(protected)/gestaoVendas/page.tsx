'use client'

import HeaderGestaoVendas from '@/components/header-gestao-vendas'
import { DataTable } from './data-table'
import { columns } from './columns'
import { useEffect, useState, useTransition } from 'react'
import { z } from 'zod'
import { SaleSchemaSelector } from '@/schemas'
import { getSales } from '@/actions/selectSales'

interface SaleResponse {
  sales: z.infer<typeof SaleSchemaSelector>[]
  error?: string
  success?: string
}

export default function GestaoVendasPage() {
  const [error, setError] = useState<string | undefined>('')
  const [isPending, startTransition] = useTransition()
  const [sales, setSales] = useState<z.infer<typeof SaleSchemaSelector>[]>([])

  const listSales = () => {
    startTransition(() => {
      getSales()
        .then((data: SaleResponse) => {
          if (data.sales) setSales(data.sales)
        })
        .catch((e) => setError(e))
    })
  }

  useEffect(() => {
    listSales()
  }, [])

  return (
    <div>
      <HeaderGestaoVendas />
      <DataTable columns={columns} data={sales} />
    </div>
  )
}
