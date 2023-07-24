#!/bin/bash

# Change ownership recursively of all files and directories in the nginx/templates directory
chown -R ec2-user:ec2-user ./nginx/templates

# Set appropriate permissions for files and directories in the nginx/templates directory
find ./nginx/templates -type d -exec chmod 755 {} +
find ./nginx/templates -type f -exec chmod 644 {} +

# Repeat the same for the etc/letsencrypt and certbot/data directories if necessary.

# Phase 1
docker-compose -f ./docker-compose-initiate.yaml up -d nginx
docker-compose -f ./docker-compose-initiate.yaml up certbot
docker-compose -f ./docker-compose-initiate.yaml down

# some configurations for let's encrypt
curl -L --create-dirs -o etc/letsencrypt/options-ssl-nginx.conf https://raw.githubusercontent.com/certbot/certbot/master/certbot-nginx/certbot_nginx/_internal/tls_configs/options-ssl-nginx.conf
openssl dhparam -out etc/letsencrypt/ssl-dhparams.pem 2048

# Phase 2
# crontab ./crontab

# Stop any process running on port 80
fuser -k 80/tcp

# Build and run all services
docker-compose -f ./docker-compose.yaml up --build -d



