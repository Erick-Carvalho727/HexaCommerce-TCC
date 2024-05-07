import { create } from 'zustand'

type NewSettingsState = {
  isOpen: boolean
  onOpen: () => void
  onClose: () => void
}

export const useNewSettings = create<NewSettingsState>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}))
