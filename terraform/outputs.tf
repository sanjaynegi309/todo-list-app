output "backend_service_url" {
  description = "The URL of the deployed backend service."
  value       = google_cloud_run_v2_service.backend.uri
}

output "frontend_service_url" {
  description = "The URL of the deployed frontend service."
  value       = google_cloud_run_v2_service.frontend.uri
}
