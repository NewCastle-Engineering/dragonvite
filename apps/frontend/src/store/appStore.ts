import { create } from 'zustand'
import { immer } from 'zustand/middleware/immer'

interface AppState {
  isLoading: boolean
  error: string | null
  setLoading: (loading: boolean) => void
  setError: (error: string | null) => void
}

export const useAppStore = create<AppState>()(
  immer((set) => ({
    isLoading: false,
    error: null,
    setLoading: (loading) =>
      set((state) => {
        state.isLoading = loading
      }),
    setError: (error) =>
      set((state) => {
        state.error = error
      }),
  }))
)
