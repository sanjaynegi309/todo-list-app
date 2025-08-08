import React, { useState, useEffect } from 'react';

function App() {
  const [tasks, setTasks] = useState([]);

  // Placeholder for fetching tasks
  useEffect(() => {
    // In a real app, you'd fetch from your API here
    // e.g., fetch('/api/v1/tasks').then(res => res.json()).then(data => setTasks(data));
    const mockTasks = [
      { id: 1, title: 'Set up project structure', is_completed: true },
      { id: 2, title: 'Build the frontend', is_completed: false },
      { id: 3, title: 'Connect to backend API', is_completed: false },
    ];
    setTasks(mockTasks);
  }, []);

  return (
    <div className="App">
      <header>
        <h1>To-Do List</h1>
      </header>
      <div>
        {/* Placeholder for adding a new task */}
        <input type="text" placeholder="Add a new task..." />
        <button>Add</button>
      </div>
      <ul>
        {tasks.map(task => (
          <li key={task.id} style={{ textDecoration: task.is_completed ? 'line-through' : 'none' }}>
            {task.title}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
