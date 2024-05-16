'use client'

import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable,
  ColumnFiltersState,
  SortingState,
  getSortedRowModel,
  VisibilityState,
  getFilteredRowModel,
} from '@tanstack/react-table'

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Dispatch, SetStateAction, useState } from 'react'
import { DatePickerSales } from './date-picker-sales'
import { DateRange } from 'react-day-picker'

import {
  DragDropContext,
  Droppable,
  Draggable,
  DraggableProvided,
  DroppableProvided,
} from '@hello-pangea/dnd'
import SelectOrderBy from './select-order-by'
import FilterByCanais from './filter-by-canais'
import FilterByStatus from './filter-by-status'
import { PackageX } from 'lucide-react'
// eslint-disable-next-line camelcase
import { Libre_Franklin } from 'next/font/google'
import { cn } from '@/lib/utils'

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
  date?: DateRange | undefined
  statusFilter: string[]
  canaisFilter?: string[] | null | undefined
  setDate?: Dispatch<SetStateAction<DateRange | undefined>>
  setStatusFilter: Dispatch<SetStateAction<string[]>>
  setCanaisFilter: Dispatch<SetStateAction<string[] | null | undefined>>
}

const fontLibre600 = Libre_Franklin({
  subsets: ['latin'],
  weight: ['500'],
})

export function DataTable<TData, TValue>({
  columns,
  data,
  date,
  setDate,
  statusFilter,
  setStatusFilter,
  canaisFilter,
  setCanaisFilter,
}: DataTableProps<TData, TValue>) {
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({})
  const [columnOrder, setColumnOrder] =
    useState<ColumnDef<TData, TValue>[]>(columns)
  const [sorting, setSorting] = useState<SortingState>([])

  const table = useReactTable({
    data,
    columns: columnOrder,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    state: {
      sorting,
      columnFilters,
      columnVisibility,
    },
  })

  const reorderColumn = (startIndex: number, endIndex: number): void => {
    setColumnOrder((prevColumns) => {
      const newColumns = [...prevColumns]
      const [removed] = newColumns.splice(startIndex, 1)
      newColumns.splice(endIndex, 0, removed)
      return newColumns
    })
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onDragEnd = (result: any) => {
    const { destination, source, type } = result
    if (!destination) {
      return
    }
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    )
      return
    if (type === 'column') {
      const columns = table.getAllColumns()
      let startIndex = source.index
      let endIndex = destination.index
      for (let i = 0; i < columns.length; i++) {
        if (!columns[i].getIsVisible()) {
          if (startIndex >= i) startIndex++
          if (endIndex >= i) endIndex++
        }
      }
      reorderColumn(startIndex, endIndex)
    }
  }

  console.log(data)

  return (
    <div>
      <div className="flex items-center py-4 justify-between">
        <Input
          placeholder="Filtrar por Número do Pedido"
          value={
            (table.getColumn('numeroDoPedido')?.getFilterValue() as string) ??
            ''
          }
          onChange={(event) =>
            table
              .getColumn('numeroDoPedido')
              ?.setFilterValue(event.target.value)
          }
          className="max-w-sm mr-4"
        />
        <div className="flex items-center space-x-4">
          <SelectOrderBy setSorting={setSorting} />
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="ml-auto font-normal">
                Colunas Exibidas
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {table
                .getAllColumns()
                .filter((column) => column.getCanHide())
                .map((column) => {
                  return (
                    <DropdownMenuCheckboxItem
                      key={column.id}
                      className="capitalize"
                      checked={column.getIsVisible()}
                      onCheckedChange={(value) =>
                        column.toggleVisibility(!!value)
                      }
                    >
                      {column.columnDef.propsColumn}
                    </DropdownMenuCheckboxItem>
                  )
                })}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
      <div className="flex justify-between mb-4">
        <div className="space-x-4">
          <FilterByCanais
            canaisFilter={canaisFilter}
            setCanaisFilter={setCanaisFilter}
          />
          <FilterByStatus
            statusFilter={statusFilter}
            setStatusFilter={setStatusFilter}
          />
        </div>
        <div>
          {' '}
          <DatePickerSales date={date} setDate={setDate} />
        </div>
      </div>

      {data.length === 0 ? (
        <div className="rounded-md border flex items-center flex-col justify-center h-80">
          <PackageX size={45} className="text-black mb-4" />
          <h1 className={cn('text-black', fontLibre600.className)}>
            Nenhum produto encontrado nessas condições.
          </h1>
        </div>
      ) : (
        <div className="rounded-md border">
          <Table>
            <DragDropContext onDragEnd={onDragEnd}>
              <Droppable
                droppableId="columns"
                type="column"
                direction="horizontal"
              >
                {(provided: DroppableProvided) => (
                  <TableHeader
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                    className="table"
                  >
                    <TableRow>
                      {table.getHeaderGroups().map((headerGroup) =>
                        headerGroup.headers.map((header, index) => (
                          <Draggable
                            key={header.id}
                            draggableId={header.id}
                            index={index}
                          >
                            {(provided: DraggableProvided) => (
                              <TableHead
                                {...provided.draggableProps}
                                {...provided.dragHandleProps}
                                ref={provided.innerRef}
                                key={header.id}
                                className="min-w-[250px] hover:bg-gray-200"
                              >
                                {header.isPlaceholder
                                  ? null
                                  : flexRender(
                                      header.column.columnDef.header,
                                      header.getContext(),
                                    )}
                              </TableHead>
                            )}
                          </Draggable>
                        )),
                      )}
                      {provided.placeholder}
                    </TableRow>
                  </TableHeader>
                )}
              </Droppable>

              <TableBody>
                {table.getRowModel().rows.map((row, index) => (
                  <TableRow key={index} className="table">
                    {(() => {
                      const visibleCells = row.getVisibleCells()
                      return row.getAllCells().map((cell) => (
                        <TableCell
                          style={{
                            display: visibleCells.includes(cell) ? '' : 'none',
                          }}
                          className="min-w-[250px]"
                          key={cell.id}
                        >
                          {flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext(),
                          )}
                        </TableCell>
                      ))
                    })()}
                  </TableRow>
                ))}
              </TableBody>
            </DragDropContext>
          </Table>
        </div>
      )}
      <div className="flex items-center justify-end space-x-2 py-4">
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          Anterior
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          Próximo
        </Button>
      </div>
    </div>
  )
}
