terraform {
  required_providers {
    google = {
      source  = "hashicorp/google"
      version = ">= 4.0.0"
    }
  }
}

provider "google" {
  project = var.gcp_project_id
  region  = var.gcp_region
}

# Enable necessary APIs for the project
resource "google_project_service" "run_api" {
  service = "run.googleapis.com"
}

resource "google_project_service" "gcr_api" {
  service = "containerregistry.googleapis.com"
}

resource "google_project_service" "iam_api" {
  service = "iam.googleapis.com"
}

# Backend Cloud Run Service
resource "google_cloud_run_v2_service" "backend" {
  name     = var.backend_service_name
  location = var.gcp_region

  template {
    containers {
      image = var.backend_image
      ports {
        container_port = 8000
      }
    }
  }

  depends_on = [google_project_service.run_api]
}

# Frontend Cloud Run Service
resource "google_cloud_run_v2_service" "frontend" {
  name     = var.frontend_service_name
  location = var.gcp_region

  template {
    containers {
      image = var.frontend_image
      ports {
        container_port = 80
      }
    }
  }

  depends_on = [google_project_service.run_api]
}

# Allow unauthenticated access to the frontend service
resource "google_cloud_run_service_iam_member" "frontend_public_access" {
  location = google_cloud_run_v2_service.frontend.location
  service  = google_cloud_run_v2_service.frontend.name
  role     = "roles/run.invoker"
  member   = "allUsers"
}
