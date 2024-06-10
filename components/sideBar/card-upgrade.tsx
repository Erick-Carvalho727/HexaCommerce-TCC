import Image from 'next/image'
import { Button } from '../ui/button'
// eslint-disable-next-line camelcase
import { Libre_Franklin, Mulish } from 'next/font/google'
import { cn } from '@/lib/utils'

import blueFolder from '@/public/blueFolder.svg'

const fontLibre600 = Libre_Franklin({
  subsets: ['latin'],
  weight: ['600'],
})

const fontLibre500 = Libre_Franklin({
  subsets: ['latin'],
  weight: ['500'],
})

const fontMulish = Mulish({
  subsets: ['latin'],
  weight: ['500'],
})

export default function CardUpgrade() {
  return (
    <div className="flex flex-col justify-start items-center notebook:w-[252px] w-[200px] h-[213px] bg-white/15 rounded-2xl relative mt-7">
      <Image
        src={blueFolder}
        height={73}
        alt=""
        className="absolute top-[-28px] hidden notebook:block"
      />
      <Image
        src={blueFolder}
        height={65}
        alt=""
        className="absolute top-[-22px] block notebook:hidden"
      />
      <h1
        className={cn(
          'text-white notebook:text-base text-sm mt-16',
          fontLibre600.className,
        )}
      >
        Exclusive Upgrade
      </h1>
      <p
        className={cn(
          'text-center text-xs font-normal text-white px-6 pt-2',
          fontMulish.className,
        )}
      >
        Melhore a sua experiência adicionando mais canais de vendas!
      </p>
      <Button className="notebook:w-[135px] w-[120px] h-8 notebook:h-10 rounded-3xl mt-4 bg-roxoBranco hover:bg-roxoBrancoHover">
        <h1
          className={cn(
            'text-white notebook:text-sm text-xs',
            fontLibre500.className,
          )}
        >
          Realizar Upgrade
        </h1>
      </Button>
    </div>
  )
}
