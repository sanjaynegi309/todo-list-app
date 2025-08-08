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
├── terraform/          # Terraform configuration for GCP
├── .github/workflows/  # GitHub Actions workflows
├── docker-compose.yml  # Orchestrates services for local development
└── README.md           # This file
```

## CI/CD Pipeline

This project includes a complete CI/CD pipeline using GitHub Actions to automatically test, build, and deploy the application to Google Cloud Run. The workflow is defined in `.github/workflows/deploy.yml`.

### Workflow Steps

1.  **Trigger**: The workflow runs automatically on every push to the `main` branch.
2.  **Test**: It runs the backend (`pytest`) and frontend (`npm test`) tests in parallel.
3.  **Build & Push**: If the tests pass, it builds Docker images for the backend and frontend, tags them with the commit SHA, and pushes them to Google Container Registry (GCR).
4.  **Deploy**: It uses Terraform to provision two Google Cloud Run services and deploys the new images.

### Required GitHub Secrets

To use this workflow, you must configure the following secrets in your GitHub repository's settings (`Settings > Secrets and variables > Actions`):

-   `GCP_PROJECT_ID`: Your Google Cloud project ID.
-   `GCP_SA_KEY`: The JSON key for a GCP Service Account. This service account should have the following roles:
    -   `Cloud Run Admin` (roles/run.admin)
    -   `Storage Admin` (roles/storage.admin) - for pushing to GCR
    -   `Service Account User` (roles/iam.serviceAccountUser)
