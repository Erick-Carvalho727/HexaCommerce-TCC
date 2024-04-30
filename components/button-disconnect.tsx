import { signOut } from '@/auth'
// eslint-disable-next-line camelcase
import { Libre_Franklin } from 'next/font/google'
import { cn } from '@/lib/utils'
import { Button } from './ui/button'

const font = Libre_Franklin({
  subsets: ['latin'],
  weight: ['500'],
})

export default async function ButtonDisconnect() {
  return (
    <form
      action={async () => {
        'use server'

        await signOut({ redirectTo: '/login' })
      }}
    >
      <Button size={'none'} className="px-4 py-1 bg-black hover:bg-[#65696e]">
        <p className={cn('text-white text-sm font-medium', font.className)}>
          Sair
        </p>
      </Button>
    </form>
  )
}
