'use client'

// eslint-disable-next-line camelcase
import { Libre_Franklin } from 'next/font/google'
import { useState, useEffect } from 'react'

import moment from 'moment'
import 'moment/locale/pt-br'
import { cn } from '@/lib/utils'
moment.locale('pt-br')

const font = Libre_Franklin({
  subsets: ['latin'],
  weight: ['500'],
})

export default function CurrentTime() {
  const [currentTime, setCurrentTime] = useState(
    moment().format('ddd, DD [de] MMM, HH:mm:ss'),
  )

  useEffect(() => {
    const timerId = setInterval(() => {
      setCurrentTime(moment().format('ddd, DD [de] MMM, HH:mm:ss'))
    }, 1000)

    return () => clearInterval(timerId)
  }, [])

  if (!currentTime) {
    return null
  }

  return (
    <p className={cn('text-black text-sm font-medium', font.className)}></p>
  )
}
