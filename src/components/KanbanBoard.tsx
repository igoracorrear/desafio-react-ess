
import { useState } from "react";
import { Card } from "@/components/ui/card";
import Column from "./Column";
import SearchBar from "./SearchBar";
import TaskModal from "./TaskModal";
import NewTaskModal from "./NewTaskModal";

export interface Task {
  id: number;
  title: string;
  description: string;
  status: 'Pendente' | 'Realizando' | 'Concluída';
  priority: 'High' | 'Low' | null;
}

const KanbanBoard = () => {
  const [tasks, setTasks] = useState<Task[]>([
    {
      id: 1,
      title: "Tablet view",
      description: "Show audio in a note and playback UI",
      status: "Pendente",
      priority: null
    },
    {
      id: 2,
      title: "Audio recording in note",
      description: "Show audio in a note and playback UI",
      status: "Pendente",
      priority: "High"
    },
    {
      id: 3,
      title: "Bookmark in note",
      description: "Show rich link UI in a note, and feature to render website screenshot.",
      status: "Pendente",
      priority: "Low"
    },
    {
      id: 4,
      title: "Image viewer",
      description: "Opens when sticker on the thumbnail in note viewer.",
      status: "Pendente",
      priority: null
    },
    {
      id: 5,
      title: "Mobile view",
      description: "Functions for both web responsive and native apps. Note: Android and iOS will need unique share icons.",
      status: "Realizando",
      priority: null
    },
    {
      id: 6,
      title: "Desktop view",
      description: "PWA for website and native apps. Note: Windows and Mac will need unique share icons.",
      status: "Realizando",
      priority: null
    },
    {
      id: 7,
      title: "Formatting options",
      description: "Mobile formatting bar expands and collapses when tapping the format icon.",
      status: "Realizando",
      priority: null
    },
    {
      id: 8,
      title: "Media in note",
      description: "",
      status: "Realizando",
      priority: null
    },
    {
      id: 9,
      title: "Audio recording",
      description: "Interface for when recording a new audio note",
      status: "Concluída",
      priority: "Low"
    },
    {
      id: 10,
      title: "Bookmarking",
      description: "Interface for when creating a new link note.",
      status: "Concluída",
      priority: "Low"
    },
    {
      id: 11,
      title: "Mobile home screen",
      description: "Folders, tags, and notes lists are sorted by recent.",
      status: "Concluída",
      priority: null
    }
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [isNewTaskModalOpen, setIsNewTaskModalOpen] = useState(false);

  const filteredTasks = tasks.filter(task =>
    task.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const addTask = (title: string, description: string) => {
    const newTask: Task = {
      id: Date.now(),
      title,
      description,
      status: "Pendente",
      priority: null
    };
    setTasks([...tasks, newTask]);
  };

  const updateTask = (updatedTask: Task) => {
    setTasks(tasks.map(task =>
      task.id === updatedTask.id ? updatedTask : task
    ));
  };

  const deleteTask = (taskId: number) => {
    setTasks(tasks.filter(task => task.id !== taskId));
  };

  const getTasksByStatus = (status: string) => {
    return filteredTasks.filter(task => task.status === status);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-4xl font-bold">Kanban</h1>
          <div className="flex items-center gap-4">
            <SearchBar searchTerm={searchTerm} onSearchChange={setSearchTerm} />
            <button
              onClick={() => setIsNewTaskModalOpen(true)}
              className="px-6 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition-colors"
            >
              Nova atividade
            </button>
          </div>
        </div>

        {/* Kanban Columns */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Column
            title="Pendente"
            tasks={getTasksByStatus("Pendente")}
            onTaskClick={setSelectedTask}
          />
          <Column
            title="Realizando"
            tasks={getTasksByStatus("Realizando")}
            onTaskClick={setSelectedTask}
          />
          <Column
            title="Concluída"
            tasks={getTasksByStatus("Concluída")}
            onTaskClick={setSelectedTask}
          />
        </div>

        {/* Task Details Modal */}
        {selectedTask && (
          <TaskModal
            task={selectedTask}
            onClose={() => setSelectedTask(null)}
            onUpdate={updateTask}
            onDelete={deleteTask}
          />
        )}

        {/* New Task Modal */}
        {isNewTaskModalOpen && (
          <NewTaskModal
            onClose={() => setIsNewTaskModalOpen(false)}
            onAdd={addTask}
          />
        )}
      </div>
    </div>
  );
};

export default KanbanBoard;
