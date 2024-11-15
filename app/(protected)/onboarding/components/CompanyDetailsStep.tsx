/* eslint-disable @typescript-eslint/no-explicit-any */
import { Globe, Linkedin } from 'lucide-react'

const CompanyDetailsStep = ({ formData, setFormData }: { formData: any; setFormData: (data: any) => void }) => {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium mb-4">Company Website</h3>
        <div className="flex items-center gap-2 p-3 rounded-lg border border-border bg-input">
          <Globe className="w-5 h-5 text-gray-500" />
          <input
            type="text"
            value={formData.website}
            onChange={(e) => setFormData({ ...formData, website: e.target.value })}
            className="flex-1 bg-transparent outline-none"
            placeholder="https://your-company.com"
          />
        </div>
      </div>

      <div>
        <h3 className="text-lg font-medium mb-4">LinkedIn Company Page</h3>
        <div className="flex items-center gap-2 p-3 rounded-lg border border-border bg-input">
          <Linkedin className="w-5 h-5 text-gray-500" />
          <input
            type="text"
            value={formData.linkedIn}
            onChange={(e) => setFormData({ ...formData, linkedIn: e.target.value })}
            className="flex-1 bg-transparent outline-none"
            placeholder="linkedin.com/company/your-company"
          />
        </div>
      </div>

      <div>
        <h3 className="text-lg font-medium mb-4">What are you looking for?</h3>
        <textarea
          value={formData.requirements}
          onChange={(e) => setFormData({ ...formData, requirements: e.target.value })}
          className="w-full p-3 rounded-lg border border-border bg-input h-32 resize-none"
          placeholder="Describe the type of developers you're looking to hire and any specific requirements..."
        />
      </div>
    </div>
  )
}

export default CompanyDetailsStep 