import { create } from 'zustand'
import { Toast } from '@/components/Toast'

interface ToastState {
  toasts: Toast[]
  addToast: (toast: Toast) => void
  removeToast: (id: string) => void
}

export const useToastStore = create<ToastState>((set) => ({
  toasts: [],
  addToast: (toast) =>
    set((state) => ({
      toasts: [...state.toasts, { 
        ...toast, 
        id: toast.id || Math.random().toString(36).slice(2)
      }],
    })),
  removeToast: (id) =>
    set((state) => ({
      toasts: state.toasts.filter((toast) => toast.id !== id),
    })),
})) 