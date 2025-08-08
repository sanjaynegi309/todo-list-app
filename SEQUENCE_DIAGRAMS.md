# UML Sequence Diagrams for To-Do List App

This document contains UML sequence diagrams for key user interactions in the To-Do List application. The diagrams are represented using Mermaid syntax.

## 1. Adding a Task

This diagram shows the sequence of events when a user adds a new task to their list.

```mermaid
sequenceDiagram
    participant User
    participant ReactFrontend as React Frontend
    participant FastAPIBackend as FastAPI Backend
    participant Database

    User->>ReactFrontend: Enters task title and clicks "Add"
    ReactFrontend->>FastAPIBackend: POST /api/v1/tasks/ (TaskCreate)
    activate FastAPIBackend
    FastAPIBackend->>Database: INSERT INTO tasks (title, is_completed) VALUES (...)
    activate Database
    Database-->>FastAPIBackend: Return new task with ID
    deactivate Database
    FastAPIBackend-->>ReactFrontend: 201 Created (Task)
    deactivate FastAPIBackend
    ReactFrontend->>User: Update UI to show new task
```

## 2. Marking a Task as Complete

This diagram illustrates how a task's completion status is updated.

```mermaid
sequenceDiagram
    participant User
    participant ReactFrontend as React Frontend
    participant FastAPIBackend as FastAPI Backend
    participant Database

    User->>ReactFrontend: Clicks checkbox for a task
    ReactFrontend->>FastAPIBackend: PUT /api/v1/tasks/{task_id} (TaskUpdate: is_completed=true)
    activate FastAPIBackend
    FastAPIBackend->>Database: UPDATE tasks SET is_completed=true WHERE id={task_id}
    activate Database
    Database-->>FastAPIBackend: Confirm update
    deactivate Database
    FastAPIBackend-->>ReactFrontend: 200 OK (Task)
    deactivate FastAPIBackend
    ReactFrontend->>User: Update UI (e.g., strikethrough task)
```

## 3. Deleting a Task

This diagram shows the sequence for deleting a task from the list.

```mermaid
sequenceDiagram
    participant User
    participant ReactFrontend as React Frontend
    participant FastAPIBackend as FastAPI Backend
    participant Database

    User->>ReactFrontend: Clicks "Delete" button for a task
    ReactFrontend->>FastAPIBackend: DELETE /api/v1/tasks/{task_id}
    activate FastAPIBackend
    FastAPIBackend->>Database: DELETE FROM tasks WHERE id={task_id}
    activate Database
    Database-->>FastAPIBackend: Confirm deletion
    deactivate Database
    FastAPIBackend-->>ReactFrontend: 204 No Content
    deactivate FastAPIBackend
    ReactFrontend->>User: Update UI to remove task
```
