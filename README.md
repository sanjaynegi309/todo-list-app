# To-Do List Web Application

This project is a simple To-Do List web application built with a modern tech stack. The goal is to demonstrate a full-stack application with a decoupled frontend and backend.

## Project Overview

The application allows users to create, view, update, and delete tasks. The architecture consists of:

- **Backend**: A RESTful API built with Python and **FastAPI**. It handles business logic and data persistence.
- **Frontend**: A single-page application (SPA) built with **React.js**.
- **Database**: A **SQLite** database for storing task data.
- **Containerization**: The entire application is containerized using **Docker** and orchestrated with **Docker Compose**.

## Getting Started

### Prerequisites

- [Docker](https://www.docker.com/get-started)
- [Docker Compose](https://docs.docker.com/compose/install/)

### Running the Application

1.  **Clone the repository:**
    ```sh
    git clone <repository-url>
    cd <repository-folder>
    ```

2.  **Build and run the services using Docker Compose:**
    ```sh
    docker-compose up --build
    ```

3.  **Access the application:**
    - The **Frontend** will be available at [http://localhost:3000](http://localhost:3000).
    - The **Backend API** will be available at [http://localhost:8000](http://localhost:8000).
    - The interactive API documentation (Swagger UI) can be accessed at [http://localhost:8000/docs](http://localhost:8000/docs).

## Project Structure

```
.
├── backend/
│   ├── app/            # FastAPI application code
│   ├── Dockerfile      # Dockerfile for the backend
│   └── requirements.txt
├── frontend/
│   ├── public/
│   ├── src/            # React application code
│   ├── Dockerfile      # Dockerfile for the frontend
│   └── package.json
├── docker-compose.yml  # Orchestrates the services
└── README.md           # This file
```
