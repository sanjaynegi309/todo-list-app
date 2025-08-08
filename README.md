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

## Running Tests Locally

This project includes automated tests for both the backend and frontend.

### Backend Tests (Pytest)

1.  **Navigate to the backend directory:** `cd backend`
2.  **Install dependencies into a virtual environment:** `pip install -r requirements.txt`
3.  **Run tests:** `pytest`

### Frontend Tests (Jest)

1.  **Navigate to the frontend directory:** `cd frontend`
2.  **Install dependencies:** `npm install`
3.  **Run tests:** `npm test`

For more details on testing, see the `TESTING.md` file.

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

## Deployment to GCP with CI/CD

This project is configured for continuous deployment to Google Cloud Run using a GitHub Actions workflow defined in `.github/workflows/deploy.yml`.

### How It Works

The pipeline automates all the steps required to get your code from a Git push to a live application:

1.  **Trigger**: The workflow runs automatically on every push to the `main` branch.
2.  **Test**: It runs the backend and frontend tests to ensure code quality.
3.  **Build**: It builds new Docker images for the backend and frontend.
4.  **Push**: It pushes the new images to Google Container Registry (GCR).
5.  **Deploy**: It uses Terraform to apply the infrastructure configuration, deploying the new images to the Google Cloud Run services.

### How to Deploy

Deployment is automatic. To deploy a new version of the application, simply **push your changes to the `main` branch**:

```sh
git push origin main
```

You can monitor the progress of the deployment in the "Actions" tab of your GitHub repository.

### Setup for Deployment

Before the workflow can run successfully, you need to perform a one-time setup:

1.  **Create a GCP Project**: If you don't have one already, create a project in the [Google Cloud Console](https://console.cloud.google.com/).

2.  **Enable APIs**: Ensure the **Cloud Run API**, **Container Registry API**, and **IAM API** are enabled for your project. The Terraform script will also attempt to enable them.

3.  **Create a Service Account**: Create a GCP Service Account that the GitHub workflow will use to authenticate.

4.  **Grant Permissions**: Grant the following IAM roles to your new Service Account:
    -   `Cloud Run Admin` (`roles/run.admin`)
    -   `Storage Admin` (`roles/storage.admin`)
    -   `Service Account User` (`roles/iam.serviceAccountUser`)

5.  **Create a Service Account Key**: Generate a JSON key for the Service Account and download it.

6.  **Configure GitHub Secrets**: In your GitHub repository, go to `Settings > Secrets and variables > Actions` and add the following secrets:
    -   `GCP_PROJECT_ID`: Your Google Cloud project ID.
    -   `GCP_SA_KEY`: The full content of the JSON key file you downloaded in the previous step.
