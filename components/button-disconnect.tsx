'use client'
// eslint-disable-next-line camelcase
import { Libre_Franklin } from 'next/font/google'
import { cn } from '@/lib/utils'
import { Button } from './ui/button'
import { useTransition } from 'react'
import { logout } from '@/actions/logout'

const font = Libre_Franklin({
  subsets: ['latin'],
  weight: ['500'],
})

export default function ButtonDisconnect() {
  const [isPending, startTransition] = useTransition()

  const handleSignOut = () => {
    startTransition(() => {
      logout()
    })
  }

  return (
    <form action={handleSignOut}>
      <Button
        size={'none'}
        disabled={isPending}
        className="px-4 py-1 bg-black hover:bg-[#65696e]"
      >
        <p className={cn('text-white text-sm font-medium', font.className)}>
          Sair
        </p>
      </Button>
    </form>
  )
}
