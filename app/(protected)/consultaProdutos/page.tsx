'use client'

import { deleteProduct } from '@/actions/deleteProduct'
import { getProducts } from '@/actions/selectProduct'
import { createColumns } from '@/components/consultaProdutos/columns'
import { DataTable } from '@/components/consultaProdutos/data-table'
import HeaderConsultaProdutos from '@/components/consultaProdutos/header-consulta-produtos'
import { ProductSchemaSelector } from '@/schemas'
import { useEffect, useState, useTransition } from 'react'
import { z } from 'zod'

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
  }, [])

  const handleDeleteProduct = (productId: number[], productIdUnico: number) => {
    if (productId.length === 0) {
      productId.push(productIdUnico)
    }

    startTransition(() => {
      deleteProduct(productId).then((data) => {
        if (data.error) {
          console.error('Failed to delete product:', data.error)
        } else {
          console.log('Product deleted successfully', data.products)
        }
      })
    })
  }

  return (
    <div>
      <HeaderConsultaProdutos />
      {error && <p>Erro: {error}</p>}
      {success && <p>{success}</p>}
      {isPending && <p>Carregando...</p>}
      <DataTable columns={createColumns(handleDeleteProduct)} data={products} />
    </div>
  )
}
