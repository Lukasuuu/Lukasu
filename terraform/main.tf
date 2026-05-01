terraform {
  required_providers {
    vercel = {
      source  = "vercel/vercel"
      version = "~> 0.15"
    }
  }
}

# Vercel Project
resource "vercel_project" "bookme_web" {
  name      = "bookme-web"
  framework = "vite"

  git_repository = {
    type = "github"
    repo = "Lukasuuu/Lukasuuu"
  }
}

# Vercel Environment Variables
resource "vercel_project_environment_variable" "supabase_url" {
  project_id = vercel_project.bookme_web.id
  key        = "VITE_SUPABASE_URL"
  value      = var.supabase_url
  target     = ["production", "preview"]
}

resource "vercel_project_environment_variable" "stripe_pk" {
  project_id = vercel_project.bookme_web.id
  key        = "VITE_STRIPE_PUBLISHABLE_KEY"
  value      = var.stripe_publishable_key
  target     = ["production", "preview"]
}
