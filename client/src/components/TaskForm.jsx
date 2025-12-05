import React, { useState } from 'react';

function TaskForm({ onAddTask }) {
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (input.trim() === '') return;

    setIsLoading(true);
    try {
      await onAddTask(input);
      setInput('');
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="flex gap-3">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="What needs to be done?"
          className="flex-1 px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200 transition-all bg-white text-gray-800 placeholder-gray-400"
          disabled={isLoading}
        />
        <button
          type="submit"
          disabled={isLoading || input.trim() === ''}
          className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white font-semibold rounded-lg hover:from-blue-600 hover:to-purple-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-md hover:shadow-lg"
        >
          {isLoading ? (
            <span className="inline-block">
              <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
            </span>
          ) : (
            'Add Task'
          )}
        </button>
      </div>
    </form>
  );
}

export default TaskForm;
