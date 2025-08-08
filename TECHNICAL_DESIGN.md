# Technical Design Document for To-Do List Web Application

This document provides a detailed technical design for the To-Do List application, expanding on the conceptual design and incorporating specific technologies as requested.

## 1. Backend Design (FastAPI)

The backend will be a RESTful API built with Python and the FastAPI framework. It will handle the business logic and data persistence for the to-do list.

### 1.1. Technology Stack
- **Framework**: FastAPI
- **Language**: Python 3.9+
- **Data Validation**: Pydantic (integrated with FastAPI)
- **Server**: Uvicorn

### 1.2. API Endpoints

The API will expose the following endpoints for managing tasks.

**Base URL**: `/api/v1`

| Method | Endpoint         | Description              | Request Body              | Response (Success)        |
|--------|------------------|--------------------------|---------------------------|---------------------------|
| `GET`    | `/tasks/`        | Get all tasks            | None                      | `200 OK` - `list[Task]`     |
| `POST`   | `/tasks/`        | Create a new task        | `TaskCreate`              | `201 Created` - `Task`      |
| `GET`    | `/tasks/{task_id}` | Get a single task by ID  | None                      | `200 OK` - `Task`           |
| `PUT`    | `/tasks/{task_id}` | Update a task's details  | `TaskUpdate`              | `200 OK` - `Task`           |
| `DELETE` | `/tasks/{task_id}` | Delete a task by ID      | None                      | `204 No Content`          |

### 1.3. Data Models (Pydantic)

```python
from pydantic import BaseModel
from typing import Optional

class TaskBase(BaseModel):
    title: str
    is_completed: bool = False

class TaskCreate(TaskBase):
    pass

class TaskUpdate(BaseModel):
    title: Optional[str] = None
    is_completed: Optional[bool] = None

class Task(TaskBase):
    id: int

    class Config:
        orm_mode = True
```

## 2. Frontend Design (React.js)

The frontend will be a Single Page Application (SPA) built using React.

### 2.1. Technology Stack
- **Framework**: React.js (using Create React App)
- **Language**: JavaScript (ES6+)/TypeScript
- **State Management**: React Hooks (`useState`, `useEffect`, `useContext`)
- **API Communication**: `fetch` API or a library like `axios`
- **Styling**: CSS Modules or a library like Styled Components

### 2.2. Component Architecture

The UI will be broken down into the following reusable components:

- **`App.js`**: The main component. It will fetch the initial task list from the API and manage the overall application state (the array of tasks). It will contain the logic for adding, updating, and deleting tasks by making API calls.
- **`TaskList.js`**: Receives the `tasks` array as a prop and renders a `TaskItem` for each task.
- **`TaskItem.js`**: Represents a single task.
    - **Props**: `task` (the task object), `onToggleComplete` (function), `onDelete` (function), `onUpdate` (function).
    - **State**: `isEditing` (boolean) to toggle between view and edit mode.
    - **Renders**: The task title, a checkbox, and a delete button. On double-click, it renders an input field to edit the task title.
- **`AddTaskForm.js`**: A form with an input field and a button to add a new task. On submit, it calls the `onAddTask` function passed down from `App.js`.
- **`Filters.js`**: Contains buttons ("All", "Active", "Completed") to filter the displayed tasks. It will manage the filter state and call a function in `App.js` to update the list view.

## 3. Database Design

### 3.1. Storage Choice
For simplicity and ease of setup, we will use **SQLite**. It's a serverless, file-based database that is well-supported by Python and suitable for small-scale applications. For a production environment, this could be swapped with PostgreSQL.

### 3.2. Database Schema
We will have a single table named `tasks`.

**Table: `tasks`**

| Column Name    | Data Type      | Constraints       | Description                   |
|----------------|----------------|-------------------|-------------------------------|
| `id`           | `INTEGER`      | `PRIMARY KEY`     | The unique identifier         |
| `title`        | `TEXT`         | `NOT NULL`        | The description of the task   |
| `is_completed` | `BOOLEAN`      | `NOT NULL`        | The completion status         |

## 4. Service Interactions and Data Flow

The data flow for common user actions will be as follows:

### 4.1. Loading the App
1.  User opens the web app.
2.  The React `App` component mounts.
3.  `useEffect` hook in `App.js` triggers a `GET /api/v1/tasks/` request.
4.  The FastAPI backend queries the SQLite database for all tasks.
5.  The API returns the list of tasks as JSON.
6.  The React app receives the data, updates its state, and renders the `TaskList`.

### 4.2. Adding a New Task
1.  User types a task title into `AddTaskForm.js` and submits.
2.  `AddTaskForm` calls the `handleAddTask` function in `App.js`.
3.  `App.js` sends a `POST /api/v1/tasks/` request with the new task's title.
4.  FastAPI validates the request, creates a new task record in the database, and returns the newly created task object with its ID.
5.  The `POST` request promise resolves. `App.js` updates its state by adding the new task to its local array.
6.  React re-renders the `TaskList` to display the new task.
