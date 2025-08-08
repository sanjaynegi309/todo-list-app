import React from 'react';

/**
 * A component that renders a single task item.
 * @param {object} props - The component props.
 * @param {object} props.task - The task object to render.
 * @param {function(number, boolean): void} props.onToggleComplete - Callback to toggle the task's completion status.
 * @param {function(number): void} props.onDeleteTask - Callback to delete the task.
 */
function TaskItem({ task, onToggleComplete, onDeleteTask }) {
  return (
    <li className={`task-item ${task.is_completed ? 'completed' : ''}`}>
      <div className="task-info">
        <input
          type="checkbox"
          checked={task.is_completed}
          onChange={() => onToggleComplete(task.id, task.is_completed)}
        />
        <span>{task.title}</span>
      </div>
      <button onClick={() => onDeleteTask(task.id)} className="delete-button">
        &times;
      </button>
    </li>
  );
}

export default TaskItem;
