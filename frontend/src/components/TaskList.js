import React from 'react';
import TaskItem from './TaskItem';

/**
 * A component that renders a list of tasks.
 * @param {object} props - The component props.
 * @param {Array<object>} props.tasks - The array of tasks to render.
 * @param {function(number, boolean): void} props.onToggleComplete - Callback for toggling task completion.
 * @param {function(number): void} props.onDeleteTask - Callback for deleting a task.
 */
function TaskList({ tasks, onToggleComplete, onDeleteTask }) {
  if (tasks.length === 0) {
    return <p className="no-tasks-message">You have no tasks yet. Add one above!</p>;
  }

  return (
    <ul className="task-list">
      {tasks.map(task => (
        <TaskItem
          key={task.id}
          task={task}
          onToggleComplete={onToggleComplete}
          onDeleteTask={onDeleteTask}
        />
      ))}
    </ul>
  );
}

export default TaskList;
