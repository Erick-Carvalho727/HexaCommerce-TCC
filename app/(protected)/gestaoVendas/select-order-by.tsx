import { Button } from '@/components/ui/button'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { SortingState } from '@tanstack/react-table'
import { Dispatch, SetStateAction, useState } from 'react'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { PopoverClose } from '@radix-ui/react-popover'
import { Checkbox } from '@/components/ui/checkbox'
import { Separator } from '@/components/ui/separator'

interface SelectOrderByProps {
  setSorting: Dispatch<SetStateAction<SortingState>>
}

export default function SelectOrderBy({ setSorting }: SelectOrderByProps) {
  const [selectedFilter, setSelectedFilter] = useState('')
  const [, setSortOrder] = useState('asc')

  const handleOrderChange = (value: string) => {
    setSelectedFilter(value)
    setSortOrder('asc')
  }

  const handleSortOrderChange = (value: string) => {
    setSortOrder(value)
    const currentColumn =
      selectedFilter === 'numero' ? 'numeroDoPedido' : 'createdAt'
    setSorting([{ id: currentColumn, desc: value === 'desc' }])
  }

  const handleReset = () => {
    setSelectedFilter('')
    setSortOrder('asc')
    setSorting([])
  }

  return (
    <div className="flex space-x-4">
      <Select onValueChange={handleOrderChange} value={selectedFilter}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Ordernar por" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="numero">Número do Pedido</SelectItem>
          <SelectItem value="dataVenda">Data da Venda</SelectItem>
        </SelectContent>
      </Select>

      {selectedFilter && (
        <>
          <Select onValueChange={handleSortOrderChange}>
            <SelectTrigger className="w-[140px]">
              <SelectValue placeholder="Ordem" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="asc">Crescente</SelectItem>
              <SelectItem value="desc">Decrescente</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" onClick={handleReset} className="ml-auto">
            Resetar
          </Button>
        </>
      )}
    </div>
  )
}
