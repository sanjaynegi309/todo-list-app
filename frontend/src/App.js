import React, { useState, useEffect } from 'react';
import { apiService } from './services/api';
// The following components will be created in the next steps.
import TaskList from './components/TaskList';
import AddTaskForm from './components/AddTaskForm';

/**
 * The main application component.
 * It manages the state of the tasks and handles all data operations.
 */
function App() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch tasks from the API when the component mounts
  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      setLoading(true);
      const response = await apiService.getTasks();
      setTasks(response.data);
      setError(null);
    } catch (err) {
      setError('Failed to fetch tasks. Please try again later.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // Handler to add a new task
  const handleAddTask = async (title) => {
    try {
      const newTaskData = { title, is_completed: false };
      const response = await apiService.createTask(newTaskData);
      setTasks([...tasks, response.data]);
    } catch (err) {
      setError('Failed to add task.');
      console.error(err);
    }
  };

  // Handler to toggle the completion status of a task
  const handleToggleComplete = async (id, is_completed) => {
    try {
      const updatedTask = await apiService.updateTask(id, { is_completed: !is_completed });
      setTasks(tasks.map(task => (task.id === id ? updatedTask.data : task)));
    } catch (err) {
      setError('Failed to update task.');
      console.error(err);
    }
  };

  // Handler to delete a task
  const handleDeleteTask = async (id) => {
    try {
      await apiService.deleteTask(id);
      setTasks(tasks.filter(task => task.id !== id));
    } catch (err) {
      setError('Failed to delete task.');
      console.error(err);
    }
  };

  return (
    <div className="App">
      <header>
        <h1>To-Do List</h1>
        <p>Built with React & FastAPI</p>
      </header>
      <main>
        <AddTaskForm onAddTask={handleAddTask} />

        {error && <p className="error">{error}</p>}
        {loading ? (
          <p>Loading tasks...</p>
        ) : (
          <TaskList
            tasks={tasks}
            onToggleComplete={handleToggleComplete}
            onDeleteTask={handleDeleteTask}
          />
        )}
      </main>
    </div>
  );
}

export default App;
