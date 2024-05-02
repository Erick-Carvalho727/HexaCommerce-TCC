'use client'

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'
import { Label } from '@radix-ui/react-label'
import { FaGear } from 'react-icons/fa6'
import { Input } from '@/components/ui/input'

export default function SheetHomeConfig() {
  return (
    <>
      <Sheet>
        <SheetTrigger>
          {' '}
          <FaGear
            size={20}
            className="cursor-pointer fill-[#969DA6] hover:fill-[#65696e]"
          />
        </SheetTrigger>
        <SheetContent>
          <SheetHeader>
            <SheetTitle>Configurações</SheetTitle>
            <SheetDescription>
              Altere aqui suas configurações de usuário e selecione os canais
              que sua empresa trabalha.
            </SheetDescription>
          </SheetHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Name
              </Label>
              <Input id="name" value="Pedro Duarte" className="col-span-3" />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="username" className="text-right">
                Username
              </Label>
              <Input id="username" value="@peduarte" className="col-span-3" />
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </>
  )
}
