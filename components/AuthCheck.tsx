'use client'

import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { useAuthStore } from '@/store/authStore'
import { getBrowserSupabaseClient } from '@/lib/supabase/browser-client'
import LoadingScreen from './LoadingScreen'

export default function AuthCheck({ children }: { children: React.ReactNode }) {
  const router = useRouter()
  const { setUser } = useAuthStore()
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const supabase = getBrowserSupabaseClient()

    // Check active session
    const checkSession = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession()
        if (session?.user) {
          setUser({
            id: session.user.id,
            email: session.user.email!,
            type: session.user.user_metadata.user_type,
            createdAt: new Date(session.user.created_at)
          })
        } else if (!session && window.location.pathname !== '/onboarding') {
          router.push('/login')
        }
      } catch (error) {
        console.error('Error checking session:', error)
      } finally {
        setIsLoading(false)
      }
    }

    checkSession()

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (session?.user) {
          setUser({
            id: session.user.id,
            email: session.user.email!,
            type: session.user.user_metadata.user_type,
            createdAt: new Date(session.user.created_at)
          })
        } else {
          setUser(null)
          if (window.location.pathname !== '/onboarding') {
            router.push('/login')
          }
        }
      }
    )

    return () => {
      subscription.unsubscribe()
    }
  }, [router, setUser])

  if (isLoading) {
    return <LoadingScreen message="Loading your profile..." />
  }

  return <>{children}</>
} 