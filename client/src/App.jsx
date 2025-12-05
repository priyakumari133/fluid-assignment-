import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';
import ProgressBar from './components/ProgressBar';

// Use relative API path - works seamlessly since frontend and backend are now on same server
const API_URL = '/api';

function App() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);

  // Fetch tasks on component mount
  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${API_URL}/tasks`);
      setTasks(response.data);
    } catch (error) {
      console.error('Error fetching tasks:', error);
    } finally {
      setLoading(false);
    }
  };

  const addTask = async (title) => {
    try {
      const response = await axios.post(`${API_URL}/tasks`, { title });
      setTasks([...tasks, response.data]);
    } catch (error) {
      console.error('Error adding task:', error);
    }
  };

  const toggleTask = async (id, completed) => {
    try {
      const response = await axios.put(`${API_URL}/tasks/${id}`, { completed: !completed });
      setTasks(tasks.map(t => t.id === id ? response.data : t));
    } catch (error) {
      console.error('Error toggling task:', error);
    }
  };

  const deleteTask = async (id) => {
    try {
      await axios.delete(`${API_URL}/tasks/${id}`);
      setTasks(tasks.filter(t => t.id !== id));
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };

  const completedCount = tasks.filter(t => t.completed).length;
  const progress = tasks.length > 0 ? Math.round((completedCount / tasks.length) * 100) : 0;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
      <div className="container mx-auto max-w-2xl px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
            Task Board
          </h1>
          <p className="text-gray-600 text-sm">Stay organized and track your progress</p>
        </div>

        {/* Progress Section */}
        {tasks.length > 0 && (
          <div className="mb-8">
            <ProgressBar completed={completedCount} total={tasks.length} progress={progress} />
          </div>
        )}

        {/* Add Task Form */}
        <div className="mb-8">
          <TaskForm onAddTask={addTask} />
        </div>

        {/* Task List */}
        <div>
          {loading ? (
            <div className="flex justify-center items-center h-32">
              <div className="text-gray-400">Loading...</div>
            </div>
          ) : tasks.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-gray-400 mb-2">
                <svg className="w-12 h-12 mx-auto opacity-40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
              </div>
              <p className="text-gray-400 font-medium">No tasks yet</p>
              <p className="text-gray-300 text-sm">Add a task to get started</p>
            </div>
          ) : (
            <TaskList tasks={tasks} onToggle={toggleTask} onDelete={deleteTask} />
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
