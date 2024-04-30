'use client'

import * as z from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { RegisterSchema } from '@/schemas'
import { useState, useTransition } from 'react'
import { ReloadIcon, EyeClosedIcon, EyeOpenIcon } from '@radix-ui/react-icons'

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

import FormError from '../form-error'
import FormSuccess from '../form-success'
import { register } from '@/actions/register'

export default function RegisterForm() {
  const [error, setError] = useState<string | undefined>('')
  const [success, setSuccess] = useState<string | undefined>('')
  const [isPending, startTransition] = useTransition()
  const [isPasswordView, setIsPasswordView] = useState(false)
  const [isPasswordConfirmView, setIsPasswordConfirmView] = useState(false)

  const form = useForm<z.infer<typeof RegisterSchema>>({
    resolver: zodResolver(RegisterSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
      passwordConfirm: '',
      nameCompany: '',
    },
  })

  const onSubmit = (values: z.infer<typeof RegisterSchema>) => {
    setError('')
    setSuccess('')

    startTransition(() => {
      register(values).then((data) => {
        setError(data.error)
        setSuccess(data.success)
      })
    })
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="space-y-3">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nome</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder="Insira seu nome"
                    type="text"
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
              <FormItem className="relative">
                <FormLabel>Senha</FormLabel>
                <div className="relative">
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="********"
                      type={isPasswordView ? 'text' : 'password'}
                      disabled={isPending}
                      className="border-black focus:border-gray-400 text-white"
                    ></Input>
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

          <FormField
            control={form.control}
            name="passwordConfirm"
            render={({ field }) => (
              <FormItem className="relative">
                <FormLabel>Confirme sua Senha</FormLabel>
                <div className="relative">
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="********"
                      type={isPasswordConfirmView ? 'text' : 'password'}
                      disabled={isPending}
                      className="border-black focus:border-gray-400 text-white"
                    />
                  </FormControl>
                  <EyeClosedIcon
                    color="white"
                    className={`${isPasswordConfirmView ? 'hidden' : 'select-none cursor-pointer absolute right-3 bottom-[10px] m-0'}`}
                    onClick={() => setIsPasswordConfirmView(true)}
                  />
                  <EyeOpenIcon
                    color="white"
                    className={`${isPasswordConfirmView ? 'select-none cursor-pointer absolute right-3 bottom-[10px] m-0' : 'hidden'}`}
                    onClick={() => setIsPasswordConfirmView(false)}
                  />
                </div>
                <FormMessage className="text-red-500 font-normal" />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="nameCompany"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nome da Empresa</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder="Insira aqui o nome da sua empresa"
                    type="text"
                    disabled={isPending}
                    className="border-black focus:border-gray-400 text-white"
                  />
                </FormControl>
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
          Cadastrar
        </Button>
      </form>
    </Form>
  )
}
