'use client'

import { useEffect } from 'react'
import { useProjectStore } from '@/store/projectStore'
import KanbanBoard from '../components/KanbanBoard'
import LoadingScreen from '@/components/LoadingScreen'

export default function ProjectPage({ params }: { params: { id: string } }) {
  const { fetchProject, currentProject, isLoading, error } = useProjectStore()

  useEffect(() => {
    fetchProject(params.id)
  }, [fetchProject, params.id])

  if (isLoading) {
    return <LoadingScreen message="Loading project..." />
  }

  if (error) {
    return (
      <div className="p-6">
        <p className="text-red-500">{error}</p>
      </div>
    )
  }

  if (!currentProject) {
    return (
      <div className="p-6">
        <p>Project not found</p>
      </div>
    )
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">{currentProject.title}</h1>
      <KanbanBoard projectId={params.id} />
    </div>
  )
} 