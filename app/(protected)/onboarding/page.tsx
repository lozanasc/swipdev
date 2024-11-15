'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuthStore } from '@/store/authStore'
import { OnboardingFormData } from '@/types/onboarding'
import { useProfile } from '@/hooks/useProfile'
import { useToastStore } from '@/store/toastStore'
import LoadingScreen from '@/components/LoadingScreen'
import BasicInfoStep from './components/BasicInfoStep'
import DeveloperSkillsStep from './components/DeveloperSkillsStep'
import CompanyInfoStep from './components/CompanyInfoStep'
import CompanyDetailsStep from './components/CompanyDetailsStep'
import DeveloperExperienceStep from './components/DeveloperExperienceStep'
import DeveloperPortfolioStep from './components/DeveloperPortfolioStep'

const OnboardingPage = () => {
  const router = useRouter()
  const { user } = useAuthStore()
  const { createProfile } = useProfile()
  const { addToast } = useToastStore()
  const [isLoading, setIsLoading] = useState(false)
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState<OnboardingFormData>({
    // Common fields
    fullName: '',
    profileImage: null,
    
    // Developer specific
    skills: [],
    experienceLevel: '',
    hourlyRate: '',
    githubProfile: '',
    portfolioLinks: [],
    
    // Employer specific
    companyName: '',
    industry: '',
    companySize: '',
    website: '',
    linkedIn: '',
    requirements: ''
  })

  useEffect(() => {
    if (!user) {
      router.push('/login')
    }
  }, [user, router])

  const handleNext = async () => {
    if (step === getMaxSteps()) {
      await handleSubmit()
    } else {
      setStep(step + 1)
    }
  }

  const handleBack = () => {
    setStep(step - 1)
  }

  const getMaxSteps = () => {
    return user?.type === 'developer' ? 4 : 3
  }

  const handleSubmit = async () => {
    try {
      setIsLoading(true)
      await createProfile(formData)
      addToast({
        type: 'success',
        message: 'Profile created successfully!'
      })
      router.push('/dashboard')
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'An unexpected error occurred'
      console.error('Error saving profile:', errorMessage)
      addToast({
        type: 'error',
        message: errorMessage
      })
    } finally {
      setIsLoading(false)
    }
  }

  if (isLoading) {
    return <LoadingScreen message="Creating your profile..." />
  }

  const renderStep = () => {
    if (user?.type === 'developer') {
      switch (step) {
        case 1:
          return <BasicInfoStep formData={formData} setFormData={setFormData} />
        case 2:
          return <DeveloperSkillsStep formData={formData} setFormData={setFormData} />
        case 3:
          return <DeveloperExperienceStep formData={formData} setFormData={setFormData} />
        case 4:
          return <DeveloperPortfolioStep formData={formData} setFormData={setFormData} />
        default:
          return null
      }
    } else {
      switch (step) {
        case 1:
          return <BasicInfoStep formData={formData} setFormData={setFormData} />
        case 2:
          return <CompanyInfoStep formData={formData} setFormData={setFormData} />
        case 3:
          return <CompanyDetailsStep formData={formData} setFormData={setFormData} />
        default:
          return null
      }
    }
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="max-w-2xl w-full bg-card/50 backdrop-blur-sm rounded-xl border border-border p-8">
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-2xl font-bold">Complete Your Profile</h1>
            <span className="text-sm text-gray-500">
              Step {step} of {getMaxSteps()}
            </span>
          </div>
          <div className="w-full bg-border rounded-full h-2">
            <div
              className="bg-purple-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${(step / getMaxSteps()) * 100}%` }}
            />
          </div>
        </div>

        {renderStep()}

        <div className="flex justify-between mt-8">
          {step > 1 && (
            <button
              onClick={handleBack}
              className="px-6 py-2 border border-border rounded-lg hover:bg-card/80"
            >
              Back
            </button>
          )}
          <button
            onClick={handleNext}
            className="ml-auto px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
          >
            {step === getMaxSteps() ? 'Complete' : 'Next'}
          </button>
        </div>
      </div>
    </div>
  )
}

export default OnboardingPage
