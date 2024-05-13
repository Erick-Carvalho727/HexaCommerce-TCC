import * as z from 'zod'

export const LoginSchema = z.object({
  email: z.string().email({
    message: 'Informe seu email!',
  }),
  password: z.string().min(1, {
    message: 'Informe sua senha!',
  }),
})

export const RegisterSchema = z
  .object({
    name: z
      .string()
      .min(3, { message: 'Seu nome deve ter 3 ou mais caracteres' })
      .max(20, { message: 'Seu nome deve ter no máximo 20 caracteres' }),
    email: z
      .string()
      .email({ message: 'Endereço de e-mail inválido' })
      .min(5, { message: 'O e-mail deve ter 5 ou mais caracteres' })
      .max(100, { message: 'O e-mail deve ter menos de 100 caracteres' })
      .transform((email) => email.toLowerCase()),
    password: z
      .string()
      .min(8, { message: 'A senha deve ter 8 ou mais caracteres' })
      .max(50, { message: 'A senha deve ter menos de 50 caracteres' }),
    passwordConfirm: z
      .string()
      .min(8, {
        message: 'A confirmação de senha deve ter 8 ou mais caracteres',
      })
      .max(50, {
        message: 'A confirmação de senha deve ter menos de 50 caracteres',
      }),
    nameCompany: z
      .string()
      .min(1, { message: 'O nome da empresa é obrigatório' })
      .max(100, {
        message: 'O nome da empresa deve ter menos de 100 caracteres',
      }),
  })
  .refine((data) => data.password === data.passwordConfirm, {
    message: 'As senhas não correspondem',
    path: ['passwordConfirm'],
  })

export const ProductSchema = z
  .object({
    codigo: z.number().nonnegative(),
    ean: z.string().regex(/^\d{13}$/, 'EAN deve ter exatamente 13 dígitos'),
    fabricante: z
      .string()
      .min(2)
      .max(100)
      .regex(/^[a-zA-Z0-9 \-&]*$/, 'Fabricante contém caracteres inválidos'),
    custo: z.number().nonnegative(),
    precoVenda: z.number().min(1).nonnegative(),
    estoque: z.number().min(0).max(1000).nonnegative(),
    peso: z.string().min(0.1).max(100),
    altura: z.string().min(1).max(300),
    largura: z.string().min(1).max(300),
    comprimento: z.string().min(1).max(300),
    nomeProduto: z
      .string()
      .min(5)
      .max(255)
      .regex(
        /^[a-zA-Z0-9 \-'&áéíóúÁÉÍÓÚàÀãÃâÂêÊçÇ]*$/,
        'Nome do produto contém caracteres inválidos',
      ),
    descricao: z.string().optional(),
  })
  .refine((data) => data.precoVenda > 1.2 * data.custo, {
    message: 'Preço de venda deve ser pelo menos 20% maior que o custo',
    path: ['precoVenda'],
  })

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

export const SaleSchemaSelector = z.object({
  nomeProduto: z.string().nullable(),
  canal: z.string().nullable(),
  quantidade: z.number(),
  cofins: z.number(),
  createdAt: z.date(),
  icms: z.number(),
  lucroTotalComImposto: z.number(),
  NF: z.string().nullable(),
  pis: z.number(),
  ipi: z.number(),
  totalTriubutos: z.number(),
  valorTotalCusto: z.number(),
  valorTotalLucro: z.number(),
  valorTotalVenda: z.number(),
  status: z.string().nullable(),
  numeroDoPedido: z.string().nullable(),
})

export const UserSchemaConfig = z.object({
  name: z.optional(z.string()),
  email: z.optional(z.string().email()),
  nameCompany: z.optional(z.string()),
  canais: z.array(z.string()),
})

export const SaleSchema = z.object({
  nomeProduto: z.string().min(1),
  quantidade: z.number().min(1),
  canal: z.string().min(1),
  status: z.string().min(1),
})
