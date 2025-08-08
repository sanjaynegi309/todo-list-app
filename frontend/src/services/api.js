import axios from 'axios';

// The base URL for our FastAPI backend
const API_URL = 'http://localhost:8000/api/v1';

// Create an axios instance with a base URL
const apiClient = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

/**
 * A service object that encapsulates all API calls.
 * Components will use these methods to interact with the backend.
 */
export const apiService = {
  // Fetch all tasks from the backend
  getTasks() {
    return apiClient.get('/tasks/');
  },

  // Create a new task
  // taskData should be an object, e.g., { title: 'My new task', is_completed: false }
  createTask(taskData) {
    return apiClient.post('/tasks/', taskData);
  },

  // Update an existing task
  // taskData can contain title and/or is_completed
  updateTask(taskId, taskData) {
    return apiClient.put(`/tasks/${taskId}`, taskData);
  },

  // Delete a task by its ID
  deleteTask(taskId) {
    return apiClient.delete(`/tasks/${taskId}`);
  },
};
