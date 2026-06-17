#!/bin/bash
set -e

docker info > /dev/null 2>&1 || { echo "Error: Docker is not running."; exit 1; }

echo "Building and starting containers..."
docker compose up --build -d

echo "Waiting for database to be ready..."
sleep 5

echo "Optimizing Laravel application..."
docker exec autp_app php artisan config:cache || true
docker exec autp_app php artisan route:cache || true
docker exec autp_app php artisan view:cache || true

echo "Running migrations..."
docker exec autp_app php artisan migrate --force || echo "Migrations skipped (may already be applied)"

echo "Backend ready at http://localhost:8000"
