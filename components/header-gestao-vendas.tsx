'use client'

// eslint-disable-next-line camelcase
import { Libre_Franklin } from 'next/font/google'
import { cn } from '@/lib/utils'

const fontLibre600 = Libre_Franklin({
  subsets: ['latin'],
  weight: ['600'],
})

export default function HeaderGestaoVendas() {
  return (
    <div className="flex justify-between items-center pb-4">
      <h1 className={cn('text-3xl', fontLibre600.className)}>
        Gestão de Vendas
      </h1>
    </div>
  )
}
