'use client'
import { useMountedState } from 'react-use'

import SheetHomeConfig from '@/components/sheet-home-config'
import SheetSales from '@/components/sheet-sales'

export const SheetProvider = () => {
  const isMounted = useMountedState()

  if (!isMounted) return null

  return (
    <>
      <SheetHomeConfig />
      <SheetSales />
    </>
  )
}
