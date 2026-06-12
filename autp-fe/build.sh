#!/bin/bash
set -e

docker info > /dev/null 2>&1 || { echo "Error: Docker is not running."; exit 1; }
docker ps --format '{{.Ports}}' | grep -q ':3000->' && { echo "Port 3000 already in use by a container."; exit 1; }

docker build -t autp-fe .
docker run --rm -p 3000:3000 autp-fe
