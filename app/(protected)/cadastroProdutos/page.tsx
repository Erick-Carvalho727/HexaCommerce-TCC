'use client'

import HeaderCadastroProdutos from '@/components/cadastroProdutos/header-cadastro-produtos'
import { ProductSchema } from '@/schemas'

import { Form } from '@/components/ui/form'

import * as z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
// eslint-disable-next-line camelcase
import { Libre_Franklin } from 'next/font/google'
import { cn } from '@/lib/utils'

import FormProduct from '@/components/form-product'
import { useState, useTransition } from 'react'
import FormError from '@/components/form-error'
import FormSuccess from '@/components/form-success'
import { createProduct } from '@/actions/createProduct'

const fontLibre600 = Libre_Franklin({
  subsets: ['latin'],
  weight: ['600'],
})

interface ProductResponse {
  error?: string
  success?: string
}

export default function CadastroProdutosPage() {
  const [error, setError] = useState<string | undefined>('')
  const [success, setSuccess] = useState<string | undefined>('')
  const [isPending, startTransition] = useTransition()

  const form = useForm<z.infer<typeof ProductSchema>>({
    resolver: zodResolver(ProductSchema),
    defaultValues: {
      altura: '',
      codigo: 0,
      comprimento: '',
      custo: 0,
      descricao: '',
      ean: '',
      estoque: 0,
      fabricante: '',
      largura: '',
      nomeProduto: '',
      peso: '',
      precoVenda: 0,
    },
  })

  const onSubmit = (values: z.infer<typeof ProductSchema>) => {
    setError('')
    setSuccess('')

    startTransition(() => {
      createProduct(values).then((data: ProductResponse | undefined) => {
        if (data) {
          if (data.error) {
            setError(data.error)
          }
          if (data.success) {
            setSuccess(data.success)
          }
        } else {
          setError('Ocorreu um erro desconhecido!')
        }
      })
    })
  }

  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <HeaderCadastroProdutos isPending={isPending} />
          <div className="flex gap-4">
            <div className="w-2/4 border border-black/20 rounded-2xl p-6 space-y-6">
              <h1 className={cn('text-xl', fontLibre600.className)}>
                Identificação e Estoque
              </h1>
              <div className="grid grid-col=2">
                <div className="space-y-4">
                  <FormProduct
                    control={form.control}
                    name={'codigo'}
                    label={'Código'}
                    descricao={'Coloque aqui um código para seu produto'}
                    placeholder={'Digite o código do produto'}
                    type={'number'}
                    isPending={isPending}
                  />

                  <FormProduct
                    control={form.control}
                    name={'ean'}
                    label={'ean'}
                    tooltipContent={
                      'Código de barras para identificar produtos globalmente.'
                    }
                    descricao={'Coloque aqui o EAN do produto'}
                    placeholder={'Digite o EAN do produto'}
                    type={'text'}
                    isPending={isPending}
                  />

                  <FormProduct
                    control={form.control}
                    name={'fabricante'}
                    label={'Fabricante'}
                    descricao={'Coloque aqui o fabricante do produto'}
                    placeholder={'Digite o fabricante do produto'}
                    type={'text'}
                    isPending={isPending}
                  />

                  <FormProduct
                    control={form.control}
                    name={'custo'}
                    label={'custo'}
                    descricao={'Coloque aqui o custo do produto'}
                    placeholder={'Digite o custo do produto'}
                    type={'number'}
                    isPending={isPending}
                  />

                  <FormProduct
                    control={form.control}
                    name={'precoVenda'}
                    label={'Preço de Venda'}
                    descricao={'Coloque aqui o preço de venda do produto'}
                    placeholder={'Digite o preço de venda do produto'}
                    type={'number'}
                    isPending={isPending}
                  />

                  <FormProduct
                    control={form.control}
                    name={'estoque'}
                    label={'Estoque'}
                    descricao={
                      'Coloque aqui a quantidade em estoque do produto'
                    }
                    placeholder={'Digite a quantidade em estoque do produto'}
                    type="number"
                    isPending={isPending}
                  />
                </div>
              </div>

              <div className="inset-0 flex items-center">
                <span className="w-full border-t border-black/20"></span>
              </div>

              <h1 className={cn('text-xl', fontLibre600.className)}>
                Dimensões e Peso
              </h1>

              <div className="grid grid-col=2">
                <div className="space-y-4">
                  <FormProduct
                    control={form.control}
                    name={'peso'}
                    label={'Peso'}
                    descricao={'Coloque aqui o peso do produto'}
                    placeholder={'Digite o peso do produto'}
                    type={'text'}
                    isPending={isPending}
                  />

                  <FormProduct
                    control={form.control}
                    name={'altura'}
                    label={'Altura'}
                    descricao={'Coloque aqui a altura do produto'}
                    placeholder={'Digite a altura do produto'}
                    type={'text'}
                    isPending={isPending}
                  />

                  <FormProduct
                    control={form.control}
                    name={'largura'}
                    label={'Largura'}
                    descricao={'Coloque aqui a largura do produto'}
                    placeholder={'Digite a largura do produto'}
                    type="text"
                    isPending={isPending}
                  />

                  <FormProduct
                    control={form.control}
                    name={'comprimento'}
                    label={'Comprimento'}
                    descricao={'Coloque aqui o comprimento do produto'}
                    placeholder={'Digite o comprimento do produto'}
                    type={'text'}
                    isPending={isPending}
                  />
                </div>
              </div>
            </div>

            <div className="w-2/4 h-full border border-black/20 rounded-2xl p-6 space-y-6">
              <h1 className={cn('text-xl', fontLibre600.className)}>
                Detalhes do Produto
              </h1>
              <div className="grid grid-col=2">
                <div className="space-y-4">
                  <FormProduct
                    control={form.control}
                    name={'nomeProduto'}
                    label={'Nome do Produto'}
                    descricao={'Coloque aqui o nome do produto'}
                    placeholder={'Digite o nome do produto'}
                    type={'text'}
                    isPending={isPending}
                  />

                  <FormProduct
                    control={form.control}
                    name={'descricao'}
                    label={'Descrição'}
                    descricao={'Coloque aqui a descrição do produto'}
                    placeholder={'Digite a descrição do produto'}
                    type={'text'}
                    isPending={isPending}
                  />
                </div>
              </div>
              <FormError message={error} />
              <FormSuccess message={success} />
            </div>
          </div>
        </form>
      </Form>
    </div>
  )
}
