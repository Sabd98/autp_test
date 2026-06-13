#!/bin/bash
set -e

docker info > /dev/null 2>&1 || { echo "Error: Docker is not running."; exit 1; }
docker ps --format '{{.Names}}' | grep -q autp_nginx && { echo "Containers already running. Stop them first: docker-compose down"; exit 1; }

echo "Building and starting containers..."
docker-compose up --build

echo "Clearing Laravel caches..."
docker exec autp_app php artisan cache:clear
docker exec autp_app php artisan config:cache
docker exec autp_app php artisan route:cache

echo "✓ Build complete! Backend ready at http://localhost:8000"
