'use client'

import HeaderHome from '@/components/header-home'
import SideBar from '@/components/sideBar/sidebar'
import { Toaster } from '@/components/ui/sonner'
import { useSession } from 'next-auth/react'
import { useEffect } from 'react'

export default function SideBarLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = useSession()

  useEffect(() => {
    if (session.status === 'unauthenticated') {
      window.location.href = '/login'
    }
  }, [session])

  return (
    <>
      <div className="flex">
        <SideBar />
        <main className="w-full notebook:pl-[348px] pl-[282px] pr-8 my-8">
          <HeaderHome />
          {children}
          <Toaster />
        </main>
      </div>
    </>
  )
}
