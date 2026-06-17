#!/bin/bash
set -e

docker info > /dev/null 2>&1 || { echo "Error: Docker is not running."; exit 1; }
API_URL=${NEXT_PUBLIC_API_URL:-http://localhost:8000}

echo "Building with API URL: $API_URL"
docker build --build-arg NEXT_PUBLIC_API_URL="$API_URL" -t autp-fe .

docker rm -f autp-fe 2>/dev/null || true

echo "Starting container..."
docker run -d --name autp-fe -p 3000:3000 autp-fe

echo "Frontend ready at http://localhost:3000"
