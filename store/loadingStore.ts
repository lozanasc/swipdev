import { create } from 'zustand'

interface LoadingState {
  isLoading: boolean
  message: string
  setLoading: (loading: boolean, message?: string) => Promise<void>
}

export const useLoadingStore = create<LoadingState>((set) => ({
  isLoading: false,
  message: 'Loading...',
  setLoading: async (loading, message = 'Loading...') => {
    if (loading) {
      set({ isLoading: true, message })
      await new Promise(resolve => setTimeout(resolve, 2000))
    } else {
      await new Promise(resolve => setTimeout(resolve, 4000))
      set({ isLoading: false, message })
    }
  }
})) 