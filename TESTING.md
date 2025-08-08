# Testing Guide

This document provides instructions on how to run the automated tests for both the backend and frontend services. It also includes a sample configuration for running tests in a CI/CD pipeline.

## 1. Backend Testing (Pytest)

The backend tests are written using `pytest` and are located in the `backend/tests` directory. The tests run against a temporary, in-memory SQLite database to ensure isolation from the development database.

### Running Tests Locally

1.  **Navigate to the backend directory:**
    ```sh
    cd backend
    ```

2.  **Install dependencies (including test dependencies):**
    It's recommended to use a virtual environment.
    ```sh
    python -m venv venv
    source venv/bin/activate  # On Windows, use `venv\Scripts\activate`
    pip install -r requirements.txt
    ```

3.  **Run the tests:**
    From the `backend` directory, simply run `pytest`:
    ```sh
    pytest
    ```
    Pytest will automatically discover and run the tests in the `tests` directory.

## 2. Frontend Testing (Jest & React Testing Library)

The frontend tests are written using Jest and React Testing Library. Test files are located alongside the components in `frontend/src/components/__tests__`.

### Running Tests Locally

1.  **Navigate to the frontend directory:**
    ```sh
    cd frontend
    ```

2.  **Install dependencies:**
    ```sh
    npm install
    ```

3.  **Run the tests:**
    You can run the tests in interactive watch mode or as a single run.

    *To run in watch mode (re-runs tests on file changes):*
    ```sh
    npm test
    ```

    *To run the tests once and generate a coverage report:*
    ```sh
    npm test -- --coverage --watchAll=false
    ```

## 3. CI/CD Integration (GitHub Actions)

You can automate the execution of these tests using a CI/CD platform like GitHub Actions. Below is a sample workflow file that can be placed in `.github/workflows/ci.yml`.

This workflow triggers on pushes and pull requests to the `main` branch. It runs two separate jobs, one for the backend and one for the frontend, to test them in parallel.

```yaml
# .github/workflows/ci.yml

name: Run Tests

on:
  push:
    branches: [ main ]
  pull_request:
    branches: [ main ]

jobs:
  test-backend:
    runs-on: ubuntu-latest
    defaults:
      run:
        working-directory: ./backend

    steps:
    - name: Check out code
      uses: actions/checkout@v3

    - name: Set up Python
      uses: actions/setup-python@v4
      with:
        python-version: '3.9'

    - name: Install dependencies
      run: |
        python -m pip install --upgrade pip
        pip install -r requirements.txt

    - name: Run pytest
      run: pytest

  test-frontend:
    runs-on: ubuntu-latest
    defaults:
      run:
        working-directory: ./frontend

    steps:
    - name: Check out code
      uses: actions/checkout@v3

    - name: Set up Node.js
      uses: actions/setup-node@v3
      with:
        node-version: '18'
        cache: 'npm'
        cache-dependency-path: frontend/package-lock.json

    - name: Install dependencies
      run: npm ci

    - name: Run Jest tests
      run: npm test -- --watchAll=false
```
