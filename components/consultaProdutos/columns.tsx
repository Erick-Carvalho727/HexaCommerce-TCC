'use client'

import { ProductSchemaSelector } from '@/schemas'
import { MoreHorizontal, ArrowUpDown } from 'lucide-react'

import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { ColumnDef, RowData, Table } from '@tanstack/react-table'
import { z } from 'zod'
import { Checkbox } from '@/components/ui/checkbox'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog'
import { useState, FC } from 'react'
import { toast } from 'sonner'
import { CheckIcon } from '@radix-ui/react-icons'
import { useRouter } from 'next/navigation'

type ActionProductProps<TData extends RowData> = {
  product: z.infer<typeof ProductSchemaSelector>
  selectedProductIds: number[]
  selectedProductNames: (string | null)[]
  table: Table<TData>
}

export function createColumns(
  handleDeleteProduct: (
    productId: number[],
    productIdUnico: number,
  ) => void | Promise<void>,
): ColumnDef<z.infer<typeof ProductSchemaSelector>>[] {
  const ActionProduct: FC<ActionProductProps<RowData>> = ({
    product,
    selectedProductIds,
    selectedProductNames,
    table,
  }) => {
    const [open, setOpen] = useState(false)
    const router = useRouter()

    const productNamesString = selectedProductNames.join(', ')

    const handleCopyEan = () => {
      navigator.clipboard.writeText(product.ean ?? '')

      toast(
        <div className="flex space-x-2 items-center">
          <CheckIcon className="text-emerald-500" />
          <h1>Código EAN copiado com sucesso!</h1>
        </div>,
      )
    }

    return (
      <>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Ações</DropdownMenuLabel>
            {selectedProductIds.length <= 1 && (
              <>
                <DropdownMenuItem onClick={handleCopyEan}>
                  Copiar código EAN
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  onClick={() => router.push(`/editarProduto/${product.id}`)}
                >
                  Editar
                </DropdownMenuItem>
              </>
            )}
            <DropdownMenuItem
              className="focus:bg-destructive focus:text-white"
              onClick={() => setOpen(true)}
            >
              Deletar
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <AlertDialog open={open} onOpenChange={setOpen}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>
                {selectedProductIds.length === 1
                  ? `Deseja deletar o produto ${productNamesString}?`
                  : selectedProductIds.length > 1
                    ? `Deseja deletar os produtos ${productNamesString}?`
                    : `Deseja deletar o produto ${product.nomeProduto}?`}
              </AlertDialogTitle>
              <AlertDialogDescription>
                Essa ação deletará permanentemente todos os produtos
                selecionados do nosso sistema.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel className="bg-default">
                Cancelar
              </AlertDialogCancel>
              <AlertDialogAction
                className="bg-destructive"
                onClick={() => {
                  handleDeleteProduct(selectedProductIds, product.id)
                  table.resetRowSelection()
                  toast(
                    <div className="flex space-x-2 items-center">
                      <CheckIcon className="text-emerald-500 mr-2" />
                      {selectedProductIds.length === 1
                        ? `Produto deletado com sucesso!`
                        : selectedProductIds.length > 1
                          ? `Produtos deletados com sucesso!`
                          : `Produto deletado com sucesso!`}
                    </div>,
                  )
                }}
              >
                Deletar
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </>
    )
  }

  return [
    {
      id: 'select',
      header: ({ table }) => (
        <Checkbox
          checked={
            table.getIsAllPageRowsSelected() ||
            (table.getIsSomePageRowsSelected() && 'indeterminate')
          }
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
          aria-label="Select all"
        />
      ),
      cell: ({ row }) => (
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
          aria-label="Select row"
        />
      ),
      enableSorting: false,
      enableHiding: false,
    },

    {
      accessorKey: 'codigo',
      propsColumn: 'Código',
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          >
            Código
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        )
      },
    },
    {
      accessorKey: 'ean',
      header: 'EAN',
      propsColumn: 'EAN',
    },
    {
      accessorKey: 'nomeProduto',
      header: 'Nome',
      propsColumn: 'Nome',
    },
    {
      accessorKey: 'fabricante',
      header: 'Fabricante',
      propsColumn: 'Fabricante',
    },
    {
      accessorKey: 'custo',
      propsColumn: 'Custo',
      header: 'Custo',
      cell: ({ row }) => {
        const custo = row.getValue('custo') as number
        const formattedCusto = new Intl.NumberFormat('pt-BR', {
          style: 'currency',
          currency: 'BRL',
        }).format(custo)
        return <div className="font-medium">{formattedCusto}</div>
      },
    },
    {
      accessorKey: 'estoque',
      header: 'Estoque',
      propsColumn: 'Estoque',
    },
    {
      accessorKey: 'altura',
      header: 'Altura',
      propsColumn: 'Altura',
      cell: ({ row }) => {
        const altura = row.getValue('altura')
        return <div className="font-medium">{`${altura} cm`}</div>
      },
    },
    {
      accessorKey: 'largura',
      header: 'Largura',
      propsColumn: 'Largura',
      cell: ({ row }) => {
        const largura = row.getValue('largura')
        return <div className="font-medium">{`${largura} cm`}</div>
      },
    },
    {
      accessorKey: 'comprimento',
      header: 'Comprimento',
      propsColumn: 'Comprimento',
      cell: ({ row }) => {
        const comprimento = row.getValue('comprimento')
        return <div className="font-medium">{`${comprimento} cm`}</div>
      },
    },
    {
      accessorKey: 'peso',
      header: 'Peso',
      propsColumn: 'Peso',
      cell: ({ row }) => {
        const peso = row.getValue('peso')
        return <div className="font-medium">{`${peso} g`}</div>
      },
    },
    {
      accessorKey: 'createdAt',
      propsColumn: 'Criado em',
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          >
            Criado em
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        )
      },
      cell: ({ row }) => {
        const date = new Date(row.getValue('createdAt'))
        const fomatDate = new Intl.DateTimeFormat('pt-BR').format(date)
        return <div className="font-medium">{fomatDate}</div>
      },
    },
    {
      id: 'actions',
      cell: ({ row, table }) => {
        const product = row.original

        const selectedRows = table.getSelectedRowModel()
        const selectedProductIds = selectedRows.rows.map(
          (selectedRow) => selectedRow.original.id,
        )

        const selectedProductNames = selectedRows.rows.map(
          (selectedRow) => selectedRow.original.nomeProduto,
        )

        return (
          <ActionProduct
            product={product}
            selectedProductIds={selectedProductIds}
            selectedProductNames={selectedProductNames}
            table={table as Table<unknown>}
          />
        )
      },
      enableHiding: false,
    },
  ]
}
