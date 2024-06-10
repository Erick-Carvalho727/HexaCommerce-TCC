import React from 'react'
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
  TooltipProps,
  LegendProps,
} from 'recharts'
// eslint-disable-next-line camelcase
import { Libre_Franklin } from 'next/font/google'
import { cn } from '@/lib/utils'
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { format } from 'date-fns'
import { DateRange } from 'react-day-picker'
import { ptBR } from 'date-fns/locale'
import { Circle, PackageX } from 'lucide-react'

const fontLibre500 = Libre_Franklin({
  subsets: ['latin'],
  weight: ['500'],
})

const CustomLegend = (props: LegendProps) => {
  const { payload } = props

  return (
    <div className="flex items-center justify-center gap-4 pt-4">
      {payload?.map((entry, index) => (
        <div key={`item-${index}`} className="flex items-center">
          <span style={{ color: entry.color, marginRight: 5 }}>
            <Circle size={10} />
          </span>
          <span className={cn('text-sm text-black/80', fontLibre500.className)}>
            {entry.value}
          </span>
        </div>
      ))}
    </div>
  )
}

const formatToBRL = (value: number | undefined) => {
  return value?.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
}

const CustomTooltip = ({
  active,
  payload,
  label,
}: TooltipProps<number, string>) => {
  if (active && payload && payload.length) {
    return (
      <div className="p-4 bg-white border rounded shadow-lg">
        <p className="font-semibold">{label}</p>
        {payload.map((entry, index) => (
          <div key={`item-${index}`} className="text-sm">
            <span className="font-medium">{entry.name}: </span>
            <span>{formatToBRL(entry.value)}</span>
          </div>
        ))}
      </div>
    )
  }

  return null
}

interface CardGraficoProps {
  dadosPorCanal: {
    [canal: string]: {
      faturamento: number
      lucroLiquido: number
    }
  }
  date: DateRange | undefined
}

export default function CardGrafico({ dadosPorCanal, date }: CardGraficoProps) {
  const data = Object.entries(dadosPorCanal).map(([canal, valores]) => ({
    canal,
    faturamento: valores.faturamento,
    lucroLiquido: valores.lucroLiquido,
  }))

  console.log(data)

  return (
    <div className="border rounded-md p-4">
      <h1 className={cn('text-2xl pb-4', fontLibre500.className)}>
        Informações por Canal
      </h1>
      <Card className="p-4">
        <CardHeader>
          <CardTitle className="text-base">
            Faturamento e Lucro Líquido por Canal
          </CardTitle>
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
        </CardHeader>
        {data.length === 0 ? (
          <Card className="mx-6 mb-6">
            <CardDescription className="p-4 flex flex-col items-center justify-center h-64">
              <PackageX size={45} className="text-black mb-4" />
              <span className={cn('text-black', fontLibre500.className)}>
                Nenhum dado encontrado nesse período
              </span>
            </CardDescription>
          </Card>
        ) : (
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={data} barCategoryGap="20%" barGap={25}>
              <XAxis
                dataKey="canal"
                tick={{
                  fontStyle: 'normal',
                  fontSize: '1rem',
                  fontWeight: '600',
                  letterSpacing: '-0.025em',
                  className: 'font-libre',
                  fill: '#313131',
                }}
              />
              <YAxis
                tick={{
                  fontStyle: 'normal',
                  fontSize: '1rem',
                  fontWeight: '600',
                  letterSpacing: '-0.025em',
                  className: 'font-libre',
                  fill: '#313131',
                }}
              />

              <Tooltip content={<CustomTooltip />} />

              <Legend content={<CustomLegend />} />
              <Bar dataKey="faturamento" name="Faturamento" fill="#A074F6" />
              <Bar
                dataKey="lucroLiquido"
                name="Lucro Líquido"
                fill="rgb(52 211 153)"
              />
            </BarChart>
          </ResponsiveContainer>
        )}
      </Card>
    </div>
  )
}
