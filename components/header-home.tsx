import { FaGear } from 'react-icons/fa6'
import CurrentTime from './current-time'
import ButtonDisconnect from './button-disconnect'
import { auth } from '@/auth'
// eslint-disable-next-line camelcase
import { Libre_Franklin } from 'next/font/google'
import { cn } from '@/lib/utils'

const fontLibre600 = Libre_Franklin({
  subsets: ['latin'],
  weight: ['500'],
})

export default async function HeaderHome() {
  const session = await auth()

  return (
    <div className="mb-8 h-11 border border-black/20 rounded-2xl flex items-center justify-between px-6">
      <FaGear
        size={20}
        className="cursor-pointer fill-[#969DA6] hover:fill-[#65696e]"
      />
      <div>
        <h1
          className={cn(
            'text-black text-base select-none',
            fontLibre600.className,
          )}
        >
          {session?.user.nameCompany}
        </h1>
      </div>
      <div className="flex items-center gap-4">
        <CurrentTime />
        <ButtonDisconnect />
      </div>
    </div>
  )
}
