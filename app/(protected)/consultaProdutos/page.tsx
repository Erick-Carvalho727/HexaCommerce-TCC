'use client'

import { getProducts } from '@/actions/selectProduct'
import { RefreshContext } from '@/app/context/product'
import { columns } from '@/components/consultaProdutos/columns'
import { DataTable } from '@/components/consultaProdutos/data-table'
import HeaderConsultaProdutos from '@/components/consultaProdutos/header-consulta-produtos'
import { useContext, useEffect, useState, useTransition } from 'react'
import { z } from 'zod'

export const ProductSchemaSelector = z.object({
  id: z.number(),
  codigo: z.string(),
  fabricante: z.string().nullable(),
  peso: z.string().nullable(),
  altura: z.string().nullable(),
  largura: z.string().nullable(),
  comprimento: z.string().nullable(),
  nomeProduto: z.string().nullable(),
  ean: z.string().nullable(),
  custo: z.number(),
  estoque: z.number(),
  createdAt: z.date(),
  precoVenda: z.number(),
})

interface ProductResponse {
  products?: z.infer<typeof ProductSchemaSelector>[]
  error?: string
  success?: string
}

export default function ConsultaProdutosPage() {
  const [error, setError] = useState<string | undefined>('')
  const [success, setSuccess] = useState<string | undefined>('')
  const [isPending, startTransition] = useTransition()
  const [products, setProducts] = useState<
    z.infer<typeof ProductSchemaSelector>[]
  >([])
  const { refreshProducts, setRefreshProducts } = useContext(RefreshContext)

  const listProducts = () => {
    startTransition(() => {
      getProducts()
        .then((data: ProductResponse) => {
          console.log(data.products)
          if (data.error) setError(data.error)
          if (data.products) setProducts(data.products)
          if (data.success) setSuccess(data.success)
        })
        .catch((e) => setError(e))
    })
  }

  useEffect(() => {
    listProducts()
    setRefreshProducts(false)
  }, [refreshProducts, setRefreshProducts])

  return (
    <div>
      <HeaderConsultaProdutos />
      {error && <p>Erro: {error}</p>}
      {success && <p>{success}</p>}
      {isPending && <p>Carregando...</p>}
      <DataTable columns={columns} data={products} />
    </div>
  )
}
