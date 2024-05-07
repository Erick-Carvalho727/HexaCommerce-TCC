'use client'

import { deleteProduct } from '@/actions/deleteProduct'
import { getProducts } from '@/actions/selectProduct'
import { createColumns } from '@/components/consultaProdutos/columns'
import { DataTable } from '@/components/consultaProdutos/data-table'
import HeaderConsultaProdutos from '@/components/consultaProdutos/header-consulta-produtos'
import FormError from '@/components/form-error'
import { Skeleton } from '@/components/ui/skeleton'
import { ProductSchemaSelector } from '@/schemas'
import { ReloadIcon } from '@radix-ui/react-icons'
import { useEffect, useState, useTransition } from 'react'
import { z } from 'zod'

interface ProductResponse {
  products?: z.infer<typeof ProductSchemaSelector>[]
  error?: string
  success?: string
}

export default function ConsultaProdutosPage() {
  const [error, setError] = useState<string | undefined>('')
  const [isPending, startTransition] = useTransition()
  const [products, setProducts] = useState<
    z.infer<typeof ProductSchemaSelector>[]
  >([])

  const listProducts = () => {
    startTransition(() => {
      getProducts()
        .then((data: ProductResponse) => {
          if (data.products) setProducts(data.products)
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
          listProducts()
        }
      })
    })
  }

  return (
    <div>
      <HeaderConsultaProdutos />
      {isPending ? (
        <div className="flex flex-col w-full h-full relative">
          <div className="flex justify-between">
            <Skeleton className="w-[130px] h-[36px] my-4" />
            <Skeleton className="w-[148px] h-[36px] my-4" />
          </div>
          <div className="absolute top-80 left-1/2">
            <ReloadIcon className="h-4 w-4 animate-spin" />
          </div>
        </div>
      ) : (
        <>
          <FormError message={error} />
          <DataTable
            columns={createColumns(handleDeleteProduct)}
            data={products}
          />
        </>
      )}
    </div>
  )
}
