'use client'

import { SaleSchemaSelector } from '@/schemas'
import { ColumnDef } from '@tanstack/react-table'
import { z } from 'zod'

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type SaleSchema = {
  sale: z.infer<typeof SaleSchemaSelector>
}

export const columns: ColumnDef<z.infer<typeof SaleSchemaSelector>>[] = [
  {
    accessorKey: 'id',
    header: 'Número do Pedido',
  },
  {
    accessorKey: 'NF',
    header: 'Nota Fiscal',
  },
  {
    accessorKey: 'nomeProduto',
    header: 'Nome do Produto',
  },
  {
    accessorKey: 'canal',
    header: 'Canal de Venda',
  },
  {
    accessorKey: 'quantidade',
    header: 'Produtos Vendidos',
  },
  {
    accessorKey: 'createdAt',
    header: 'Data da Venda',
    cell: ({ row }) => {
      const date = new Date(row.getValue('createdAt'))
      const fomatDate = new Intl.DateTimeFormat('pt-BR').format(date)
      return <div className="font-medium">{fomatDate}</div>
    },
  },
  {
    accessorKey: 'valorTotalVenda',
    header: 'Valor Total da Venda',
  },
  {
    accessorKey: 'valorTotalCusto',
    header: 'Custo Total da Venda',
  },
  {
    accessorKey: 'valorTotalLucro',
    header: 'Lucro Sem Imposto',
  },
  {
    accessorKey: 'lucroTotalComImposto',
    header: 'Lucro Com Imposto',
  },
  {
    accessorKey: 'totalTriubutos',
    header: 'Total de Tributos',
  },
  {
    accessorKey: 'icms',
    header: 'ICMS',
  },
  {
    accessorKey: 'ipi',
    header: 'IPI',
  },
  {
    accessorKey: 'pis',
    header: 'PIS',
  },
  {
    accessorKey: 'cofins',
    header: 'COFINS',
  },
]
