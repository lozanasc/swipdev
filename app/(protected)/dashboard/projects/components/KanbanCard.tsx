import { Clock, Tag } from 'lucide-react'
import { ProjectTask } from '@/types'

interface KanbanCardProps {
  task: ProjectTask
  provided: any
}

const KanbanCard = ({ task, provided }: KanbanCardProps) => {
  return (
    <div
      ref={provided.innerRef}
      {...provided.draggableProps}
      {...provided.dragHandleProps}
      className="bg-background rounded-lg border border-border p-3 shadow-sm"
    >
      <h4 className="font-medium mb-2">{task.title}</h4>
      
      {task.description && (
        <p className="text-sm text-gray-500 dark:text-gray-400 mb-3">
          {task.description}
        </p>
      )}
      
      <div className="flex items-center gap-3 text-sm text-gray-500">
        {task.estimate && (
          <div className="flex items-center gap-1">
            <Clock className="w-4 h-4" />
            <span>{task.estimate}</span>
          </div>
        )}
        
        {task.task_type && (
          <div className="flex items-center gap-1">
            <Tag className="w-4 h-4" />
            <span>{task.task_type}</span>
          </div>
        )}
      </div>
    </div>
  )
}

export default KanbanCard 