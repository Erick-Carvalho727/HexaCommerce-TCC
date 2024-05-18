// table-types.d.ts

// Certifique-se de que esta importação corresponda ao caminho do seu módulo
import {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  ColumnDefBase,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  GroupColumnDefBase,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  IdIdentifier,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  StringHeaderIdentifier,
} from '@tanstack/react-table'

declare module '@tanstack/react-table' {
  // Estenda as interfaces existentes
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  interface ColumnDefBase<TData extends RowData, TValue = unknown> {
    propsColumn?: string
  }
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  interface GroupColumnDefBase<TData extends RowData, TValue = unknown> {
    propsColumn?: string
  }
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  interface IdIdentifier<TData extends RowData, TValue> {
    propsColumn?: string
  }

  interface StringHeaderIdentifier {
    propsColumn?: string
  }
}
