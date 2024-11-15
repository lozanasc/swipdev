import { getBrowserSupabaseClient } from '@/lib/supabase/browser-client'
import { OnboardingFormData } from '@/types/onboarding'
import { useAuthStore } from '@/store/authStore'
import { useProfileStore } from '@/store/profileStore'

export function useProfile() {
  const { user } = useAuthStore()
  const { setDeveloperProfile, setEmployerProfile, setError } = useProfileStore()
  const supabase = getBrowserSupabaseClient()

  const createProfile = async (formData: OnboardingFormData) => {
    try {
      if (!user) {
        throw new Error('No authenticated user found')
      }

      if (user.type === 'developer') {
        // Create developer profile
        const { data: profile, error: profileError } = await supabase
          .from('developer_profiles')
          .insert({
            user_id: user.id,
            name: formData.fullName,
            experience_level: formData.experienceLevel,
            hourly_rate: parseFloat(formData.hourlyRate),
            github_profile: formData.githubProfile,
            image_url: formData.profileImage,
          })
          .select()
          .single()

        if (profileError) {
          throw new Error(`Failed to create developer profile: ${profileError.message}`)
        }

        if (!profile) {
          throw new Error('Failed to create developer profile: No profile returned')
        }

        setDeveloperProfile(profile)

        // Insert skills
        if (formData.skills.length > 0) {
          const { error: skillsError } = await supabase
            .from('developer_skills')
            .insert(
              formData.skills.map(skill => ({
                developer_id: profile.id,
                name: skill.name,
                proficiency: skill.proficiency
              }))
            )

          if (skillsError) {
            throw new Error(`Failed to save skills: ${skillsError.message}`)
          }
        }

        // Insert portfolio links
        if (formData.portfolioLinks.length > 0) {
          const { error: linksError } = await supabase
            .from('developer_portfolio_links')
            .insert(
              formData.portfolioLinks.map(url => ({
                developer_id: profile.id,
                url
              }))
            )

          if (linksError) {
            throw new Error(`Failed to save portfolio links: ${linksError.message}`)
          }
        }
      } else {
        // Create employer profile
        const { data: profile, error: profileError } = await supabase
          .from('employer_profiles')
          .insert({
            user_id: user.id,
            company_name: formData.companyName,
            industry: formData.industry,
            contact_email: user.email,
            company_size: formData.companySize,
            website: formData.website,
            linkedin_url: formData.linkedIn,
            image_url: formData.profileImage,
          })
          .select()
          .single()

        if (profileError) {
          throw new Error(`Failed to create employer profile: ${profileError.message}`)
        }

        setEmployerProfile(profile)
      }

      return true
    } catch (error) {
      setError(error instanceof Error ? error.message : 'An unexpected error occurred')
      throw error
    }
  }

  return { createProfile }
} 