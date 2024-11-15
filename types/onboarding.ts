export type UserType = 'developer' | 'employer'

export interface CommonFormData {
  fullName: string
  profileImage: string | null
}

export interface DeveloperFormData extends CommonFormData {
  skills: Array<{ name: string; proficiency: number }>
  experienceLevel: 'junior' | 'mid' | 'senior' | ''
  hourlyRate: string
  githubProfile: string
  portfolioLinks: string[]
}

export interface EmployerFormData extends CommonFormData {
  companyName: string
  industry: string
  companySize: string
  website: string
  linkedIn: string
  requirements?: string
}

export type OnboardingFormData = DeveloperFormData & EmployerFormData

export interface OnboardingStepProps {
  formData: OnboardingFormData
  setFormData: (data: OnboardingFormData) => void
} 