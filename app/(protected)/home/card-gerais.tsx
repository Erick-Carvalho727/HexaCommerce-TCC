'use client'

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
// eslint-disable-next-line camelcase
import { Libre_Franklin } from 'next/font/google'
import { cn } from '@/lib/utils'
import { CircleDollarSign, Wallet } from 'lucide-react'
import { FaPiggyBank } from 'react-icons/fa'
import { CountUp } from './count-up'
import { DateRange } from 'react-day-picker'
import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'

const fontLibre600 = Libre_Franklin({
  subsets: ['latin'],
  weight: ['500'],
})

export default function CardGerais({
  vendas,
  lucroLiquido,
  faturamento,
  date,
}: {
  vendas: number
  lucroLiquido: number
  faturamento: number
  date: DateRange | undefined
}) {
  function formatarReal(valor: number) {
    return 'R$ ' + valor.toFixed(2).replace('.', ',')
  }

  return (
    <div className="border rounded-md p-4">
      <h1 className={cn('text-2xl pb-4', fontLibre600.className)}>
        Dados Gerais
      </h1>
      <div className="flex gap-x-4">
        <Card className="w-1/3">
          <CardHeader className="flex flex-row items-center justify-between gap-x-4">
            <div className="space-y-2">
              <CardTitle className="text-xl">Vendas</CardTitle>
              <CardDescription>
                {date?.from ? (
                  date.to ? (
                    <>
                      {format(date.from, 'dd LLL', { locale: ptBR })} -{' '}
                      {format(date.to, 'dd LLL, y', { locale: ptBR })}
                    </>
                  ) : (
                    format(date.from, 'dd LLL, y', { locale: ptBR })
                  )
                ) : (
                  <span>Escolha uma data</span>
                )}
              </CardDescription>
            </div>
            <div className="bg-roxoPreto p-2 rounded-lg">
              <FaPiggyBank size="24" className="text-roxoBrancoHover" />
            </div>
          </CardHeader>
          <CardContent>
            <h1
              className={cn(
                'text-xl mb-2 line-clamp-1 break-all',
                fontLibre600.className,
              )}
            >
              <CountUp
                preserveValue
                start={0}
                end={vendas}
                decimals={0}
                decimalPlaces={0}
              />
            </h1>
          </CardContent>
        </Card>

        <Card className="w-1/3">
          <CardHeader className="flex flex-row items-center justify-between gap-x-4">
            <div className="space-y-2">
              <CardTitle className="text-xl">Faturamento</CardTitle>
              <CardDescription>
                {date?.from ? (
                  date.to ? (
                    <>
                      {format(date.from, 'dd LLL', { locale: ptBR })} -{' '}
                      {format(date.to, 'dd LLL, y', { locale: ptBR })}
                    </>
                  ) : (
                    format(date.from, 'dd LLL, y', { locale: ptBR })
                  )
                ) : (
                  <span>Escolha uma data</span>
                )}
              </CardDescription>
            </div>
            <div className="bg-roxoPreto p-2 rounded-lg">
              <Wallet size="24" className="text-roxoBrancoHover" />
            </div>
          </CardHeader>
          <CardContent>
            <h1
              className={cn(
                'text-xl mb-2 line-clamp-1 break-all',
                fontLibre600.className,
              )}
            >
              <CountUp
                preserveValue
                start={0}
                end={faturamento}
                decimals={2}
                decimalPlaces={2}
                formattingFn={formatarReal}
              />
            </h1>
          </CardContent>
        </Card>

        <Card className="w-1/3">
          <CardHeader className="flex flex-row items-center justify-between gap-x-4">
            <div className="space-y-2">
              <CardTitle className="text-xl">Lucro Líquido</CardTitle>
              <CardDescription>
                {date?.from ? (
                  date.to ? (
                    <>
                      {format(date.from, 'dd LLL', { locale: ptBR })} -{' '}
                      {format(date.to, 'dd LLL, y', { locale: ptBR })}
                    </>
                  ) : (
                    format(date.from, 'dd LLL, y', { locale: ptBR })
                  )
                ) : (
                  <span>Escolha uma data</span>
                )}
              </CardDescription>
            </div>
            <div className="bg-roxoPreto p-2 rounded-lg">
              <CircleDollarSign size="24" className="text-roxoBrancoHover" />
            </div>
          </CardHeader>
          <CardContent>
            <h1
              className={cn(
                'text-xl mb-2 line-clamp-1 break-all',
                fontLibre600.className,
              )}
            >
              <CountUp
                preserveValue
                start={0}
                end={lucroLiquido}
                decimals={2}
                decimalPlaces={2}
                formattingFn={formatarReal}
              />
            </h1>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
