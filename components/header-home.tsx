import CurrentTime from './current-time'
import ButtonDisconnect from './button-disconnect'
// eslint-disable-next-line camelcase
import { Libre_Franklin } from 'next/font/google'
import { cn } from '@/lib/utils'
import SheetHomeConfig from './sheet-home-config'
import { currentUser } from '@/lib/auth'

const fontLibre600 = Libre_Franklin({
  subsets: ['latin'],
  weight: ['500'],
})

export default async function HeaderHome() {
  const user = await currentUser()

  return (
    <div className="mb-8 h-11 border border-black/20 rounded-2xl flex items-center justify-between px-6">
      <SheetHomeConfig />
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
