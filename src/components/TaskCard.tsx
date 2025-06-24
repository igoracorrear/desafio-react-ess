
import { Task } from "./KanbanBoard";

interface TaskCardProps {
  task: Task;
  onClick: () => void;
}

const TaskCard = ({ task, onClick }: TaskCardProps) => {
  const getPriorityColor = (priority: string | null) => {
    switch (priority) {
      case 'High':
        return 'bg-red-500';
      case 'Low':
        return 'bg-green-500';
      default:
        return '';
    }
  };

  const getCardColor = (status: string) => {
    switch (status) {
      case 'Pendente':
        return 'bg-red-600';
      case 'Realizando':
        return 'bg-purple-600';
      case 'Concluída':
        return 'bg-green-600';
      default:
        return 'bg-gray-600';
    }
  };

  return (
    <div
      onClick={onClick}
      className={`${getCardColor(task.status)} rounded-lg p-4 cursor-pointer hover:opacity-80 transition-opacity`}
    >
      <h3 className="text-white font-medium mb-2">{task.title}</h3>
      {task.description && (
        <p className="text-gray-200 text-sm mb-3">{task.description}</p>
      )}
      {task.priority && (
        <span className={`${getPriorityColor(task.priority)} text-white text-xs px-2 py-1 rounded`}>
          {task.priority}
        </span>
      )}
    </div>
  );
};

export default TaskCard;
