'use client'

import { CalendarIcon } from '@radix-ui/react-icons'
import { endOfWeek, format, startOfWeek } from 'date-fns'
import { DateRange } from 'react-day-picker'
import { ptBR } from 'date-fns/locale'

import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { Dispatch, SetStateAction, useState } from 'react'
import { PopoverClose } from '@radix-ui/react-popover'

interface DatePickerSalesProps {
  date?: DateRange | undefined
  setDate?: Dispatch<SetStateAction<DateRange | undefined>>
}

export function DatePickerSales({ date, setDate }: DatePickerSalesProps) {
  const [dateNow, setDateNow] = useState<DateRange | undefined>(date)

  const setDateNowHandler = () => {
    if (dateNow && setDate) {
      setDate(dateNow)
    }
  }

  const onReset = () => {
    if (setDateNow) {
      const today = new Date()
      setDateNow({ from: startOfWeek(today), to: endOfWeek(today) })
    }
  }

  return (
    <div className={cn('grid gap-2')}>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            id="date"
            variant={'outline'}
            className={cn(
              'w-[250px] justify-start text-left font-normal',
              !dateNow && 'text-muted-foreground',
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {dateNow?.from ? (
              dateNow.to ? (
                <>
                  {format(dateNow.from, 'dd LLL, y', { locale: ptBR })} -{' '}
                  {format(dateNow.to, 'dd LLL, y', { locale: ptBR })}
                </>
              ) : (
                format(dateNow.from, 'dd LLL, y', { locale: ptBR })
              )
            ) : (
              <span>Escolha uma data</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            locale={ptBR}
            initialFocus
            mode="range"
            defaultMonth={dateNow?.from}
            selected={dateNow}
            onSelect={setDateNow}
            numberOfMonths={1}
          />

          <div className="px-4 pb-4 w-full flex items-center gap-x-2">
            <Button
              disabled={!dateNow?.from || !dateNow.to}
              className="w-full"
              variant="outline"
              onClick={onReset}
            >
              Resetar
            </Button>
            <PopoverClose asChild>
              <Button
                disabled={!dateNow?.from || !dateNow.to}
                className="w-full"
                onClick={setDateNowHandler}
              >
                Aplicar
              </Button>
            </PopoverClose>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  )
}
