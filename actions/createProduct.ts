'use server'

import * as z from 'zod'
import { ProductSchema } from '@/schemas'
import { auth } from '@/auth'
import { db } from '@/lib/db'

export const createProduct = async (values: z.infer<typeof ProductSchema>) => {
  const validatedFields = ProductSchema.safeParse(values)

  if (!validatedFields.success) {
    return { error: 'Campos inválidos!' }
  }

  const {
    altura,
    codigo,
    comprimento,
    custo,
    ean,
    estoque,
    fabricante,
    largura,
    nomeProduto,
    peso,
    precoVenda,
    descricao,
  } = validatedFields.data

  const session = await auth()
  if (!session || !session.user) {
    return { error: 'Usuário não autenticado!' }
  }
  const idUser = session?.user.id

  const existingProductCodigo = await db.product.findFirst({
    where: {
      codigo: validatedFields.data.codigo,
    },
  })

  if (existingProductCodigo) {
    return { error: 'Um produto com este código já existe!', data: null }
  }

  const existingProductEan = await db.product.findFirst({
    where: {
      ean: validatedFields.data.ean,
    },
  })

  if (existingProductEan) {
    return { error: 'Um produto com este EAN já existe!', data: null }
  }

  const existingProductName = await db.product.findFirst({
    where: {
      nomeProduto: validatedFields.data.nomeProduto,
      fabricante: validatedFields.data.fabricante,
    },
  })

  if (existingProductName) {
    return {
      error: 'Um produto com este Nome e Fabricante já existe!',
      data: null,
    }
  }

  try {
    const product = await db.product.create({
      data: {
        altura,
        codigo,
        comprimento,
        custo,
        ean,
        estoque,
        fabricante,
        largura,
        nomeProduto,
        peso,
        precoVenda,
        descricao,
        user: { connect: { id: idUser } },
      },
    })
    return { product, success: 'Produto cadastrado com sucesso!' }
  } catch (error) {
    console.error('Erro ao criar produto:', error)
    return { error: 'Erro ao criar o produto, tente novamente mais tarde.' }
  }
}
