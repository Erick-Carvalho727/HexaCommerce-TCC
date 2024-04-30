import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import { Control } from 'react-hook-form'
// eslint-disable-next-line camelcase
import { Libre_Franklin, Mulish } from 'next/font/google'
import { cn } from '@/lib/utils'
import { RxQuestionMarkCircled } from 'react-icons/rx'
import { Input } from '@/components/ui/input'

const fontLibre500 = Libre_Franklin({
  subsets: ['latin'],
  weight: ['500'],
})

const fontMulish400 = Mulish({
  subsets: ['latin'],
  weight: ['400'],
})

type FieldValues = {
  fabricante: string
  custo: number
  precoVenda: number
  estoque: number
  peso: string
  altura: string
  largura: string
  comprimento: string
  nomeProduto: string
  descricao?: string | undefined
  codigo: number
  ean: string
}

interface FormProductProps {
  control: Control<FieldValues>
  name: keyof FieldValues
  label: string
  descricao: string
  placeholder: string
  type: string
  tooltipContent?: string
  isPending: boolean
  isEditable?: boolean
}

export default function FormProduct({
  control,
  name,
  label,
  descricao,
  type,
  placeholder,
  tooltipContent,
  isPending,
  isEditable,
}: FormProductProps) {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <div className="grid grid-cols-2">
            <div>
              <FormLabel>
                <div className="flex items-center">
                  <p
                    className={cn(
                      'uppercase text-black text-sm',
                      fontLibre500.className,
                    )}
                  >
                    {label}
                  </p>
                  {tooltipContent && (
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger>
                          <RxQuestionMarkCircled className="ml-1 text-black" />
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>{tooltipContent}</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  )}
                </div>
              </FormLabel>
              <h2 className={cn('text-xs text-black/80 mt-1', fontMulish400)}>
                {descricao}
              </h2>
            </div>
            <div>
              <FormControl>
                <Input
                  {...field}
                  placeholder={placeholder}
                  type={type}
                  className="border-[#cacdd3] text-black"
                  disabled={isPending || isEditable}
                  onChange={(e) => {
                    const value =
                      type === 'number'
                        ? parseFloat(e.target.value) || 0
                        : e.target.value
                    field.onChange(value)
                  }}
                />
              </FormControl>
            </div>
          </div>
          <FormMessage className="text-red-500 font-normal" />
        </FormItem>
      )}
    />
  )
}
