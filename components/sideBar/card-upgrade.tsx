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
    <div className="flex flex-col justify-start items-center w-[252px] h-[213px] bg-white/15 rounded-2xl relative mt-7">
      <Image
        src={blueFolder}
        height={73}
        alt=""
        className="absolute top-[-28px]"
      />
      <h1 className={cn('text-white text-base mt-16', fontLibre600.className)}>
        Upgrade Premium
      </h1>
      <p
        className={cn(
          'text-center text-xs font-normal text-white px-6 pt-2',
          fontMulish.className,
        )}
      >
        Elevate your reach to our extensive resume database
      </p>
      <Button className="w-[135px] h-10 rounded-3xl mt-4 bg-roxoBranco hover:bg-roxoBrancoHover">
        <h1 className={cn('text-white text-sm', fontLibre500.className)}>
          Upgrade Now
        </h1>
      </Button>
    </div>
  )
}
