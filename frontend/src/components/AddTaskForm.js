import React, { useState } from 'react';

/**
 * A form component for adding new tasks.
 * @param {object} props - The component props.
 * @param {function(string): void} props.onAddTask - The callback function to call when a new task is added.
 */
function AddTaskForm({ onAddTask }) {
  const [title, setTitle] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) {
      // Don't add empty tasks
      return;
    }
    onAddTask(title);
    setTitle(''); // Clear the input field after adding
  };

  return (
    <form onSubmit={handleSubmit} className="add-task-form">
      <input
        type="text"
        placeholder="What needs to be done?"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="task-input"
      />
      <button type="submit" className="add-button">Add Task</button>
    </form>
  );
}

export default AddTaskForm;
