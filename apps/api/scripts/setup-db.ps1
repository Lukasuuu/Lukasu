# Setup script for BookMe PostgreSQL database (Windows PowerShell)
# Requires: PostgreSQL running locally or Docker

$DB_NAME = "bookme"
$DB_USER = "bookme"
$DB_PASS = "bookme"
$DB_PORT = "5432"

Write-Host "[SetupDB] BookMe Database Setup" -ForegroundColor Cyan
Write-Host "================================" -ForegroundColor Cyan

# Check if psql is available
$psqlPath = Get-Command psql -ErrorAction SilentlyContinue
if (-not $psqlPath) {
    Write-Host "[SetupDB] PostgreSQL client (psql) not found in PATH" -ForegroundColor Red
    Write-Host "[SetupDB] Please install PostgreSQL or use Docker:" -ForegroundColor Yellow
    Write-Host "  Docker: docker run --name bookme-db -e POSTGRES_PASSWORD=$DB_PASS -e POSTGRES_USER=$DB_USER -e POSTGRES_DB=$DB_NAME -p ${DB_PORT}:5432 -d postgres:16"
    exit 1
}

# Create .env if not exists
if (-not (Test-Path .env)) {
    Write-Host "[SetupDB] Creating .env file..." -ForegroundColor Green
    $jwtSecret = -join ((1..32) | ForEach-Object { '{0:X2}' -f (Get-Random -Max 256) })
    @"
DATABASE_URL="postgresql://$DB_USER:$DB_PASS@localhost:$DB_PORT/$DB_NAME?schema=public"
JWT_SECRET="$jwtSecret"
PORT=4000
CORS_ORIGIN="*"
STRIPE_SECRET_KEY="sk_test_..."
REDIS_URL="redis://localhost:6379"
"@ | Set-Content .env -Encoding UTF8
    Write-Host "[SetupDB] .env created. Please update with your actual API keys." -ForegroundColor Yellow
}

# Test connection
Write-Host "[SetupDB] Testing PostgreSQL connection..." -ForegroundColor Green
try {
    $env:PGPASSWORD = $DB_PASS
    psql -h localhost -p $DB_PORT -U postgres -c "SELECT 1;" 2>$null
    Write-Host "[SetupDB] PostgreSQL connection OK" -ForegroundColor Green
} catch {
    Write-Host "[SetupDB] Cannot connect to PostgreSQL. Is it running?" -ForegroundColor Red
    Write-Host "[SetupDB] Start PostgreSQL service or use Docker."
    exit 1
}

# Create database and user
Write-Host "[SetupDB] Creating database and user..." -ForegroundColor Green
psql -h localhost -p $DB_PORT -U postgres -c "CREATE USER $DB_USER WITH PASSWORD '$DB_PASS';" 2>$null
psql -h localhost -p $DB_PORT -U postgres -c "CREATE DATABASE $DB_NAME OWNER $DB_USER;" 2>$null
psql -h localhost -p $DB_PORT -U postgres -c "GRANT ALL PRIVILEGES ON DATABASE $DB_NAME TO $DB_USER;" 2>$null

# Run Prisma migrations
Write-Host "[SetupDB] Running Prisma migrations..." -ForegroundColor Green
npx prisma migrate dev --name init

# Generate Prisma Client
Write-Host "[SetupDB] Generating Prisma Client..." -ForegroundColor Green
npx prisma generate

Write-Host "[SetupDB] Done! Database is ready." -ForegroundColor Green
Write-Host "[SetupDB] You can now run: pnpm --filter @bookme/api start:dev" -ForegroundColor Cyan
