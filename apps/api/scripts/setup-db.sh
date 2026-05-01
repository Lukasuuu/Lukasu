#!/bin/bash
# Setup script for BookMe PostgreSQL database
# Requires: PostgreSQL running locally or Docker

set -e

DB_NAME="bookme"
DB_USER="bookme"
DB_PASS="bookme"
DB_PORT="5432"

echo "[SetupDB] BookMe Database Setup"
echo "================================"

# Check if PostgreSQL is running
if command -v pg_isready &> /dev/null; then
  if ! pg_isready -q -p $DB_PORT; then
    echo "[SetupDB] PostgreSQL is not running on port $DB_PORT"
    echo "[SetupDB] Please start PostgreSQL first:"
    echo "  - Windows: Start PostgreSQL service via Services panel"
    echo "  - macOS: brew services start postgresql"
    echo "  - Linux: sudo systemctl start postgresql"
    echo "  - Docker: docker run --name bookme-db -e POSTGRES_PASSWORD=$DB_PASS -e POSTGRES_USER=$DB_USER -e POSTGRES_DB=$DB_NAME -p $DB_PORT:5432 -d postgres:16"
    exit 1
  fi
else
  echo "[SetupDB] pg_isready not found. Assuming PostgreSQL is available..."
fi

# Create .env if not exists
if [ ! -f .env ]; then
  echo "[SetupDB] Creating .env file..."
  cat > .env << EOF
DATABASE_URL="postgresql://$DB_USER:$DB_PASS@localhost:$DB_PORT/$DB_NAME?schema=public"
JWT_SECRET="$(openssl rand -hex 32)"
PORT=4000
CORS_ORIGIN="*"
STRIPE_SECRET_KEY="sk_test_..."
REDIS_URL="redis://localhost:6379"
EOF
  echo "[SetupDB] .env created. Please update with your actual API keys."
fi

# Create database and user
echo "[SetupDB] Creating database and user..."
PGPASSWORD=$DB_PASS psql -h localhost -p $DB_PORT -U postgres -c "CREATE USER $DB_USER WITH PASSWORD '$DB_PASS';" 2>/dev/null || true
PGPASSWORD=$DB_PASS psql -h localhost -p $DB_PORT -U postgres -c "CREATE DATABASE $DB_NAME OWNER $DB_USER;" 2>/dev/null || true
PGPASSWORD=$DB_PASS psql -h localhost -p $DB_PORT -U postgres -c "GRANT ALL PRIVILEGES ON DATABASE $DB_NAME TO $DB_USER;" 2>/dev/null || true

# Run Prisma migrations
echo "[SetupDB] Running Prisma migrations..."
npx prisma migrate dev --name init

# Generate Prisma Client
echo "[SetupDB] Generating Prisma Client..."
npx prisma generate

echo "[SetupDB] Done! Database is ready."
echo "[SetupDB] You can now run: pnpm --filter @bookme/api start:dev"
