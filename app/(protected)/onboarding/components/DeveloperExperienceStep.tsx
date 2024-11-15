/* eslint-disable @typescript-eslint/no-explicit-any */
const DeveloperExperienceStep = ({ formData, setFormData }: { formData: any; setFormData: (data: any) => void }) => {
  const experienceLevels = [
    {
      level: 'junior',
      label: 'Junior Developer',
      description: '0-2 years of experience'
    },
    {
      level: 'mid',
      label: 'Mid-Level Developer',
      description: '2-5 years of experience'
    },
    {
      level: 'senior',
      label: 'Senior Developer',
      description: '5+ years of experience'
    }
  ]

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium mb-4">What is your experience level?</h3>
        <div className="grid gap-4">
          {experienceLevels.map((exp) => (
            <div
              key={exp.level}
              onClick={() => setFormData({ ...formData, experienceLevel: exp.level })}
              className={`p-4 rounded-lg border ${
                formData.experienceLevel === exp.level
                  ? 'border-purple-600 bg-purple-50 dark:bg-purple-900/20'
                  : 'border-border hover:bg-card/80'
              } cursor-pointer transition-colors`}
            >
              <h4 className="font-medium mb-1">{exp.label}</h4>
              <p className="text-sm text-gray-500">{exp.description}</p>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-lg font-medium mb-4">What is your hourly rate?</h3>
        <div className="flex items-center gap-2">
          <span className="text-xl">$</span>
          <input
            type="number"
            value={formData.hourlyRate}
            onChange={(e) => setFormData({ ...formData, hourlyRate: e.target.value })}
            className="flex-1 p-3 rounded-lg border border-border bg-input"
            placeholder="Enter your hourly rate"
          />
          <span className="text-gray-500">/hour</span>
        </div>
      </div>
    </div>
  )
}

export default DeveloperExperienceStep 