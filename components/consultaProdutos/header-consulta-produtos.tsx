'use client'

import { Button } from '../ui/button'
// eslint-disable-next-line camelcase
import { Libre_Franklin } from 'next/font/google'
import { cn } from '@/lib/utils'
import { FilePlusIcon } from '@radix-ui/react-icons'
import { useRouter } from 'next/navigation'

const fontLibre600 = Libre_Franklin({
  subsets: ['latin'],
  weight: ['600'],
})

const fontLibre500 = Libre_Franklin({
  subsets: ['latin'],
  weight: ['500'],
})

export default function HeaderConsultaProdutos() {
  const router = useRouter()

  const onClickConsultarProdutos = () => {
    router.push('/cadastroProdutos')
  }

  return (
    <div className="flex justify-between items-center pb-4">
      <h1 className={cn('text-3xl', fontLibre600.className)}>
        Consulta de Produtos
      </h1>
      <div className="flex gap-4">
        <Button
          type="button"
          onClick={onClickConsultarProdutos}
          className=" text-white hover:text-white hover:bg-[#494c50]"
        >
          <FilePlusIcon height={12} width={12} />
          <p className={cn('pl-1', fontLibre500.className)}>
            Cadastrar Produto
          </p>
        </Button>
      </div>
    </div>
  )
}
