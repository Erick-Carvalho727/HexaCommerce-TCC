'use client'

import { createContext, useState, Dispatch, SetStateAction } from 'react'

interface ContextProps {
  refreshProducts: boolean
  setRefreshProducts: Dispatch<SetStateAction<boolean>>
}

export const RefreshContext = createContext<ContextProps>({
  refreshProducts: false,
  setRefreshProducts: () => {},
})

export const RefreshProvider = ({
  children,
}: {
  children: React.ReactNode
}) => {
  const [refreshProducts, setRefreshProducts] = useState<boolean>(false)

  return (
    <RefreshContext.Provider value={{ refreshProducts, setRefreshProducts }}>
      {children}
    </RefreshContext.Provider>
  )
}
