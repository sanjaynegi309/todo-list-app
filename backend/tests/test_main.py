import pytest
from fastapi.testclient import TestClient

# The client fixture is defined in conftest.py and is available automatically
# thanks to pytest's magic.

def test_create_task(client: TestClient):
    """
    Test creating a new task.
    """
    response = client.post("/api/v1/tasks/", json={"title": "Test Task", "is_completed": False})
    assert response.status_code == 201
    data = response.json()
    assert data["title"] == "Test Task"
    assert data["is_completed"] is False
    assert "id" in data

def test_read_tasks(client: TestClient):
    """
    Test reading all tasks.
    """
    # Create a couple of tasks first
    client.post("/api/v1/tasks/", json={"title": "Task 1"})
    client.post("/api/v1/tasks/", json={"title": "Task 2"})

    response = client.get("/api/v1/tasks/")
    assert response.status_code == 200
    data = response.json()
    assert len(data) == 2
    assert data[0]["title"] == "Task 1"
    assert data[1]["title"] == "Task 2"

def test_read_single_task(client: TestClient):
    """
    Test reading a single task by its ID.
    """
    response = client.post("/api/v1/tasks/", json={"title": "A Specific Task"})
    task_id = response.json()["id"]

    response = client.get(f"/api/v1/tasks/{task_id}")
    assert response.status_code == 200
    data = response.json()
    assert data["title"] == "A Specific Task"
    assert data["id"] == task_id

def test_read_nonexistent_task(client: TestClient):
    """
    Test reading a task that does not exist.
    """
    response = client.get("/api/v1/tasks/999")
    assert response.status_code == 404
    assert response.json() == {"detail": "Task not found"}

def test_update_task(client: TestClient):
    """
    Test updating an existing task.
    """
    response = client.post("/api/v1/tasks/", json={"title": "Original Title"})
    task_id = response.json()["id"]

    update_data = {"title": "Updated Title", "is_completed": True}
    response = client.put(f"/api/v1/tasks/{task_id}", json=update_data)
    assert response.status_code == 200
    data = response.json()
    assert data["title"] == "Updated Title"
    assert data["is_completed"] is True

def test_delete_task(client: TestClient):
    """
    Test deleting a task.
    """
    response = client.post("/api/v1/tasks/", json={"title": "Task to be deleted"})
    task_id = response.json()["id"]

    # Delete the task
    response = client.delete(f"/api/v1/tasks/{task_id}")
    assert response.status_code == 204

    # Verify it's gone
    response = client.get(f"/api/v1/tasks/{task_id}")
    assert response.status_code == 404
