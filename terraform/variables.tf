variable "gcp_project_id" {
  description = "The GCP project ID to deploy to."
  type        = string
}

variable "gcp_region" {
  description = "The GCP region to deploy to."
  type        = string
  default     = "us-central1"
}

variable "backend_image" {
  description = "The Docker image for the backend service."
  type        = string
}

variable "frontend_image" {
  description = "The Docker image for the frontend service."
  type        = string
}

variable "backend_service_name" {
  description = "The name of the backend Cloud Run service."
  type        = string
  default     = "todo-app-backend"
}

variable "frontend_service_name" {
  description = "The name of the frontend Cloud Run service."
  type        = string
  default     = "todo-app-frontend"
}
