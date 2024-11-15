'use client'

import { Moon, Sun } from 'lucide-react'
import { useUIStore } from '@/store/uiStore'

export default function ThemeToggle() {
  const { theme, setTheme } = useUIStore()

  return (
    <button
      onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
      className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
      aria-label="Toggle theme"
    >
      {theme === 'light' ? (
        <Moon className="w-5 h-5" />
      ) : (
        <Sun className="w-5 h-5" />
      )}
    </button>
  )
} 