'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuthStore } from '@/store/authStore'
import { useProfileStore } from '@/store/profileStore'
import LoadingScreen from '@/components/LoadingScreen'
import DashboardHeader from '@/app/(protected)/components/DashboardHeader'
import DashboardSidebar from '@/app/(protected)/components/DashboardSidebar'
import { ArrowUpRight, Users, DollarSign, Briefcase } from 'lucide-react'

const stats = [
  {
    name: 'Total Developers',
    value: '2,000+',
    change: '+12.3%',
    icon: Users,
  },
  {
    name: 'Active Projects',
    value: '145',
    change: '+8.2%',
    icon: Briefcase,
  },
  {
    name: 'Total Revenue',
    value: '$542.5K',
    change: '+15.6%',
    icon: DollarSign,
  },
]

export default function DashboardPage() {
  const router = useRouter()
  const { user } = useAuthStore()
  const { isLoading } = useProfileStore()

  useEffect(() => {
    if (!user) {
      router.push('/login')
    }
  }, [user, router])

  if (isLoading) {
    return <LoadingScreen message="Loading your profile..." />
  }

  return (
    <div className="min-h-screen bg-background">
      <DashboardSidebar />
      <div className="lg:pl-64">
        <DashboardHeader />
        <main className="p-6">
          {/* Welcome Section */}
          <div className="mb-8">
            <h1 className="text-2xl font-bold mb-2">
              Welcome back, {user?.email?.split('@')[0]}!
            </h1>
            <p className="text-gray-500 dark:text-gray-400">
              Here&apos;s what&apos;s happening with your projects today.
            </p>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {stats.map((stat) => (
              <div
                key={stat.name}
                className="bg-card/50 backdrop-blur-sm border border-border rounded-xl p-6"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="p-2 bg-purple-100 dark:bg-purple-900/20 rounded-lg">
                    <stat.icon className="w-5 h-5 text-purple-600" />
                  </div>
                  <div className="flex items-center text-green-600 text-sm">
                    <ArrowUpRight className="w-4 h-4" />
                    {stat.change}
                  </div>
                </div>
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">
                  {stat.name}
                </p>
                <p className="text-2xl font-bold">{stat.value}</p>
              </div>
            ))}
          </div>

          {/* Content Area */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-card/50 backdrop-blur-sm border border-border rounded-xl p-6">
              <h2 className="text-lg font-semibold mb-4">Recent Activity</h2>
              <div className="space-y-4">
                {/* Add your recent activity content here */}
                <p className="text-gray-500 dark:text-gray-400">
                  No recent activity to show.
                </p>
              </div>
            </div>

            <div className="bg-card/50 backdrop-blur-sm border border-border rounded-xl p-6">
              <h2 className="text-lg font-semibold mb-4">Upcoming Tasks</h2>
              <div className="space-y-4">
                {/* Add your upcoming tasks content here */}
                <p className="text-gray-500 dark:text-gray-400">
                  No upcoming tasks to show.
                </p>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
} 