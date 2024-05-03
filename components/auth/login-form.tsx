'use client'

import * as z from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { LoginSchema } from '@/schemas'
import { useEffect, useState, useTransition } from 'react'

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { EyeClosedIcon, EyeOpenIcon, ReloadIcon } from '@radix-ui/react-icons'
import FormError from '../form-error'
import FormSuccess from '../form-success'
import { login } from '@/actions/login'

interface LoginResponse {
  error?: string
  success?: string
}

export default function LoginForm() {
  const [error, setError] = useState<string | undefined>('')
  const [success, setSuccess] = useState<string | undefined>('')
  const [isPending, startTransition] = useTransition()
  const [isPasswordView, setIsPasswordView] = useState(false)

  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  })

  const onSubmit = (values: z.infer<typeof LoginSchema>) => {
    setError('')
    setSuccess('')

    startTransition(() => {
      login(values).then((data: LoginResponse | undefined) => {
        if (data) {
          if (data.error) {
            setError(data.error)
          }
        }
      })
    })
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="space-y-3">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder="exemplo@exemplo.com"
                    type="email"
                    disabled={isPending}
                    className="border-black focus:border-gray-400 text-white"
                  />
                </FormControl>
                <FormMessage className="text-red-500 font-normal" />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Senha</FormLabel>
                <div className="relative">
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="********"
                      type={isPasswordView ? 'text' : 'password'}
                      disabled={isPending}
                      className="border-black focus:border-gray-400 text-white"
                    />
                  </FormControl>
                  <EyeClosedIcon
                    color="white"
                    className={`${isPasswordView ? 'hidden' : 'select-none cursor-pointer absolute right-3 bottom-[10px] m-0'}`}
                    onClick={() => setIsPasswordView(true)}
                  />
                  <EyeOpenIcon
                    color="white"
                    className={`${isPasswordView ? 'select-none cursor-pointer absolute right-3 bottom-[10px] m-0' : 'hidden'}`}
                    onClick={() => setIsPasswordView(false)}
                  />
                </div>
                <FormMessage className="text-red-500 font-normal" />
              </FormItem>
            )}
          />
        </div>

        <FormError message={error} />
        <FormSuccess message={success} />

        <Button
          type="submit"
          disabled={isPending}
          className="w-full bg-roxoBranco hover:bg-roxoBrancoHover"
        >
          <ReloadIcon
            className={`${isPending ? 'mr-2 h-4 w-4 animate-spin' : 'hidden'}`}
          />
          Login
        </Button>
      </form>
    </Form>
  )
}
