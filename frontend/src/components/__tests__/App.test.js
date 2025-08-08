import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import App from '../../App';
import { apiService } from '../../services/api';

// Mock the apiService to avoid actual network calls
jest.mock('../../services/api');

const mockTasks = [
  { id: 1, title: 'Learn React Testing', is_completed: false },
  { id: 2, title: 'Write some tests', is_completed: true },
];

describe('App component', () => {
  beforeEach(() => {
    // Reset mocks before each test
    apiService.getTasks.mockClear();
    apiService.createTask.mockClear();
    apiService.deleteTask.mockClear();
  });

  test('renders loading state initially and then displays tasks', async () => {
    apiService.getTasks.mockResolvedValue({ data: mockTasks });

    render(<App />);

    // Check for loading message
    expect(screen.getByText(/loading tasks.../i)).toBeInTheDocument();

    // Wait for tasks to be loaded and displayed
    const task1 = await screen.findByText('Learn React Testing');
    const task2 = await screen.findByText('Write some tests');

    expect(task1).toBeInTheDocument();
    expect(task2).toBeInTheDocument();

    // Check that the loading message is gone
    expect(screen.queryByText(/loading tasks.../i)).not.toBeInTheDocument();
  });

  test('allows a user to add a new task', async () => {
    const newTask = { id: 3, title: 'A new task', is_completed: false };
    apiService.getTasks.mockResolvedValue({ data: mockTasks });
    apiService.createTask.mockResolvedValue({ data: newTask });

    render(<App />);

    // Wait for initial tasks to load
    await screen.findByText('Learn React Testing');

    const input = screen.getByPlaceholderText(/what needs to be done/i);
    const addButton = screen.getByRole('button', { name: /add task/i });

    // User types and clicks add
    fireEvent.change(input, { target: { value: 'A new task' } });
    fireEvent.click(addButton);

    // Wait for the new task to appear in the document
    const addedTask = await screen.findByText('A new task');
    expect(addedTask).toBeInTheDocument();

    // Check if the API was called correctly
    expect(apiService.createTask).toHaveBeenCalledWith({ title: 'A new task', is_completed: false });
  });

  test('allows a user to delete a task', async () => {
    apiService.getTasks.mockResolvedValue({ data: mockTasks });
    apiService.deleteTask.mockResolvedValue({}); // Mock successful deletion

    render(<App />);

    const taskToDelete = await screen.findByText('Learn React Testing');
    expect(taskToDelete).toBeInTheDocument();

    // Find the delete button associated with the first task
    const deleteButtons = screen.getAllByRole('button', { name: /×/i });
    fireEvent.click(deleteButtons[0]);

    // Wait for the task to be removed from the UI
    await waitFor(() => {
      expect(screen.queryByText('Learn React Testing')).not.toBeInTheDocument();
    });

    // Check if the API was called correctly
    expect(apiService.deleteTask).toHaveBeenCalledWith(1); // ID of the first task
  });

  test('displays an error message if fetching tasks fails', async () => {
    apiService.getTasks.mockRejectedValue(new Error('Failed to fetch'));

    render(<App />);

    const errorMessage = await screen.findByText(/failed to fetch tasks/i);
    expect(errorMessage).toBeInTheDocument();
  });
});
