variable "supabase_url" {
  description = "Supabase Project URL"
  type        = string
  sensitive   = true
}

variable "stripe_publishable_key" {
  description = "Stripe Publishable Key"
  type        = string
  sensitive   = true
}

variable "vercel_token" {
  description = "Vercel API Token"
  type        = string
  sensitive   = true
}
