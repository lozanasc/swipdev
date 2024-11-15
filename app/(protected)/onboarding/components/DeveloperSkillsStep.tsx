/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import { useState } from 'react'
import { Plus, X } from 'lucide-react'

const COMMON_TECH_STACKS = [
  'JavaScript', 'TypeScript', 'React', 'Next.js', 'Node.js',
  'Python', 'Django', 'Java', 'Spring', 'PHP',
  'Laravel', 'Vue.js', 'Angular', 'Ruby', 'Rails',
  'PostgreSQL', 'MongoDB', 'MySQL', 'AWS', 'Docker'
]

interface DeveloperSkillsStepProps {
  formData: any
  setFormData: (data: any) => void
}

const DeveloperSkillsStep = ({ formData, setFormData }: DeveloperSkillsStepProps) => {
  const [newSkill, setNewSkill] = useState('')

  const addSkill = (skillName: string) => {
    if (!formData.skills.some((s: any) => s.name === skillName)) {
      setFormData({
        ...formData,
        skills: [...formData.skills, { name: skillName, proficiency: 3 }]
      })
    }
    setNewSkill('')
  }

  const removeSkill = (skillName: string) => {
    setFormData({
      ...formData,
      skills: formData.skills.filter((s: any) => s.name !== skillName)
    })
  }

  const updateProficiency = (skillName: string, proficiency: number) => {
    setFormData({
      ...formData,
      skills: formData.skills.map((s: any) => 
        s.name === skillName ? { ...s, proficiency } : s
      )
    })
  }

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium mb-4">What are your technical skills?</h3>
        <div className="flex flex-wrap gap-2 mb-4">
          {COMMON_TECH_STACKS.filter(
            tech => !formData.skills.some((s: any) => s.name === tech)
          ).map((tech) => (
            <button
              key={tech}
              onClick={() => addSkill(tech)}
              className="px-3 py-1 rounded-full border border-border hover:bg-card/80 text-sm"
            >
              + {tech}
            </button>
          ))}
        </div>

        <div className="flex gap-2 mb-6">
          <input
            type="text"
            value={newSkill}
            onChange={(e) => setNewSkill(e.target.value)}
            className="flex-1 p-3 rounded-lg border border-border bg-input"
            placeholder="Add a custom skill"
          />
          <button
            onClick={() => newSkill && addSkill(newSkill)}
            className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
          >
            <Plus className="w-5 h-5" />
          </button>
        </div>

        <div className="space-y-4">
          {formData.skills.map((skill: any) => (
            <div key={skill.name} className="flex items-center gap-4">
              <button
                onClick={() => removeSkill(skill.name)}
                className="p-1 hover:bg-red-100 dark:hover:bg-red-900/20 rounded"
              >
                <X className="w-4 h-4 text-red-600" />
              </button>
              <div className="flex-1">
                <div className="flex justify-between mb-1">
                  <span className="font-medium">{skill.name}</span>
                  <span className="text-sm text-gray-500">
                    {['Beginner', 'Intermediate', 'Advanced', 'Expert', 'Master'][skill.proficiency - 1]}
                  </span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="5"
                  value={skill.proficiency}
                  onChange={(e) => updateProficiency(skill.name, parseInt(e.target.value))}
                  className="w-full"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default DeveloperSkillsStep 