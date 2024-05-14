'use client'

import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { Separator } from '@/components/ui/separator'
import { PopoverClose } from '@radix-ui/react-popover'
import { Dispatch, SetStateAction, useState } from 'react'

interface FilterByStatusProps {
  statusFilter: string[]
  setStatusFilter: Dispatch<SetStateAction<string[]>>
}

export default function FilterByStatus({
  statusFilter,
  setStatusFilter,
}: FilterByStatusProps) {
  const [selectedStatus, setSelectedStatus] = useState<string[]>(statusFilter)

  const handleStatusChange = (status: string) => {
    setSelectedStatus((prevStatus) => {
      if (prevStatus.includes(status)) {
        return prevStatus.filter((s) => s !== status)
      } else {
        return [...prevStatus, status]
      }
    })
  }

  const handleReset = () => {
    setStatusFilter(['Concluído', 'Aguardando Pagamento', 'Cancelado'])
  }

  const handleApply = () => {
    setStatusFilter(selectedStatus)
  }

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" className="font-normal">
          Filtrar por Status
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <h1 className="pt-3 px-4 text-sm font-semibold">Status</h1>
        <Separator className="mt-3" />
        <div className="py-5 px-4 w-full flex flex-col gap-y-3">
          <div className="flex items-center space-x-2">
            <Checkbox
              id="Concluído"
              checked={selectedStatus.includes('Concluído')}
              onCheckedChange={() => handleStatusChange('Concluído')}
            />
            <label
              htmlFor="Concluído"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              Concluído
            </label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox
              id="Aguardando Pagamento"
              checked={selectedStatus.includes('Aguardando Pagamento')}
              onCheckedChange={() => handleStatusChange('Aguardando Pagamento')}
            />
            <label
              htmlFor="Aguardando Pagamento"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              Aguardando Pagamento
            </label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox
              id="Cancelado"
              checked={selectedStatus.includes('Cancelado')}
              onCheckedChange={() => handleStatusChange('Cancelado')}
            />
            <label
              htmlFor="Cancelado"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              Cancelado
            </label>
          </div>
        </div>

        <div className="px-4 pb-4 w-full flex items-center gap-x-2">
          <Button className="w-full" variant="outline" onClick={handleReset}>
            Resetar
          </Button>
          <PopoverClose asChild>
            <Button className="w-full" onClick={handleApply}>
              Aplicar
            </Button>
          </PopoverClose>
        </div>
      </PopoverContent>
    </Popover>
  )
}
