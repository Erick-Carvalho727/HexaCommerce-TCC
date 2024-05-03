'use client'

import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'
import { FaGear } from 'react-icons/fa6'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from '@/components/ui/form'
import { UserSchemaConfig } from '@/schemas'
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Input } from '@/components/ui/input'
import { Button } from './ui/button'
import { ReloadIcon } from '@radix-ui/react-icons'
import { FaSave } from 'react-icons/fa'
import { Dispatch, SetStateAction, useState, useTransition } from 'react'
// eslint-disable-next-line camelcase
import { Libre_Franklin } from 'next/font/google'
import { cn } from '@/lib/utils'
import { settings } from '@/actions/settings'
import { useSession } from 'next-auth/react'
import { useCurrentUser } from '@/hooks/use-current-user'
import { currentUser } from '@/lib/auth'

const fontLibre500 = Libre_Franklin({
  subsets: ['latin'],
  weight: ['500'],
})

export default function SheetHomeConfig() {
  const user = useCurrentUser()

  const [error, setError] = useState<string | undefined>('')
  const [success, setSuccess] = useState<string | undefined>('')
  const [isPending, startTransition] = useTransition()
  const { update } = useSession()

  const form = useForm<z.infer<typeof UserSchemaConfig>>({
    resolver: zodResolver(UserSchemaConfig),
    defaultValues: {
      name: user?.name || undefined,
    },
  })

  const onSubmit = (values: z.infer<typeof UserSchemaConfig>) => {
    console.log(values)

    startTransition(() => {
      settings(values).then((data) => {
        if (data.error) {
          setError(data.error)
        }
        if (data.success) {
          update()
          setSuccess(data.success)
        }
      })
    })
  }

  return (
    <>
      <Sheet>
        <SheetTrigger>
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
          <div>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)}>
                <div className="space-y-4 mt-4">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Nome</FormLabel>
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
                <SheetFooter>
                  <SheetClose>
                    <Button className="mt-6" type="submit">
                      Save changes
                    </Button>
                  </SheetClose>
                </SheetFooter>
              </form>
            </Form>
          </div>
        </SheetContent>
      </Sheet>
    </>
  )
}
