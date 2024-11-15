import { Draggable } from '@hello-pangea/dnd'
import { ProjectTask } from '@/types'
import KanbanCard from './KanbanCard'

interface KanbanColumnProps {
  title: string
  tasks: ProjectTask[]
  provided: any
}

const KanbanColumn = ({ title, tasks, provided }: KanbanColumnProps) => {
  return (
    <div
      className="bg-card/50 backdrop-blur-sm rounded-xl border border-border p-4"
      ref={provided.innerRef}
      {...provided.droppableProps}
    >
      <h3 className="font-medium mb-4">{title}</h3>
      
      <div className="space-y-3">
        {tasks.map((task, index) => (
          <Draggable key={task.id} draggableId={task.id} index={index}>
            {(provided) => (
              <KanbanCard task={task} provided={provided} />
            )}
          </Draggable>
        ))}
        {provided.placeholder}
      </div>
    </div>
  )
}

export default KanbanColumn 