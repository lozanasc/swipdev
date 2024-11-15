'use client'

import { useAuthStore } from '@/store/authStore'
import { LogOut, Menu, User } from 'lucide-react'
import ThemeToggle from '@/components/ThemeToggle'
import { useUIStore } from '@/store/uiStore'

export default function DashboardHeader() {
  const { user, logout } = useAuthStore()
  const { setSidebarOpen } = useUIStore()

  return (
    <header className="border-b border-border bg-background/50 backdrop-blur-xl">
      <div className="flex items-center justify-between px-4 py-3">
        {/* Left section */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => setSidebarOpen(true)}
            className="lg:hidden p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
          >
            <Menu className="w-5 h-5" />
          </button>
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-purple-600" />
            <span className="font-medium text-lg hidden sm:inline">SwipDev</span>
          </div>
        </div>

        {/* Right section */}
        <div className="flex items-center gap-2">
          <ThemeToggle />
          <div className="relative group">
            <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors">
              <User className="w-5 h-5" />
            </button>
            <div className="absolute right-0 top-full mt-2 w-48 py-2 bg-card border border-border rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all">
              <div className="px-4 py-2 border-b border-border">
                <p className="text-sm font-medium">{user?.email}</p>
                <p className="text-xs text-gray-500 capitalize">{user?.type}</p>
              </div>
              <button
                onClick={logout}
                className="w-full flex items-center gap-2 px-4 py-2 text-sm text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20"
              >
                <LogOut className="w-4 h-4" />
                Logout
              </button>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}