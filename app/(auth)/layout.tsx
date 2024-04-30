import Image from 'next/image'
import logoHexa from '@/public/HexaCommerce.svg'

export default function LayoutAuthPage({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <main className="h-full flex">
        <div className="w-3/6 h-full bg-cinzaEscuro py-12 px-12 flex flex-col justify-between">
          <Image src={logoHexa} alt="" height={60} />
          <div>
            <h1 className="text-white font-semibold text-xl mb-3">
              “This library has saved me countless hours of work and helped me
              deliver stunning designs to my clients faster than ever before.”
            </h1>
            <p className="text-white">HexaCommerce</p>
          </div>
        </div>
        <div className="w-3/6 h-full bg-Preto flex items-center justify-center">
          {children}
        </div>
      </main>
    </>
  )
}
