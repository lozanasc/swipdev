'use client'

import { useLoadingStore } from '@/store/loadingStore'
import LoadingScreen from './LoadingScreen'

export default function LoadingProvider({
  children,
}: {
  children: React.ReactNode
}) {
  const { isLoading, message } = useLoadingStore()

  return (
    <>
      {isLoading && <LoadingScreen message={message} />}
      {children}
    </>
  )
} 