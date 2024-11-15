'use client'

import { useEffect } from 'react'
import { X, CheckCircle2, AlertCircle, Loader2 } from 'lucide-react'
import { useToastStore } from '@/store/toastStore'

export interface Toast {
  id?: string
  type: 'success' | 'error' | 'loading'
  message: string
}

export default function Toast() {
  const { toasts, removeToast } = useToastStore()

  useEffect(() => {
    const timer = setInterval(() => {
      toasts.forEach((toast) => {
        if (toast.type !== 'loading') {
          removeToast(toast.id as string)
        }
      })
    }, 5000)

    return () => clearInterval(timer)
  }, [toasts, removeToast])

  useEffect(() => {
    return () => {
      toasts.forEach((toast) => {
        if (toast.type === 'loading') {
          removeToast(toast.id as string)
        }
      })
    }
  }, [])

  if (toasts.length === 0) return null

  return (
    <div className="fixed top-4 right-4 z-50 flex flex-col gap-2">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className={`
            min-w-[300px] p-4 rounded-lg shadow-lg transform 
            transition-all duration-300 ease-in-out
            animate-enter flex items-center justify-between gap-2
            ${
              toast.type === 'success'
                ? 'bg-green-50 text-green-800 dark:bg-green-900/50 dark:text-green-100'
                : toast.type === 'error'
                ? 'bg-red-50 text-red-800 dark:bg-red-900/50 dark:text-red-100'
                : 'bg-gray-50 text-gray-800 dark:bg-gray-900/50 dark:text-gray-100'
            }
          `}
        >
          <div className="flex items-center gap-2">
            {toast.type === 'success' && <CheckCircle2 className="w-5 h-5" />}
            {toast.type === 'error' && <AlertCircle className="w-5 h-5" />}
            {toast.type === 'loading' && <Loader2 className="w-5 h-5 animate-spin" />}
            <p className="text-sm font-medium">{toast.message}</p>
          </div>
          <button
            onClick={() => removeToast(toast.id as string)}
            className="text-current opacity-70 hover:opacity-100 transition-opacity"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      ))}
    </div>
  )
}
