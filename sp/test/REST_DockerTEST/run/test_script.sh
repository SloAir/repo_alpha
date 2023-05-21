#!/bin/sh

# Build and start the services using Docker Compose
docker-compose stop
docker-compose build --pull
docker-compose up -d
