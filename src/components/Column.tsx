
import { Droppable, Draggable } from "react-beautiful-dnd";
import TaskCard from "./TaskCard";
import { Task } from "./KanbanBoard";

interface ColumnProps {
  title: string;
  tasks: Task[];
  onTaskClick: (task: Task) => void;
  columnId: string;
}

const Column = ({ title, tasks, onTaskClick, columnId }: ColumnProps) => {
  return (
    <div className="bg-gray-800 rounded-lg p-4">
      <h2 className="text-xl font-semibold mb-4 text-white">{title}</h2>
      <Droppable droppableId={columnId}>
        {(provided, snapshot) => (
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
            className={`space-y-3 min-h-[200px] rounded-lg p-2 transition-colors ${
              snapshot.isDraggingOver ? 'bg-gray-700/50' : ''
            }`}
          >
            {tasks.map((task, index) => (
              <Draggable key={task.id} draggableId={task.id.toString()} index={index}>
                {(provided, snapshot) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    className={`transition-transform ${
                      snapshot.isDragging ? 'rotate-3 scale-105' : ''
                    }`}
                  >
                    <TaskCard
                      task={task}
                      onClick={() => onTaskClick(task)}
                    />
                  </div>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  );
};

export default Column;
