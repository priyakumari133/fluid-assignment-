const express = require('express');
const path = require('path');
const app = express();

// Middleware
app.use(express.json());
// Serve static files from the React build directory
app.use(express.static(path.join(__dirname, '../client/dist')));

// In-memory task storage
let tasks = [];
let taskId = 1;

// GET all tasks
app.get('/api/tasks', (req, res) => {
  res.json(tasks);
});

// POST create a new task
app.post('/api/tasks', (req, res) => {
  const { title } = req.body;
  
  if (!title || title.trim() === '') {
    return res.status(400).json({ error: 'Task title is required' });
  }

  const newTask = {
    id: taskId++,
    title: title.trim(),
    completed: false,
    createdAt: new Date()
  };

  tasks.push(newTask);
  res.status(201).json(newTask);
});

// PUT update a task
app.put('/api/tasks/:id', (req, res) => {
  const { id } = req.params;
  const { completed, title } = req.body;
  
  const task = tasks.find(t => t.id === parseInt(id));
  
  if (!task) {
    return res.status(404).json({ error: 'Task not found' });
  }

  if (completed !== undefined) {
    task.completed = completed;
  }
  if (title !== undefined && title.trim() !== '') {
    task.title = title.trim();
  }

  res.json(task);
});

// DELETE a task
app.delete('/api/tasks/:id', (req, res) => {
  const { id } = req.params;
  
  const index = tasks.findIndex(t => t.id === parseInt(id));
  
  if (index === -1) {
    return res.status(404).json({ error: 'Task not found' });
  }

  const deletedTask = tasks.splice(index, 1);
  res.json(deletedTask[0]);
});

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

// Serve React app for all non-API routes (SPA fallback)
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/dist/index.html'));
});

// Start server
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
