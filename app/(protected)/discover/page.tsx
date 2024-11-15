'use client'

import { useEffect } from 'react'
import { useMatchStore } from '@/store/matchStore'
import SwipeContainer from './components/SwipeContainer'
import LoadingScreen from '@/components/LoadingScreen'

const DiscoverPage = () => {
  const { 
    loadInitialDevelopers,
    isLoading,
    error 
  } = useMatchStore()

  useEffect(() => {
    loadInitialDevelopers()
  }, [loadInitialDevelopers])

  if (isLoading) {
    return <LoadingScreen message="Finding developers..." />
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-red-500">{error}</p>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background p-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8 text-center">
          Discover Developers
        </h1>
        <SwipeContainer />
      </div>
    </div>
  )
}

export default DiscoverPage 