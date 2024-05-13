import { create } from 'zustand'

type useNewSale = {
  isOpen: boolean
  onOpen: () => void
  onClose: () => void
}

export const useSale = create<useNewSale>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}))
