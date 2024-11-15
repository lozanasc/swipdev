import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { getBrowserSupabaseClient } from '@/lib/supabase/browser-client'
import { useAuthStore } from '@/store/authStore'
import { User } from '@/types'
import { useLoadingStore } from '@/store/loadingStore'

interface SignUpData {
  email: string
  password: string
  fullName: string
  userType: 'developer' | 'employer'
}

interface SignInData {
  email: string
  password: string
}

export function useAuth() {
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()
  const supabase = getBrowserSupabaseClient()
  const { setUser } = useAuthStore()
  const { setLoading } = useLoadingStore()

  const signUp = async ({ email, password, fullName, userType }: SignUpData) => {
    try {
      setIsLoading(true)
      setLoading(true, 'Creating your account...')
      setError(null)

      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: fullName,
            user_type: userType
          }
        }
      })

      if (error) throw error

      if (data?.user?.id && data?.user?.email) {
        setUser(data.user as unknown as User)
        router.push('/dashboard')
        return { success: true }
      }
      
      return { success: false, error: 'Failed to create account. Please try again.' }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An error occurred during sign up'
      setError(errorMessage)
      return { success: false, error: errorMessage }
    } finally {
      setIsLoading(false)
      setLoading(false)
    }
  }

  const signIn = async ({ email, password }: SignInData) => {
    try {
      setIsLoading(true)
      setLoading(true, 'Signing you in...')
      setError(null)

      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
      })

      if (error) throw error

      if (data.user) {
        setUser(data.user as unknown as User)
        router.push('/dashboard')
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred during sign in')
    } finally {
      setIsLoading(false)
      setLoading(false)
    }
  }

  return { signUp, signIn, error, isLoading }
} 