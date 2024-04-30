import HeaderHome from '@/components/header-home'
import SideBar from '@/components/sideBar/sidebar'
import { Toaster } from '@/components/ui/sonner'

export default function SideBarLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <div className="flex">
        <SideBar />
        <main className="w-full pl-[348px] pr-16 my-8">
          <HeaderHome />
          {children}
          <Toaster />
        </main>
      </div>
    </>
  )
}
