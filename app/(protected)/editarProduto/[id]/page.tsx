'use client'

import HeaderEditarProdutos from '@/components/editarProdutos/header-editar-produtos'
import FormProduct from '@/components/form-product'
// eslint-disable-next-line camelcase
import { Libre_Franklin } from 'next/font/google'
import { cn } from '@/lib/utils'
import { useEffect, useState, useTransition } from 'react'
import { Form } from '@/components/ui/form'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { ProductSchema } from '@/schemas'
import { zodResolver } from '@hookform/resolvers/zod'
import { getProductById } from '@/data/product'
import { updateProduct } from '@/actions/updateProduct'
import { useRouter } from 'next/navigation'
import { CheckIcon } from '@radix-ui/react-icons'
import { toast } from 'sonner'

const fontLibre600 = Libre_Franklin({
  subsets: ['latin'],
  weight: ['600'],
})

interface ProductResponse {
  error?: string
  success?: string
}

export default function EditarProdutoPage({
  params,
}: {
  params: { id: string }
}) {
  const [, setError] = useState<string | undefined>('')
  const [, setSuccess] = useState<string | undefined>('')
  const [isPending, startTransition] = useTransition()
  const router = useRouter()

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

  useEffect(() => {
    startTransition(() => {
      if (params.id) {
        getProductById(params.id).then((data) => {
          form.setValue('codigo', data.product?.codigo ?? 0)
          form.setValue('ean', data.product?.ean ?? '')
          form.setValue('fabricante', data.product?.fabricante ?? '')
          form.setValue('custo', data.product?.custo ?? 0)
          form.setValue('precoVenda', data.product?.precoVenda ?? 0)
          form.setValue('estoque', data.product?.estoque ?? 0)
          form.setValue('peso', data.product?.peso ?? '')
          form.setValue('altura', data.product?.altura ?? '')
          form.setValue('largura', data.product?.largura ?? '')
          form.setValue('comprimento', data.product?.comprimento ?? '')
          form.setValue('nomeProduto', data.product?.nomeProduto ?? '')
          form.setValue('descricao', data.product?.descricao ?? '')
        })
      }
    })
  }, [params.id, form])

  const onUpdate = (values: z.infer<typeof ProductSchema>) => {
    setError('')
    setSuccess('')

    startTransition(() => {
      updateProduct(params.id, values).then(
        (data: ProductResponse | undefined) => {
          if (data) {
            if (data.error) {
              setError(data.error)
            }
            if (data.success) {
              toast(
                <div className="flex space-x-2 items-center">
                  <CheckIcon className="text-emerald-500 mr-2" />
                  <h1>{data.success}</h1>
                </div>,
              )

              router.push('/consultaProdutos')
            }
          } else {
            setError('Ocorreu um erro desconhecido!')
          }
        },
      )
    })
  }

  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onUpdate)}>
          <HeaderEditarProdutos isPending={isPending} />
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
                    isEditable={true}
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
                    isEditable={true}
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
            </div>
          </div>
        </form>
      </Form>
    </div>
  )
}
