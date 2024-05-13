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
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Button } from './ui/button'
// eslint-disable-next-line camelcase
import { Libre_Franklin } from 'next/font/google'
import { cn } from '@/lib/utils'
import { ReloadIcon } from '@radix-ui/react-icons'
import { useNewSales } from '@/features/use-new-sales'
import { useForm } from 'react-hook-form'
import { useEffect, useState, useTransition } from 'react'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { ProductSchemaSelector, SaleSchema } from '@/schemas'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useCurrentUser } from '@/hooks/use-current-user'
import { getProducts } from '@/actions/selectProduct'
import { createSale } from '@/actions/createSale'
import { toast } from 'sonner'
import { Check, X } from 'lucide-react'

const fontLibre500 = Libre_Franklin({
  subsets: ['latin'],
  weight: ['500'],
})

interface ProductResponse {
  products?: z.infer<typeof ProductSchemaSelector>[]
  error?: string
  success?: string
}

type Product = {
  nomeProduto: string
  estoque: number
}

export default function SheetSales() {
  const user = useCurrentUser()

  const { isOpen, onClose } = useNewSales()
  const [isPending, startTransition] = useTransition()
  const [selectedProduct, setSelectedProduct] = useState<Product | undefined>(
    undefined,
  )
  const [products, setProducts] = useState<
    { nomeProduto: string; estoque: number }[]
  >([])

  const getProductsList = () => {
    startTransition(() => {
      getProducts().then((data: ProductResponse) => {
        if (data.products) {
          const productDetails = data.products.map((product) => ({
            nomeProduto: product.nomeProduto || 'Nome não disponível',
            estoque: product.estoque,
          }))
          setProducts(productDetails)
        }
      })
    })
  }

  const form = useForm<z.infer<typeof SaleSchema>>({
    resolver: zodResolver(SaleSchema),
    defaultValues: {
      nomeProduto: '',
      quantidade: 0,
      canal: '',
      status: '',
    },
  })

  useEffect(() => {
    if (isOpen) {
      getProductsList()
      form.reset()
      setSelectedProduct(undefined)
    }
  }, [isOpen, form])

  const onSubmit = (values: z.infer<typeof SaleSchema>) => {
    startTransition(() => {
      createSale(values).then((data) => {
        if (data.error) {
          onClose()
          const success = false
          abrirToast(data.error, success)
        }
        if (data.success) {
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

  return (
    <>
      <Sheet open={isOpen} onOpenChange={onClose}>
        <SheetContent>
          <SheetHeader>
            <SheetTitle>Realizar uma Venda</SheetTitle>
            <SheetDescription>
              Insira as informações da venda para continuar
            </SheetDescription>
          </SheetHeader>
          <div>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)}>
                <div className="space-y-4 mt-4">
                  <FormField
                    control={form.control}
                    name="nomeProduto"
                    render={({ field }) => {
                      return (
                        <FormItem>
                          <FormLabel>
                            {' '}
                            <p
                              className={cn(
                                'uppercase text-black text-sm',
                                fontLibre500.className,
                              )}
                            >
                              Produto
                            </p>
                          </FormLabel>
                          <Select
                            onValueChange={(value) => {
                              field.onChange(value)
                              const product = products.find(
                                (p) => p.nomeProduto === value,
                              )
                              setSelectedProduct(product)
                            }}
                            defaultValue=""
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Selecione o produto" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {products.map((product, index) => (
                                <SelectItem
                                  key={index}
                                  value={product.nomeProduto}
                                >
                                  {product.nomeProduto}
                                </SelectItem>
                              ))}
                            </SelectContent>
                            {selectedProduct && (
                              <FormDescription>
                                Estoque do produto: {selectedProduct.estoque}
                              </FormDescription>
                            )}
                          </Select>
                        </FormItem>
                      )
                    }}
                  />
                  <FormField
                    control={form.control}
                    name="quantidade"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
                          <p
                            className={cn(
                              'uppercase text-black text-sm',
                              fontLibre500.className,
                            )}
                          >
                            Quantidade de Produtos
                          </p>
                        </FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            disabled={isPending}
                            type="number"
                            placeholder="Informe a quantidade de produtos vendidos"
                            onChange={(e) => {
                              const value = parseFloat(e.target.value)
                              field.onChange(value)
                            }}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="canal"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
                          <p
                            className={cn(
                              'uppercase text-black text-sm',
                              fontLibre500.className,
                            )}
                          >
                            Canal de Venda
                          </p>
                        </FormLabel>
                        <FormControl>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger disabled={isPending}>
                                <SelectValue placeholder="Selecione o canal que o produto foi vendido" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {user?.canais?.map((canal, index) => (
                                <SelectItem key={index} value={canal}>
                                  {canal}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="status"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
                          <p
                            className={cn(
                              'uppercase text-black text-sm',
                              fontLibre500.className,
                            )}
                          >
                            Status da Venda
                          </p>
                        </FormLabel>
                        <FormControl>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger disabled={isPending}>
                                <SelectValue placeholder="Selecione o Status da Venda" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="Concluído">
                                Concluído
                              </SelectItem>
                              <SelectItem value="Aguardando Pagamento">
                                Aguardando Pagamento
                              </SelectItem>
                              <SelectItem value="Cancelado">
                                Cancelado
                              </SelectItem>
                            </SelectContent>
                          </Select>
                        </FormControl>
                      </FormItem>
                    )}
                  />
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
