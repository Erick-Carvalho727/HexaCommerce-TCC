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

interface FilterByCanaisProps {
  canaisFilter: string[] | null | undefined
  setCanaisFilter: Dispatch<SetStateAction<string[] | null | undefined>>
  canais: string[]
}

export default function FilterByCanais({
  canaisFilter,
  setCanaisFilter,
  canais,
}: FilterByCanaisProps) {
  const [selectedCanais, setSelectedCanais] = useState<
    string[] | null | undefined
  >(canaisFilter || [])

  const handleCheckboxChange = (canal: string) => {
    setSelectedCanais((prevCanais) => {
      if (prevCanais) {
        if (prevCanais.includes(canal)) {
          return prevCanais.filter((s) => s !== canal)
        } else {
          return [...prevCanais, canal]
        }
      }
    })
  }

  const handleReset = () => {
    setSelectedCanais(canais)
  }

  const handleApply = () => {
    setCanaisFilter(selectedCanais)
  }

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant={'outline'} className="font-normal">
          Filtrar por Canal de Venda
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <h1 className="pt-3 px-4 text-sm font-semibold">Canais de venda</h1>
        <Separator className="mt-3" />
        <div className="py-5 px-4 w-full flex flex-col gap-y-3">
          {canais.length === 0 ? (
            <div>
              Nenhum canal possui <br /> vendas registradas.
            </div>
          ) : null}

          {canais.map((canal) => (
            <div key={canal} className="flex items-center space-x-2">
              <Checkbox
                id={canal}
                checked={selectedCanais?.includes(canal) ?? false}
                onCheckedChange={() => handleCheckboxChange(canal)}
              />
              <label
                htmlFor={canal}
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                {canal}
              </label>
            </div>
          ))}
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
