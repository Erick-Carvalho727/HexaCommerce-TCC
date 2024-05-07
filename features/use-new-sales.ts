import { create } from 'zustand'

type NewSalesState = {
  isOpen: boolean
  onOpen: () => void
  onClose: () => void
}

export const useNewSales = create<NewSalesState>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}))
