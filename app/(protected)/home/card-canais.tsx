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
import { CountUp } from './count-up'
import logoMl from '@/public/logo-ml.png'
import logoShopee from '@/public/logo-shopee.png'
import logoMagalu from '@/public/logo-magalu.png'
import logoAmazon from '@/public/logo-amazon.svg'
import Image from 'next/image'
import { DateRange } from 'react-day-picker'
import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'

interface CardCanaisProps {
  vendasPorCanal: {
    [canal: string]: number
  }
  date: DateRange | undefined
}

const fontLibre600 = Libre_Franklin({
  subsets: ['latin'],
  weight: ['500'],
})

export default function CardCanais({ vendasPorCanal, date }: CardCanaisProps) {
  const pedidosFormatados = (value: number) => {
    return value === 1 ? `${value} pedido` : `${value} pedidos`
  }

  return (
    <div className="border rounded-md p-4">
      <h1 className={cn('text-2xl pb-4', fontLibre600.className)}>
        Pedidos por Canal
      </h1>
      <div className="flex gap-x-4">
        <Card className="w-1/3">
          <CardHeader className="flex flex-col gap-x-4">
            <div className="space-y-2">
              <CardTitle className="text-base">Mercado Livre</CardTitle>
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
              <Image src={logoMl} height={20} alt="" className="pt-1" />
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
                end={vendasPorCanal['Mercado Livre']}
                decimals={0}
                decimalPlaces={0}
                formattingFn={pedidosFormatados}
              />
            </h1>
          </CardContent>
        </Card>

        <Card className="w-1/3">
          <CardHeader className="flex flex-col gap-x-4">
            <div className="space-y-2">
              <CardTitle className="text-base">Shopee</CardTitle>
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
              <Image src={logoShopee} height={20} alt="" className="pt-1" />
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
                end={vendasPorCanal.Shopee}
                decimals={0}
                decimalPlaces={0}
                formattingFn={pedidosFormatados}
              />
            </h1>
          </CardContent>
        </Card>

        <Card className="w-1/3">
          <CardHeader className="flex flex-col gap-x-4">
            <div className="space-y-2">
              <CardTitle className="text-base">Magalu</CardTitle>
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
              <Image src={logoMagalu} height={14} alt="" className="pt-1" />
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
                end={vendasPorCanal.Magalu}
                decimals={0}
                decimalPlaces={0}
                formattingFn={pedidosFormatados}
              />
            </h1>
          </CardContent>
        </Card>

        <Card className="w-1/3">
          <CardHeader className="flex flex-col gap-x-4">
            <div className="space-y-2">
              <CardTitle className="text-base">Amazon</CardTitle>
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
              <Image src={logoAmazon} height={14} alt="" className="pt-1" />
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
                end={vendasPorCanal.Amazon}
                decimals={0}
                decimalPlaces={0}
                formattingFn={pedidosFormatados}
              />
            </h1>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
