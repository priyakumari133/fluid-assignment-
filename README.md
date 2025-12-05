# Task Board - Full Stack Application

A modern, beautiful task management application built with **React**, **Vite**, **Tailwind CSS**, and **Express.js**.

## 🎨 Features

- ✅ **Clean UI** - Modern gradient design with smooth animations
- ✅ **Add Tasks** - Quick task creation with keyboard support
- ✅ **Task Management** - Complete and delete tasks with real-time updates
- ✅ **Progress Tracking** - Visual progress bar with percentage indicator
- ✅ **Responsive Design** - Works seamlessly on all devices
- ✅ **Full-Stack** - React frontend with Express backend
- ✅ **Persistent Storage** - Tasks persist during app runtime

## 🚀 Tech Stack

### Frontend
- **React 18** - UI library
- **Vite** - Ultra-fast build tool
- **Tailwind CSS** - Utility-first CSS framework
- **Axios** - HTTP client

### Backend
- **Express.js** - Node.js web framework
- **CORS** - Cross-origin resource sharing

## 📁 Project Structure

```
task-board/
├── client/                 # React + Vite frontend
│   ├── src/
│   │   ├── components/    # React components
│   │   ├── App.jsx        # Main app component
│   │   ├── main.jsx       # Entry point
│   │   └── index.css      # Global styles
│   ├── vite.config.js     # Vite configuration
│   ├── tailwind.config.js # Tailwind configuration
│   └── package.json
├── server/                # Express backend
│   ├── server.js          # Main server file
│   └── package.json
└── package.json           # Root package.json
```

## 🏃 Getting Started

### Local Development

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Start both client and server:**
   ```bash
   npm run dev:all
   ```

   Or run separately:
   ```bash
   # Terminal 1 - Backend
   cd server && npm install && npm start

   # Terminal 2 - Frontend
   cd client && npm install && npm run dev
   ```

3. **Access the app:**
   - Frontend: http://localhost:3000
   - Backend: http://localhost:3001

### Build for Production

```bash
npm run build
```

## 🔧 API Endpoints

- `GET /api/tasks` - Get all tasks
- `POST /api/tasks` - Create a new task
- `PUT /api/tasks/:id` - Update a task (mark as complete)
- `DELETE /api/tasks/:id` - Delete a task
- `GET /health` - Health check

## 💡 Unique Features

- **Gradient Design** - Beautiful gradient backgrounds and buttons
- **Smooth Animations** - Transitions on all interactive elements
- **Empty State UI** - Helpful message when no tasks exist
- **Loading States** - Visual feedback for async operations
- **Keyboard Support** - Press Enter to add tasks
- **Responsive Layout** - Mobile-friendly design

## 📝 Usage

1. Type your task in the input box
2. Click "Add Task" or press Enter
3. Check the checkbox to mark tasks as complete
4. Watch the progress bar update in real-time
5. Click the trash icon to delete tasks

## 🎯 Future Enhancements

- Task categories/tags
- Due dates
- Local storage persistence
- Task editing
- Drag-and-drop reordering

---

**Built with ❤️ in 60 minutes**
