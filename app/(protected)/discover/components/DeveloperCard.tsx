import { DeveloperProfile } from '@/types'
import { Github, Globe } from 'lucide-react'
import Image from 'next/image'

interface DeveloperCardProps {
  developer: DeveloperProfile
}

const DeveloperCard = ({ developer }: DeveloperCardProps) => {
  return (
    <div className="w-full max-w-sm bg-card/50 backdrop-blur-sm rounded-xl border border-border overflow-hidden">
      {/* Profile Image */}
      <div className="relative w-full h-64">
        <img
          src={developer.imageUrl || '/default-avatar.png'}
          alt={developer.name}
          className="object-cover"
          fill={true}
          sizes="(max-width: 768px) 100vw, 384px"
          priority
        />
      </div>

      {/* Content */}
      <div className="p-6 space-y-4">
        <div>
          <h2 className="text-2xl font-bold">{developer.name}</h2>
          <p className="text-gray-500">
            {developer.experienceLevel.charAt(0).toUpperCase() + 
             developer.experienceLevel.slice(1)} Developer
          </p>
        </div>

        {/* Skills */}
        <div className="flex flex-wrap gap-2">
          {developer.skills.slice(0, 4).map((skill) => (
            <span
              key={skill.name}
              className="px-3 py-1 bg-purple-100 dark:bg-purple-900/20 
                       text-purple-600 rounded-full text-sm"
            >
              {skill.name}
            </span>
          ))}
          {developer.skills.length > 4 && (
            <span className="px-3 py-1 bg-gray-100 dark:bg-gray-800 
                           text-gray-600 dark:text-gray-400 rounded-full text-sm">
              +{developer.skills.length - 4} more
            </span>
          )}
        </div>

        {/* Rate */}
        <div className="text-lg font-semibold">
          ${developer.hourlyRate}/hour
        </div>

        {/* Links */}
        <div className="flex gap-4 text-gray-500">
          {developer.githubProfile && (
            <a href={developer.githubProfile} 
               target="_blank" 
               rel="noopener noreferrer"
               className="hover:text-purple-600 transition-colors">
              <Github className="w-5 h-5" />
            </a>
          )}
          {developer.portfolioLinks.length > 0 && (
            <a href={developer.portfolioLinks[0]} 
               target="_blank" 
               rel="noopener noreferrer"
               className="hover:text-purple-600 transition-colors">
              <Globe className="w-5 h-5" />
            </a>
          )}
        </div>
      </div>
    </div>
  )
}

export default DeveloperCard 