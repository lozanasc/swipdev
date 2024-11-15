'use client'

import { useState } from 'react'
import { Mail, Lock } from 'lucide-react'
import Link from 'next/link'
import ThemeToggle from '@/components/ThemeToggle'
import { useAuth } from '@/hooks/useAuth'
import { useToastStore } from '@/store/toastStore'
import { useLoadingStore } from '@/store/loadingStore'

const avatars = [
  'https://ca.slack-edge.com/T070JSASK6J-U0757P7AK9T-ged79cb98ffa-72',
  'https://ca.slack-edge.com/T070JSASK6J-U077J96DZAQ-753851903a5c-72',
  'https://ca.slack-edge.com/T070JSASK6J-U07M6590NPP-872deb512f2c-72',
  'https://ca.slack-edge.com/T070JSASK6J-U07TSN0P67P-023844133c3d-72'
];

const LoginPage = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false
  })
  const [errors, setErrors] = useState<Record<string, string>>({})
  const { signIn } = useAuth()
  const { isLoading } = useLoadingStore()
  const { addToast, removeToast } = useToastStore()

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required'
    }

    if (!formData.password.trim()) {
      newErrors.password = 'Password is required'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (validateForm()) {
      const loadingToastId = 'login-loading'
      
      // Show loading toast
      addToast({
        id: loadingToastId,
        type: 'loading',
        message: 'Signing in...'
      })

      try {
        await signIn({
          email: formData.email,
          password: formData.password
        })

        // Remove loading toast
        removeToast(loadingToastId)
        
        addToast({
          type: 'success',
          message: 'Signed in successfully!'
        })
      } catch (error) {
        removeToast(loadingToastId)
        addToast({
          type: 'error',
          message: error instanceof Error ? error.message : 'Failed to sign in'
        })
      }
    }
  }

  return (
    <div className="min-h-screen flex flex-col lg:flex-row">
      {/* Left Panel - Login Form */}
      <div className="w-full lg:w-1/2 p-6 sm:p-8 lg:p-12 flex flex-col justify-center">
        <div className="max-w-md w-full mx-auto">
          <div className="flex items-center justify-between mb-8 lg:mb-12">
            <div className="flex items-center gap-3">
              <div className="w-8 sm:w-10 h-8 sm:h-10 rounded-full bg-purple-600" />
              <span className="font-medium text-lg sm:text-xl">SwipDev</span>
            </div>
            <ThemeToggle />
          </div>

          <h1 className="text-3xl sm:text-4xl font-bold mb-6 lg:mb-8">Welcome back</h1>
          
          <form className="space-y-4 sm:space-y-6" onSubmit={handleSubmit}>
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Email</label>
              <div className="space-y-1">
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                  <input 
                    type="email"
                    className={`w-full pl-10 pr-4 py-2.5 sm:py-3 rounded-lg border 
                      ${errors.email ? 'border-red-500' : 'border-border'} 
                      bg-input text-foreground focus:border-primary focus:ring-2 
                      focus:ring-primary/20 outline-none transition-all`}
                    placeholder="Enter your email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  />
                </div>
                {errors.email && (
                  <p className="text-red-500 text-xs pl-1">{errors.email}</p>
                )}
              </div>
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Password</label>
              <div className="space-y-1">
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                  <input 
                    type="password"
                    className={`w-full pl-10 pr-4 py-2.5 sm:py-3 rounded-lg border 
                      ${errors.password ? 'border-red-500' : 'border-border'} 
                      bg-input text-foreground focus:border-primary focus:ring-2 
                      focus:ring-primary/20 outline-none transition-all`}
                    placeholder="Enter your password"
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  />
                </div>
                {errors.password && (
                  <p className="text-red-500 text-xs pl-1">{errors.password}</p>
                )}
              </div>
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-0">
              <label className="flex items-center gap-2">
                <input 
                  type="checkbox" 
                  className="rounded border-gray-300 text-purple-600 focus:ring-purple-500"
                  checked={formData.rememberMe}
                  onChange={(e) => setFormData({ ...formData, rememberMe: e.target.checked })}
                />
                <span className="text-sm text-gray-600">Remember me</span>
              </label>
              <Link href="/forgot-password" className="text-sm text-purple-600 hover:text-purple-700">
                Forgot password?
              </Link>
            </div>

            <button 
              type="submit"
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-purple-500 to-purple-700 text-white py-2.5 sm:py-3 rounded-lg font-medium hover:opacity-90 transition-opacity disabled:opacity-50"
            >
              {isLoading ? 'Signing in...' : 'Sign in'}
            </button>
          </form>

          <p className="mt-6 sm:mt-8 text-center text-sm text-gray-600">
            Don&apos;t have an account?{' '}
            <Link href="/signup" className="text-purple-600 hover:text-purple-700 font-medium">
              Sign up
            </Link>
          </p>
          
          <p className="mt-2 text-center text-sm text-gray-600">
            <Link href="/developer-signup" className="text-purple-600 hover:text-purple-700 font-medium">
              I&apos;m a developer
            </Link>
          </p>
        </div>
      </div>

      {/* Right Panel - Hide on mobile, show on larger screens */}
      <div className="hidden lg:block w-full lg:w-1/2 relative bg-black">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[300px] xl:w-[600px] h-[300px] xl:h-[600px] rounded-full bg-purple-600/30 blur-3xl" />
        <div className="absolute bottom-0 left-1/4 w-[200px] xl:w-[400px] h-[200px] xl:h-[400px] rounded-full bg-purple-800/20 blur-3xl" />
        <div className="absolute top-1/3 right-1/4 w-[250px] xl:w-[500px] h-[250px] xl:h-[500px] rounded-full bg-purple-500/20 blur-3xl" />

        <div className="relative z-10 h-full flex flex-col justify-center p-8 lg:p-12 text-white">
          <h2 className="text-3xl lg:text-4xl font-bold mb-4 lg:mb-6">
            Find your perfect
            <br />
            <span className="bg-gradient-to-r from-purple-400 to-purple-600 text-transparent bg-clip-text">
              development team
            </span>
          </h2>
          <p className="text-gray-400 text-base lg:text-lg mb-6 lg:mb-8">
            Join thousands of companies that have found their ideal developers through SwipDev&apos;s AI-powered matching system.
          </p>
          <div className="flex items-center gap-4 text-sm">
            <div className="flex -space-x-2">
              {avatars.map((avatar, i) => (
                <img 
                  key={i} 
                  src={avatar} 
                  alt={`Developer ${i + 1}`}
                  className="w-6 lg:w-8 h-6 lg:h-8 rounded-full bg-gray-600 border-2 border-black" 
                />
              ))}
            </div>
            <p className="text-gray-400">
              Over <span className="text-white font-medium">2,000+</span> developers available
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LoginPage