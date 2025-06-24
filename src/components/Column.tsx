
import TaskCard from "./TaskCard";
import { Task } from "./KanbanBoard";

interface ColumnProps {
  title: string;
  tasks: Task[];
  onTaskClick: (task: Task) => void;
}

const Column = ({ title, tasks, onTaskClick }: ColumnProps) => {
  return (
    <div className="bg-gray-800 rounded-lg p-4">
      <h2 className="text-xl font-semibold mb-4 text-white">{title}</h2>
      <div className="space-y-3">
        {tasks.map(task => (
          <TaskCard
            key={task.id}
            task={task}
            onClick={() => onTaskClick(task)}
          />
        ))}
      </div>
    </div>
  );
};

export default Column;
