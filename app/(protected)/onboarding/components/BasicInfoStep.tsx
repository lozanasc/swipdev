import { OnboardingStepProps } from '@/types/onboarding'

const BasicInfoStep = ({ formData, setFormData }: OnboardingStepProps) => {
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      // Handle image upload logic here
      const reader = new FileReader()
      reader.onloadend = () => {
        setFormData({ ...formData, profileImage: reader.result as string })
      }
      reader.readAsDataURL(file)
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-medium mb-2">Full Name</label>
        <input
          type="text"
          value={formData.fullName}
          onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
          className="w-full p-3 rounded-lg border border-border bg-input"
          placeholder="Enter your full name"
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">Profile Image</label>
        <div className="flex items-center space-x-4">
          {formData.profileImage ? (
            <img
              src={formData.profileImage}
              alt="Profile"
              className="w-16 h-16 rounded-full object-cover"
            />
          ) : (
            <div className="w-16 h-16 rounded-full bg-purple-100 dark:bg-purple-900/20 flex items-center justify-center">
              <span className="text-purple-600">Add</span>
            </div>
          )}
          <label className="px-4 py-2 border border-border rounded-lg hover:bg-card/80 cursor-pointer">
            <span>Upload Image</span>
            <input
              type="file"
              className="hidden"
              accept="image/*"
              onChange={handleImageUpload}
            />
          </label>
        </div>
      </div>
    </div>
  )
}

export default BasicInfoStep 