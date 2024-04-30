'use client'

import { ReloadIcon } from '@radix-ui/react-icons'
import Image from 'next/image'
import logoHexa from '@/public/HexaCommerce.svg'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

export default function Home() {
  const router = useRouter()

  useEffect(() => {
    router.push('/login')
  }, [router])

  return (
    <>
      <main className="flex items-center justify-center flex-col h-full bg-[#18181b]">
        <Image src={logoHexa} alt="" height={70} className="mb-8" />
        <div className="flex items-center px-16 py-11 rounded-2xl bg-slate-200 drop-shadow-md">
          <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
          <h1>Redirecionando para o login</h1>
        </div>
      </main>
    </>
  )
}
