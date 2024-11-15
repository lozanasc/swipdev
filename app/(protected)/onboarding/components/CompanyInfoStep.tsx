/* eslint-disable @typescript-eslint/no-explicit-any */
const INDUSTRIES = [
  'Technology',
  'E-commerce',
  'Finance',
  'Healthcare',
  'Education',
  'Manufacturing',
  'Media',
  'Consulting',
  'Real Estate',
  'Other'
]

const COMPANY_SIZES = [
  'Solo',
  '2-10 employees',
  '11-50 employees',
  '51-200 employees',
  '201-500 employees',
  '500+ employees'
]

const CompanyInfoStep = ({ formData, setFormData }: { formData: any; setFormData: (data: any) => void }) => {
  return (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-medium mb-2">Company Name</label>
        <input
          type="text"
          value={formData.companyName}
          onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
          className="w-full p-3 rounded-lg border border-border bg-input"
          placeholder="Enter your company name"
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">Industry</label>
        <select
          value={formData.industry}
          onChange={(e) => setFormData({ ...formData, industry: e.target.value })}
          className="w-full p-3 rounded-lg border border-border bg-input"
        >
          <option value="">Select industry</option>
          {INDUSTRIES.map((industry) => (
            <option key={industry} value={industry}>
              {industry}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">Company Size</label>
        <select
          value={formData.companySize}
          onChange={(e) => setFormData({ ...formData, companySize: e.target.value })}
          className="w-full p-3 rounded-lg border border-border bg-input"
        >
          <option value="">Select company size</option>
          {COMPANY_SIZES.map((size) => (
            <option key={size} value={size}>
              {size}
            </option>
          ))}
        </select>
      </div>
    </div>
  )
}

export default CompanyInfoStep 