'use client'

import CurrentTime from './current-time'
import ButtonDisconnect from './button-disconnect'
// eslint-disable-next-line camelcase
import { Libre_Franklin } from 'next/font/google'
import { cn } from '@/lib/utils'
import { useCurrentUser } from '@/hooks/use-current-user'
import { FaGear } from 'react-icons/fa6'
import { useNewSettings } from '@/features/use-new-settings'

const fontLibre600 = Libre_Franklin({
  subsets: ['latin'],
  weight: ['500'],
})

export default function HeaderHome() {
  const user = useCurrentUser()
  const { onOpen } = useNewSettings()

  return (
    <div className="mb-8 h-11 border border-black/20 rounded-2xl flex items-center justify-between px-6">
      <FaGear
        size={20}
        className="cursor-pointer fill-[#969DA6] hover:fill-[#65696e]"
        onClick={onOpen}
      />
      <div>
        <h1
          className={cn(
            'text-black text-base select-none',
            fontLibre600.className,
          )}
        >
          {user?.nameCompany}
        </h1>
      </div>

      <div className="flex items-center gap-4">
        <CurrentTime />
        <ButtonDisconnect />
      </div>
    </div>
  )
}
