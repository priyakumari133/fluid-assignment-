import React, { useState } from 'react';

function TaskItem({ task, onToggle, onDelete }) {
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    setIsDeleting(true);
    try {
      await onDelete(task.id);
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div
      className={`flex items-center gap-3 p-4 rounded-lg border-2 transition-all ${
        task.completed
          ? 'bg-gradient-to-r from-green-50 to-emerald-50 border-green-200'
          : 'bg-white border-gray-200 hover:border-blue-300'
      }`}
    >
      {/* Checkbox */}
      <input
        type="checkbox"
        checked={task.completed}
        onChange={() => onToggle(task.id, task.completed)}
        className="w-5 h-5 text-blue-500 rounded cursor-pointer accent-blue-500 focus:ring-2 focus:ring-blue-300"
      />

      {/* Task Title */}
      <span
        className={`flex-1 text-base font-medium transition-all ${
          task.completed
            ? 'text-gray-400 line-through'
            : 'text-gray-800'
        }`}
      >
        {task.title}
      </span>

      {/* Delete Button */}
      <button
        onClick={handleDelete}
        disabled={isDeleting}
        className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-all hover:scale-110 disabled:opacity-50 disabled:cursor-not-allowed"
        title="Delete task"
      >
        {isDeleting ? (
          <svg className="w-5 h-5 animate-spin" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
        ) : (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
          </svg>
        )}
      </button>
    </div>
  );
}

export default TaskItem;
