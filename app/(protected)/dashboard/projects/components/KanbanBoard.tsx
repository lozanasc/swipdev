import { useState } from 'react'
import { DragDropContext, Droppable } from '@hello-pangea/dnd'
import { useProjectStore } from '@/store/projectStore'
import KanbanColumn from './KanbanColumn'
import { ProjectTask } from '@/types'

const COLUMN_TYPES = ['todo', 'inProgress', 'review', 'done'] as const

interface KanbanBoardProps {
  projectId: string
}

const KanbanBoard = ({ projectId }: KanbanBoardProps) => {
  const { projects, updateTask } = useProjectStore()
  const project = projects.find(p => p.id === projectId)

  if (!project) return null

  const handleDragEnd = (result: any) => {
    const { destination, source, draggableId } = result

    // Dropped outside a valid droppable
    if (!destination) return

    // No movement
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return
    }

    // Update task status
    const task = project.tasks.find(t => t.id === draggableId)
    if (task) {
      updateTask(projectId, task.id, {
        status: destination.droppableId as ProjectTask['status'],
        order_index: destination.index
      })
    }
  }

  // Group tasks by status
  const columns = COLUMN_TYPES.reduce((acc, status) => {
    acc[status] = project.tasks.filter(task => task.status === status)
      .sort((a, b) => a.order_index - b.order_index)
    return acc
  }, {} as Record<typeof COLUMN_TYPES[number], ProjectTask[]>)

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 h-full">
        {COLUMN_TYPES.map(columnId => (
          <Droppable key={columnId} droppableId={columnId}>
            {(provided) => (
              <KanbanColumn
                title={columnId.charAt(0).toUpperCase() + columnId.slice(1)}
                tasks={columns[columnId]}
                provided={provided}
              />
            )}
          </Droppable>
        ))}
      </div>
    </DragDropContext>
  )
}

export default KanbanBoard 