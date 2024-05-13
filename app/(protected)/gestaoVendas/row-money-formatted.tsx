import { SaleSchemaSelector } from '@/schemas'
import { Row } from '@tanstack/react-table'
import { z } from 'zod'

interface RowMoneyFormattedProps {
  row: Row<z.infer<typeof SaleSchemaSelector>>
  column: string
  isCancelled?: boolean
}

export default function RowMoneyFormatted({
  row,
  column,
  isCancelled,
}: RowMoneyFormattedProps) {
  const value = row.getValue(column) as number
  const formattedValue = new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(value)
  if (isCancelled) return <div className="font-medium">-</div>

  return <div className="font-medium">{formattedValue}</div>
}
