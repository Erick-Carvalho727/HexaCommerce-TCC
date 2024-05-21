'use client'

import { SaleSchemaSelector } from '@/schemas'
import { ColumnDef } from '@tanstack/react-table'
import { z } from 'zod'
import RowMoneyFormatted from './row-money-formatted'

import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { MoreHorizontal } from 'lucide-react'
import RowHeaderIcon from './row-header-icon'

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type SaleSchema = {
  sale: z.infer<typeof SaleSchemaSelector>
}

export const columns: ColumnDef<z.infer<typeof SaleSchemaSelector>>[] = [
  {
    accessorKey: 'numeroDoPedido',
    header: () => {
      return <RowHeaderIcon nameColumn="Número do Pedido" />
    },
    propsColumn: 'Número do Pedido',
  },
  {
    accessorKey: 'status',
    header: () => {
      return <RowHeaderIcon nameColumn="Status da Venda" />
    },
    propsColumn: 'Status da Venda',
    cell: ({ row }) => {
      const status = row.getValue('status')
      if (status === 'Concluído') {
        return (
          <div className="py-1 select-none w-2/3 rounded-2xl flex justify-center bg-emerald-200 font-medium">
            {status}
          </div>
        )
      } else if (status === 'Aguardando Pagamento') {
        return (
          <div className="py-1 w-52 select-none rounded-2xl flex justify-center bg-yellow-200 font-medium">
            {status}
          </div>
        )
      } else {
        return (
          <div className="py-1 w-2/3 select-none rounded-2xl flex justify-center bg-red-200 font-medium">
            {status as string}
          </div>
        )
      }
    },
  },
  {
    accessorKey: 'createdAt',
    header: () => {
      return <RowHeaderIcon nameColumn="Data da Venda" />
    },
    propsColumn: 'Data da Venda',
    cell: ({ row }) => {
      const date = new Date(row.getValue('createdAt'))
      const fomatDate = new Intl.DateTimeFormat('pt-BR').format(date)
      return <div className="font-medium">{fomatDate}</div>
    },
  },
  {
    accessorKey: 'NF',
    header: () => {
      return <RowHeaderIcon nameColumn="Nota Fiscal" />
    },
    propsColumn: 'Nota Fiscal',
    cell: ({ row }) => {
      const isCancelled = row.getValue('status') === 'Cancelado'
      if (isCancelled) return <div className="font-medium">-</div>
      return <div className="font-medium">{row.getValue('NF')}</div>
    },
  },
  {
    accessorKey: 'nomeProduto',
    header: () => {
      return <RowHeaderIcon nameColumn="Nome do Produto" />
    },
    propsColumn: 'Nome do Produto',
  },
  {
    accessorKey: 'canal',
    header: () => {
      return <RowHeaderIcon nameColumn="Canal de Venda" />
    },
    propsColumn: 'Canal de Venda',
  },
  {
    accessorKey: 'quantidade',
    header: () => {
      return <RowHeaderIcon nameColumn="Produtos Vendidos" />
    },
    propsColumn: 'Produtos Vendidos',
    cell: ({ row }) => {
      const isCancelled = row.getValue('status') === 'Cancelado'
      if (isCancelled) return <div className="font-medium">-</div>
      return <div className="font-medium">{row.getValue('quantidade')}</div>
    },
  },
  {
    accessorKey: 'valorTotalVenda',
    header: () => {
      return <RowHeaderIcon nameColumn="Valor Total da Venda" />
    },
    propsColumn: 'Valor Total da Venda',
    cell: ({ row }) => {
      const isCancelled = row.getValue('status') === 'Cancelado'
      return (
        <RowMoneyFormatted
          row={row}
          column="valorTotalVenda"
          isCancelled={isCancelled}
        />
      )
    },
  },
  {
    accessorKey: 'valorTotalCusto',
    header: () => {
      return <RowHeaderIcon nameColumn="Custo Total da Venda" />
    },
    propsColumn: 'Custo Total da Venda',
    cell: ({ row }) => {
      const isCancelled = row.getValue('status') === 'Cancelado'
      return (
        <RowMoneyFormatted
          row={row}
          column="valorTotalCusto"
          isCancelled={isCancelled}
        />
      )
    },
  },
  {
    accessorKey: 'valorTotalLucro',
    header: () => {
      return <RowHeaderIcon nameColumn="Lucro Sem Imposto" />
    },
    propsColumn: 'Lucro Sem Imposto',
    cell: ({ row }) => {
      const isCancelled =
        row.getValue('status') === 'Cancelado' ||
        row.getValue('status') === 'Aguardando Pagamento'
      return (
        <RowMoneyFormatted
          row={row}
          column="valorTotalLucro"
          isCancelled={isCancelled}
        />
      )
    },
  },
  {
    accessorKey: 'lucroTotalComImposto',
    header: () => {
      return <RowHeaderIcon nameColumn="Lucro Com Imposto" />
    },
    propsColumn: 'Lucro Com Imposto',
    cell: ({ row }) => {
      const isCancelled =
        row.getValue('status') === 'Cancelado' ||
        row.getValue('status') === 'Aguardando Pagamento'
      return (
        <RowMoneyFormatted
          row={row}
          column="lucroTotalComImposto"
          isCancelled={isCancelled}
        />
      )
    },
  },
  {
    accessorKey: 'totalTriubutos',
    header: () => {
      return <RowHeaderIcon nameColumn="Total de Tributos" />
    },
    propsColumn: 'Total de Tributos',
    cell: ({ row }) => {
      const isCancelled =
        row.getValue('status') === 'Cancelado' ||
        row.getValue('status') === 'Aguardando Pagamento'
      return (
        <RowMoneyFormatted
          row={row}
          column="totalTriubutos"
          isCancelled={isCancelled}
        />
      )
    },
  },
  {
    accessorKey: 'icms',
    header: () => {
      return <RowHeaderIcon nameColumn="ICMS" />
    },
    propsColumn: 'ICMS',
    cell: ({ row }) => {
      const isCancelled =
        row.getValue('status') === 'Cancelado' ||
        row.getValue('status') === 'Aguardando Pagamento'
      return (
        <RowMoneyFormatted row={row} column="icms" isCancelled={isCancelled} />
      )
    },
  },
  {
    accessorKey: 'pis',
    header: () => {
      return <RowHeaderIcon nameColumn="PIS" />
    },
    propsColumn: 'PIS',
    cell: ({ row }) => {
      const isCancelled =
        row.getValue('status') === 'Cancelado' ||
        row.getValue('status') === 'Aguardando Pagamento'
      return (
        <RowMoneyFormatted row={row} column="pis" isCancelled={isCancelled} />
      )
    },
  },
  {
    accessorKey: 'cofins',
    header: () => {
      return <RowHeaderIcon nameColumn="COFINS" />
    },
    propsColumn: 'COFINS',
    cell: ({ row }) => {
      const isCancelled =
        row.getValue('status') === 'Cancelado' ||
        row.getValue('status') === 'Aguardando Pagamento'
      return (
        <RowMoneyFormatted
          row={row}
          column="cofins"
          isCancelled={isCancelled}
        />
      )
    },
  },
  {
    id: 'actions',
    header: 'Ações',
    enableHiding: false,
    cell: ({ row }) => {
      const isCancelled = row.getValue('status') === 'Cancelado'

      if (isCancelled) return

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Abrir menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Ações</DropdownMenuLabel>

            <DropdownMenuItem
              onClick={() =>
                navigator.clipboard.writeText(row.original.numeroDoPedido ?? '')
              }
            >
              Copiar Número do Pedido
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() =>
                navigator.clipboard.writeText(row.original.NF ?? '')
              }
            >
              Copiar NF
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  },
]
