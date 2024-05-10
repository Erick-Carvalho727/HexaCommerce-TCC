'use client'

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from '@/components/ui/form'
import { UserSchemaConfig } from '@/schemas'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Input } from '@/components/ui/input'
import { Button } from './ui/button'
import { useEffect, useState, useTransition } from 'react'
// eslint-disable-next-line camelcase
import { Libre_Franklin } from 'next/font/google'
import { cn } from '@/lib/utils'
import { settings } from '@/actions/settings'
import { useSession } from 'next-auth/react'
import { useCurrentUser } from '@/hooks/use-current-user'
import ToggleButton from '@mui/material/ToggleButton'
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup'
import logoMl from '@/public/logo-ml.png'
import logoShopee from '@/public/logo-shopee.png'
import logoMagalu from '@/public/logo-magalu.png'
import logoAmazon from '@/public/logo-amazon.svg'
import Image from 'next/image'
import { ReloadIcon } from '@radix-ui/react-icons'
import { useNewSettings } from '@/features/use-new-settings'
import { toast } from 'sonner'
import { Check, X } from 'lucide-react'

const fontLibre500 = Libre_Franklin({
  subsets: ['latin'],
  weight: ['500'],
})

export default function SheetHomeConfig() {
  const user = useCurrentUser()

  const [formats, setFormats] = useState<string[]>(() => [])
  const [isPending, startTransition] = useTransition()
  const { isOpen, onClose } = useNewSettings()
  const { update } = useSession()

  const form = useForm<z.infer<typeof UserSchemaConfig>>({
    resolver: zodResolver(UserSchemaConfig),
    defaultValues: {
      name: user?.name || undefined,
      email: user?.email || undefined,
      nameCompany: user?.nameCompany || undefined,
      canais: user?.canais || undefined,
    },
  })

  useEffect(() => {
    if (isOpen === true) {
      setFormats(user?.canais || [])
      form.reset({
        name: user?.name || undefined,
        email: user?.email || undefined,
        nameCompany: user?.nameCompany || undefined,
        canais: formats || undefined,
      })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen, form, user?.canais, user?.email, user?.name, user?.nameCompany])

  const onSubmit = (values: z.infer<typeof UserSchemaConfig>) => {
    const formData = {
      ...values,
      canais: formats,
    }

    startTransition(() => {
      settings(formData).then((data) => {
        if (data.error) {
          const success = false
          abrirToast(data.error, success)
        }
        if (data.success) {
          update()
          onClose()
          const success = true
          abrirToast(data.success, success)
        }
      })
    })
  }

  const abrirToast = (message: string, type: boolean) => {
    toast(
      <div className="flex space-x-2 items-center">
        {type === true ? (
          <>
            <Check className="text-emerald-500" />
            <h1>{message}</h1>
          </>
        ) : (
          <>
            <X className="text-emerald-500" />
            <h1>{message}</h1>
          </>
        )}
      </div>,
    )
  }

  const handleFormat = (
    event: React.MouseEvent<HTMLElement>,
    newFormats: string[],
  ) => {
    setFormats(newFormats)
  }

  return (
    <>
      <Sheet open={isOpen} onOpenChange={onClose}>
        <SheetContent>
          <SheetHeader>
            <SheetTitle>Configurações</SheetTitle>
            <SheetDescription>
              Altere aqui suas configurações de usuário e selecione os canais
              que sua empresa trabalha.
            </SheetDescription>
          </SheetHeader>
          <div>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)}>
                <div className="space-y-4 mt-4">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
                          {' '}
                          <p
                            className={cn(
                              'uppercase text-black text-sm',
                              fontLibre500.className,
                            )}
                          >
                            Nome
                          </p>
                        </FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            disabled={isPending}
                            type="text"
                            placeholder="shadcn"
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
                          <p
                            className={cn(
                              'uppercase text-black text-sm',
                              fontLibre500.className,
                            )}
                          >
                            Email
                          </p>
                        </FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            disabled={isPending}
                            type="text"
                            placeholder="shadcn"
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="nameCompany"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
                          <p
                            className={cn(
                              'uppercase text-black text-sm',
                              fontLibre500.className,
                            )}
                          >
                            Nome da Empresa
                          </p>
                        </FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            disabled={isPending}
                            type="text"
                            placeholder="shadcn"
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                </div>
                <div className="mt-8">
                  <p
                    className={cn(
                      'uppercase text-black text-sm mb-2',
                      fontLibre500.className,
                    )}
                  >
                    Canais
                  </p>
                  <ToggleButtonGroup
                    orientation="vertical"
                    value={formats}
                    onChange={handleFormat}
                    aria-label="text formatting"
                    className="w-full"
                  >
                    <ToggleButton value="Mercado Livre" aria-label="bold">
                      <div className="flex items-center gap-3">
                        <Image
                          src={logoMl}
                          height={25}
                          alt=""
                          className="py-2"
                        />
                      </div>
                    </ToggleButton>
                    <ToggleButton value="Shopee" aria-label="italic">
                      <div className="flex items-center gap-3">
                        <Image
                          src={logoShopee}
                          height={25}
                          alt=""
                          className="py-2"
                        />
                      </div>
                    </ToggleButton>
                    <ToggleButton value="Magalu" aria-label="underlined">
                      <div className="flex items-center gap-3">
                        <Image
                          src={logoMagalu}
                          height={18}
                          alt=""
                          className="mt-1 py-2"
                        />
                      </div>
                    </ToggleButton>
                    <ToggleButton value="Amazon" aria-label="color">
                      <Image
                        src={logoAmazon}
                        height={18}
                        alt=""
                        className="py-2"
                      />
                    </ToggleButton>
                  </ToggleButtonGroup>
                </div>
                <SheetFooter>
                  <div className="flex flex-col w-full">
                    <Button disabled={isPending} type="submit" className="mt-4">
                      <ReloadIcon
                        className={`${isPending ? 'mr-2 h-4 w-4 animate-spin' : 'hidden'}`}
                      />
                      <p className={cn('pl-1', fontLibre500.className)}>
                        Salvar Informações
                      </p>
                    </Button>
                    <div className="mt-4"></div>
                  </div>
                </SheetFooter>
              </form>
            </Form>
          </div>
        </SheetContent>
      </Sheet>
    </>
  )
}
