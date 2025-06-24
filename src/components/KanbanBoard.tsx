
import { useState } from "react";
import { DragDropContext, Droppable, Draggable, DropResult } from "react-beautiful-dnd";
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
  order: number;
}

const KanbanBoard = () => {
  const [tasks, setTasks] = useState<Task[]>([
    {
      id: 1,
      title: "Tablet view",
      description: "Show audio in a note and playback UI",
      status: "Pendente",
      priority: null,
      order: 0
    },
    {
      id: 2,
      title: "Audio recording in note",
      description: "Show audio in a note and playback UI",
      status: "Pendente",
      priority: "High",
      order: 1
    },
    {
      id: 3,
      title: "Bookmark in note",
      description: "Show rich link UI in a note, and feature to render website screenshot.",
      status: "Pendente",
      priority: "Low",
      order: 2
    },
    {
      id: 4,
      title: "Image viewer",
      description: "Opens when sticker on the thumbnail in note viewer.",
      status: "Pendente",
      priority: null,
      order: 3
    },
    {
      id: 5,
      title: "Mobile view",
      description: "Functions for both web responsive and native apps. Note: Android and iOS will need unique share icons.",
      status: "Realizando",
      priority: null,
      order: 0
    },
    {
      id: 6,
      title: "Desktop view",
      description: "PWA for website and native apps. Note: Windows and Mac will need unique share icons.",
      status: "Realizando",
      priority: null,
      order: 1
    },
    {
      id: 7,
      title: "Formatting options",
      description: "Mobile formatting bar expands and collapses when tapping the format icon.",
      status: "Realizando",
      priority: null,
      order: 2
    },
    {
      id: 8,
      title: "Media in note",
      description: "",
      status: "Realizando",
      priority: null,
      order: 3
    },
    {
      id: 9,
      title: "Audio recording",
      description: "Interface for when recording a new audio note",
      status: "Concluída",
      priority: "Low",
      order: 0
    },
    {
      id: 10,
      title: "Bookmarking",
      description: "Interface for when creating a new link note.",
      status: "Concluída",
      priority: "Low",
      order: 1
    },
    {
      id: 11,
      title: "Mobile home screen",
      description: "Folders, tags, and notes lists are sorted by recent.",
      status: "Concluída",
      priority: null,
      order: 2
    }
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [isNewTaskModalOpen, setIsNewTaskModalOpen] = useState(false);

  const filteredTasks = tasks.filter(task =>
    task.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const addTask = (title: string, description: string) => {
    const pendingTasks = tasks.filter(task => task.status === "Pendente");
    const newOrder = pendingTasks.length;
    
    const newTask: Task = {
      id: Date.now(),
      title,
      description,
      status: "Pendente",
      priority: null,
      order: newOrder
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
    return filteredTasks
      .filter(task => task.status === status)
      .sort((a, b) => a.order - b.order);
  };

  const onDragEnd = (result: DropResult) => {
    const { destination, source, draggableId } = result;

    if (!destination) {
      return;
    }

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    const taskId = parseInt(draggableId);
    const task = tasks.find(t => t.id === taskId);
    
    if (!task) return;

    const newStatus = destination.droppableId as Task['status'];
    const sourceStatus = source.droppableId as Task['status'];

    // Update task status and reorder
    if (newStatus !== sourceStatus) {
      // Moving to a different column
      const updatedTask = { ...task, status: newStatus };
      
      // Update orders in both source and destination columns
      const updatedTasks = tasks.map(t => {
        if (t.id === taskId) {
          return { ...updatedTask, order: destination.index };
        }
        
        // Reorder tasks in source column
        if (t.status === sourceStatus && t.order > source.index) {
          return { ...t, order: t.order - 1 };
        }
        
        // Reorder tasks in destination column
        if (t.status === newStatus && t.order >= destination.index) {
          return { ...t, order: t.order + 1 };
        }
        
        return t;
      });
      
      setTasks(updatedTasks);
    } else {
      // Reordering within the same column
      const columnTasks = tasks.filter(t => t.status === sourceStatus);
      const updatedTasks = [...tasks];
      
      // Remove task from source position
      columnTasks.splice(source.index, 1);
      // Insert task at destination position
      columnTasks.splice(destination.index, 0, task);
      
      // Update orders
      columnTasks.forEach((t, index) => {
        const taskIndex = updatedTasks.findIndex(ut => ut.id === t.id);
        if (taskIndex !== -1) {
          updatedTasks[taskIndex] = { ...updatedTasks[taskIndex], order: index };
        }
      });
      
      setTasks(updatedTasks);
    }
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
        <DragDropContext onDragEnd={onDragEnd}>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Column
              title="Pendente"
              tasks={getTasksByStatus("Pendente")}
              onTaskClick={setSelectedTask}
              columnId="Pendente"
            />
            <Column
              title="Realizando"
              tasks={getTasksByStatus("Realizando")}
              onTaskClick={setSelectedTask}
              columnId="Realizando"
            />
            <Column
              title="Concluída"
              tasks={getTasksByStatus("Concluída")}
              onTaskClick={setSelectedTask}
              columnId="Concluída"
            />
          </div>
        </DragDropContext>

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
