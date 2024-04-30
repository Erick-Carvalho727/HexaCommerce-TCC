import { Button } from '../ui/button'
// eslint-disable-next-line camelcase
import { Libre_Franklin } from 'next/font/google'
import { cn } from '@/lib/utils'
import { FaSave } from 'react-icons/fa'
import { Cross1Icon, ReaderIcon, ReloadIcon } from '@radix-ui/react-icons'
import { useRouter } from 'next/navigation'

const fontLibre600 = Libre_Franklin({
  subsets: ['latin'],
  weight: ['600'],
})

const fontLibre500 = Libre_Franklin({
  subsets: ['latin'],
  weight: ['500'],
})

interface HeaderCadastroProdutosProps {
  isPending: boolean
}

export default function HeaderCadastroProdutos({
  isPending,
}: HeaderCadastroProdutosProps) {
  const router = useRouter()

  const onClickConsultarProdutos = () => {
    router.push('/consultaProdutos')
  }

  return (
    <div className="flex justify-between items-center pb-4">
      <h1 className={cn('text-3xl', fontLibre600.className)}>
        Cadastro de Produtos
      </h1>
      <div className="flex gap-4">
        <Button
          disabled={isPending}
          type="button"
          onClick={onClickConsultarProdutos}
          className=" text-white hover:text-white hover:bg-[#494c50]"
        >
          <ReaderIcon height={12} width={12} />
          <p className={cn('pl-1', fontLibre500.className)}>
            Consultar Produtos
          </p>
        </Button>

        <Button
          disabled={isPending}
          type="button"
          className="bg-roxoClaro text-roxoBranco hover:text-white hover:bg-destructive"
        >
          <Cross1Icon height={12} width={12} />
          <p className={cn('pl-1', fontLibre500.className)}>Cancelar</p>
        </Button>

        <Button
          disabled={isPending}
          type="submit"
          className="bg-roxoBranco hover:bg-emerald-500"
        >
          <ReloadIcon
            className={`${isPending ? 'mr-2 h-4 w-4 animate-spin' : 'hidden'}`}
          />
          <FaSave size={12} className={`${isPending ? 'hidden' : 'block'}`} />
          <p className={cn('pl-1', fontLibre500.className)}>Salvar</p>
        </Button>
      </div>
    </div>
  )
}
