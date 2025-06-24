
import { useState } from "react";
import { Task } from "./KanbanBoard";

interface TaskModalProps {
  task: Task;
  onClose: () => void;
  onUpdate: (task: Task) => void;
  onDelete: (taskId: number) => void;
}

const TaskModal = ({ task, onClose, onUpdate, onDelete }: TaskModalProps) => {
  const [description, setDescription] = useState(task.description);
  const [status, setStatus] = useState(task.status);

  const handleSave = () => {
    onUpdate({
      ...task,
      description,
      status
    });
    onClose();
  };

  const handleDelete = () => {
    onDelete(task.id);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-gray-800 rounded-lg p-6 w-full max-w-2xl mx-4">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-white">{task.title}</h2>
          <div className="flex items-center gap-2">
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value as Task['status'])}
              className="bg-gray-700 text-white px-3 py-1 rounded border border-gray-600 focus:outline-none focus:border-gray-400"
            >
              <option value="Pendente">Pendente</option>
              <option value="Realizando">Realizando</option>
              <option value="Concluída">Concluída</option>
            </select>
            <button
              onClick={handleDelete}
              className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition-colors"
            >
              Deletar atividade
            </button>
            <button
              onClick={onClose}
              className="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700 transition-colors"
            >
              Editar informações
            </button>
          </div>
        </div>

        <div className="mb-4">
          <label className="block text-white text-sm font-medium mb-2">
            Descrição
          </label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Interface for when recording a new audio note"
            className="w-full bg-gray-700 text-white border border-gray-600 rounded-lg p-3 h-40 resize-none focus:outline-none focus:border-gray-400"
          />
        </div>

        <div className="flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-6 py-2 bg-gray-600 text-white rounded hover:bg-gray-700 transition-colors"
          >
            Cancelar
          </button>
          <button
            onClick={handleSave}
            className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
          >
            Salvar
          </button>
        </div>
      </div>
    </div>
  );
};

export default TaskModal;
