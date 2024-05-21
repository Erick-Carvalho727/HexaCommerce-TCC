'use client'

import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import { startOfMonth, endOfMonth } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { LoaderCircle } from 'lucide-react'
import { Dispatch, SetStateAction, useState } from 'react'
import { DateRange } from 'react-day-picker'

interface DatePickerConfigProps {
  date?: DateRange | undefined
  setDate?: Dispatch<SetStateAction<DateRange | undefined>>
  isPending?: boolean
}

export default function CalendarFilter({
  date,
  setDate,
  isPending,
}: DatePickerConfigProps) {
  const [dateNow, setDateNow] = useState<DateRange | undefined>(date)

  const setDateNowHandler = () => {
    if (dateNow && setDate) {
      setDate(dateNow)
    }
  }

  const onReset = () => {
    if (setDateNow) {
      const today = new Date()
      setDateNow({
        from: startOfMonth(today),
        to: endOfMonth(today),
      })
    }
  }

  return (
    <div className="border rounded-md w-3/12 flex items-center justify-center">
      <div>
        <Calendar
          locale={ptBR}
          initialFocus
          mode="range"
          defaultMonth={dateNow?.from}
          selected={dateNow}
          onSelect={setDateNow}
          numberOfMonths={1}
          min={2}
          className="bg-gray-400/5 day_selected:bg-green-500 rounded-2xl"
        />

        <div className="flex space-x-4 pt-4">
          <Button
            disabled={isPending}
            className="w-full"
            variant="outline"
            onClick={onReset}
          >
            Resetar
          </Button>
          <Button
            disabled={!dateNow?.from || !dateNow.to || isPending}
            className="w-full bg-roxoBranco space-x-2 hover:bg-roxoBrancoHover"
            onClick={setDateNowHandler}
          >
            {isPending && (
              <LoaderCircle className="w-4 h-4 animate-spin mr-1" />
            )}
            Aplicar
          </Button>
        </div>
      </div>
    </div>
  )
}
