'use client'

import { useState } from 'react'
import { Mail, Lock, User, Building2, Users as UserGroup, Check } from 'lucide-react'
import ThemeToggle from '@/components/ThemeToggle'
import { useAuth } from '@/hooks/useAuth'
import { useToastStore } from '@/store/toastStore'

const avatars = [
  'https://ca.slack-edge.com/T070JSASK6J-U0757P7AK9T-ged79cb98ffa-72',
  'https://ca.slack-edge.com/T070JSASK6J-U077J96DZAQ-753851903a5c-72',
  'https://ca.slack-edge.com/T070JSASK6J-U07M6590NPP-872deb512f2c-72',
  'https://ca.slack-edge.com/T070JSASK6J-U07TSN0P67P-023844133c3d-72'
];

const SignupPage = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    userType: '' as 'developer' | 'employer' | ''
  })
  const [errors, setErrors] = useState<Record<string, string>>({})
  const { signUp, isLoading, error } = useAuth()
  const { addToast, removeToast } = useToastStore()

  console.log(isLoading)
  console.log(error)

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Full name is required'
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required'
    }

    if (!formData.password.trim()) {
      newErrors.password = 'Password is required'
    }

    if (!formData.userType) {
      newErrors.userType = 'Account type is required'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (validateForm()) {
      const loadingToastId = 'signup-loading'
      
      // Show loading toast
      addToast({
        id: loadingToastId,
        type: 'loading',
        message: 'Creating your account...'
      })

      const result = await signUp({
        email: formData.email,
        password: formData.password,
        fullName: formData.fullName,
        userType: formData.userType as 'developer' | 'employer'
      })

      // Remove loading toast
      removeToast(loadingToastId)

      if (result.success) {
        addToast({
          type: 'success',
          message: 'Account created successfully!'
        })
      } else {
        addToast({
          type: 'error',
          message: result.error || 'Failed to create account'
        })
      }
    }
  }

  return (
    <div className="min-h-screen flex flex-col lg:flex-row">
      {/* Left Panel - Signup Form */}
      <div className="w-full lg:w-1/2 p-6 sm:p-8 lg:p-12 flex flex-col justify-center">
        <div className="max-w-md w-full mx-auto">
          <div className="flex items-center justify-between mb-8 lg:mb-12">
            <div className="flex items-center gap-3">
              <div className="w-8 sm:w-10 h-8 sm:h-10 rounded-full bg-purple-600" />
              <span className="font-medium text-lg sm:text-xl">SwipDev</span>
            </div>
            <ThemeToggle />
          </div>

          <h1 className="text-3xl sm:text-4xl font-bold mb-6 lg:mb-8">Create an account</h1>
          
          <form className="space-y-4 sm:space-y-6" onSubmit={handleSubmit}>
            <div className="space-y-2">
              <label className="block text-sm font-medium">Full Name</label>
              <div className="space-y-1">
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                  <input 
                    type="text"
                    className={`w-full pl-10 pr-4 py-2.5 sm:py-3 rounded-lg border 
                      ${errors.fullName ? 'border-red-500' : 'border-border'} 
                      bg-input text-foreground focus:border-primary focus:ring-2 
                      focus:ring-primary/20 outline-none transition-all`}
                    placeholder="Enter your full name"
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                  />
                </div>
                {errors.fullName && (
                  <p className="text-red-500 text-xs pl-1">{errors.fullName}</p>
                )}
              </div>
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium">Email</label>
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
              <label className="block text-sm font-medium">Password</label>
              <div className="space-y-1">
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                  <input 
                    type="password"
                    className={`w-full pl-10 pr-4 py-2.5 sm:py-3 rounded-lg border 
                      ${errors.password ? 'border-red-500' : 'border-border'} 
                      bg-input text-foreground focus:border-primary focus:ring-2 
                      focus:ring-primary/20 outline-none transition-all`}
                    placeholder="Create a password"
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  />
                </div>
                {errors.password && (
                  <p className="text-red-500 text-xs pl-1">{errors.password}</p>
                )}
              </div>
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium">Account Type</label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <button type="button" className="p-4 border border-border rounded-lg hover:border-primary focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all text-center" onClick={() => setFormData({ ...formData, userType: 'employer' })}>
                  <div className="flex justify-center">
                    <Building2 className="w-6 h-6 mb-2" />
                  </div>
                  <div className="font-medium">Employer</div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">I want to hire developers</div>
                </button>
                <button type="button" className="p-4 border border-border rounded-lg hover:border-primary focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all text-center" onClick={() => setFormData({ ...formData, userType: 'developer' })}>
                  <div className="flex justify-center">
                    <User className="w-6 h-6 mb-2" />
                  </div>
                  <div className="font-medium">Developer</div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">I am a developer</div>
                </button>
              </div>
              {errors.userType && <p className="text-red-500 text-xs">{errors.userType}</p>}
            </div>

            <button className="w-full bg-gradient-to-r from-purple-500 to-purple-700 text-white py-2.5 sm:py-3 rounded-lg font-medium hover:opacity-90 transition-opacity">
              Create Account
            </button>
          </form>

          <p className="mt-6 sm:mt-8 text-center text-sm text-gray-600 dark:text-gray-400">
            Already have an account?{' '}
            <a href="/login" className="text-purple-600 hover:text-purple-700 font-medium">Sign in</a>
          </p>
        </div>
      </div>

      {/* Right Panel */}
      <div className="hidden lg:block w-full lg:w-1/2 relative bg-black">
        {/* Gradient Background */}
        <div className="absolute inset-0">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full bg-purple-600/30 blur-3xl" />
          <div className="absolute bottom-0 left-1/4 w-[400px] h-[400px] rounded-full bg-purple-800/20 blur-3xl" />
          <div className="absolute top-1/3 right-1/4 w-[500px] h-[500px] rounded-full bg-purple-500/20 blur-3xl" />
        </div>

        {/* Content */}
        <div className="relative z-10 h-full flex flex-col justify-center p-12 text-white">
          <h2 className="text-4xl font-bold mb-4">
            Start building your
            <br />
            <span className="bg-gradient-to-r from-purple-400 to-purple-600 text-transparent bg-clip-text">
              dream team today
            </span>
          </h2>
          <p className="text-gray-400 text-lg mb-12">
            Get matched with pre-vetted developers who match your tech stack and company culture.
          </p>

          {/* Features */}
          <div className="space-y-6">
            <div className="flex items-start gap-4">
              <div className="w-8 h-8 rounded-full bg-purple-600/20 flex items-center justify-center flex-shrink-0">
                <UserGroup className="w-4 h-4 text-purple-600" />
              </div>
              <div>
                <h3 className="font-medium mb-1">AI-Powered Matching</h3>
                <p className="text-gray-400">Find developers that perfectly match your needs</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-8 h-8 rounded-full bg-purple-600/20 flex items-center justify-center flex-shrink-0">
                <Check className="w-4 h-4 text-purple-600" />
              </div>
              <div>
                <h3 className="font-medium mb-1">Verified Developers</h3>
                <p className="text-gray-400">All developers are pre-vetted and skilled</p>
              </div>
            </div>
          </div>

          {/* Developer Stats */}
          <div className="mt-12 flex items-center gap-4 text-sm">
            <div className="flex -space-x-2">
              {avatars.map((avatar, i) => (
                <img key={i} src={avatar} className="w-8 h-8 rounded-full bg-gray-600 border-2 border-black" />
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

export default SignupPage