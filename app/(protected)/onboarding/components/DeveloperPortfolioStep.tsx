/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from 'react'
import { Github, Globe, Plus, X } from 'lucide-react'

const DeveloperPortfolioStep = ({ formData, setFormData }: { formData: any; setFormData: (data: any) => void }) => {
  const [newLink, setNewLink] = useState('')

  const addPortfolioLink = () => {
    if (newLink && !formData.portfolioLinks.includes(newLink)) {
      setFormData({
        ...formData,
        portfolioLinks: [...formData.portfolioLinks, newLink]
      })
      setNewLink('')
    }
  }

  const removePortfolioLink = (link: string) => {
    setFormData({
      ...formData,
      portfolioLinks: formData.portfolioLinks.filter((l: string) => l !== link)
    })
  }

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium mb-4">Add your GitHub profile</h3>
        <div className="flex items-center gap-2 p-3 rounded-lg border border-border bg-input">
          <Github className="w-5 h-5 text-gray-500" />
          <input
            type="text"
            value={formData.githubProfile}
            onChange={(e) => setFormData({ ...formData, githubProfile: e.target.value })}
            className="flex-1 bg-transparent outline-none"
            placeholder="github.com/username"
          />
        </div>
      </div>

      <div>
        <h3 className="text-lg font-medium mb-4">Add portfolio links</h3>
        <div className="space-y-3">
          <div className="flex gap-2">
            <div className="flex-1 flex items-center gap-2 p-3 rounded-lg border border-border bg-input">
              <Globe className="w-5 h-5 text-gray-500" />
              <input
                type="text"
                value={newLink}
                onChange={(e) => setNewLink(e.target.value)}
                className="flex-1 bg-transparent outline-none"
                placeholder="Enter portfolio URL"
              />
            </div>
            <button
              onClick={addPortfolioLink}
              className="p-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
            >
              <Plus className="w-5 h-5" />
            </button>
          </div>

          {formData.portfolioLinks.map((link: string) => (
            <div key={link} className="flex items-center gap-2 p-3 rounded-lg border border-border">
              <Globe className="w-5 h-5 text-gray-500" />
              <span className="flex-1 truncate">{link}</span>
              <button
                onClick={() => removePortfolioLink(link)}
                className="p-1 hover:bg-red-100 dark:hover:bg-red-900/20 rounded"
              >
                <X className="w-4 h-4 text-red-600" />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default DeveloperPortfolioStep 