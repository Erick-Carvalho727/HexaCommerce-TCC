/* eslint-disable camelcase */
'use client'

import Image from 'next/image'
import { Button } from '../ui/button'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Libre_Franklin } from 'next/font/google'
import { cn } from '@/lib/utils'
import { useNewSales } from '@/features/use-new-sales'

interface ButtonProps {
  icon: string
  title: string
  link?: string | undefined
}

const fontLibre600 = Libre_Franklin({
  subsets: ['latin'],
  weight: ['600'],
})

export default function ButtonSideBar({ icon, title, link }: ButtonProps) {
  const router = usePathname()
  const { onOpen } = useNewSales()

  const isActive = router.match(link ?? '')

  return (
    <>
      {link ? (
        <Link href={link} passHref>
          <Button
            size="none"
            className={`w-52 notebook:w-60 rounded-3xl bg-black shadow-none hover:bg-roxoBrancoHover hover:shadow-sm justify-start px-7 whitespace-normal ${
              isActive
                ? 'bg-roxoBranco'
                : ' focus:bg-roxoBranco active:bg-roxoBranco'
            }`}
          >
            <Image src={icon} height={16} width={16} alt="" />
            <h1
              className={cn(
                'text-[#E0E4EA] text-xs notebook:text-sm pl-2 notebook:pl-4 py-2 text-left',
                fontLibre600.className,
              )}
            >
              {title}
            </h1>
          </Button>
        </Link>
      ) : (
        <Button
          size="none"
          className="w-52 notebook:w-60 rounded-3xl bg-black shadow-none hover:bg-roxoBrancoHover hover:shadow-sm justify-start px-7 whitespace-normal active:bg-roxoBranco"
          onClick={onOpen}
        >
          <Image src={icon} height={16} width={16} alt="" />
          <h1
            className={cn(
              'text-[#E0E4EA] text-xs notebook:text-sm pl-2 notebook:pl-4 py-2 text-left',
              fontLibre600.className,
            )}
          >
            {title}
          </h1>
        </Button>
      )}
    </>
  )
}
