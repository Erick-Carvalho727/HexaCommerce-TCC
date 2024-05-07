'use client'

import Image from 'next/image'

import logoHexa from '@/public/HexaCommerce.svg'
import imagemTeste from '@/public/img.svg'
import iconHome from '@/public/iconHome.svg'
import iconCadastroProdutos from '@/public/iconCadastroProdutos.svg'
import iconGestaoVenda from '@/public/iconGestaoVenda.svg'
import iconRealizarVenda from '@/public/iconRealizarVenda.svg'
import ButtonSideBar from './button-sidebar'
import CardUpgrade from './card-upgrade'
// eslint-disable-next-line camelcase
import { Libre_Franklin, Mulish } from 'next/font/google'
import { cn } from '@/lib/utils'
import { useCurrentUser } from '@/hooks/use-current-user'

const fontMulish400 = Mulish({
  subsets: ['latin'],
  weight: ['400'],
})

const fontLibre600 = Libre_Franklin({
  subsets: ['latin'],
  weight: ['600'],
})

const fontLibre500 = Libre_Franklin({
  subsets: ['latin'],
  weight: ['500'],
})

export default function SideBar() {
  const user = useCurrentUser()

  return (
    <aside className="w-[316px] min-w-[316px] h-screen bg-black flex flex-col justify-evenly items-center fixed">
      <Image src={logoHexa} alt="" height={45} />
      <div className="flex items-center justify-center flex-col">
        <Image
          src={imagemTeste}
          alt=""
          height={70}
          width={70}
          className="mb-4"
        />
        <h1 className={cn('text-white text-base', fontLibre600.className)}>
          {user?.name}
        </h1>
        <p className={cn('text-white text-xs', fontLibre500)}>{user?.email}</p>
      </div>
      <div className="space-y-4 flex flex-col justify-center items-center">
        <ButtonSideBar link="/home" icon={iconHome} title="Home" />
        <ButtonSideBar
          link="/gestaoVendas"
          icon={iconGestaoVenda}
          title="Gestão de Vendas"
        />
        <ButtonSideBar
          link="/cadastroProdutos"
          icon={iconCadastroProdutos}
          title="Cadastro de Produtos"
        />
        <ButtonSideBar icon={iconRealizarVenda} title="Realizar uma Venda" />
      </div>
      <div>
        <CardUpgrade />
      </div>
      <p
        className={cn(
          'text-center text-white text-[#F4F5F7]/60 font-normal text-xs px-8',
          fontMulish400.className,
        )}
      >
        Copyright © 2024 By Erick. All Rights Reserved
      </p>
    </aside>
  )
}
