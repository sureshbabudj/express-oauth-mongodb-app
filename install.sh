#!/bin/bash

# Check if script is run with administrative privileges
if [[ $EUID -ne 0 ]]; then
  echo "This script must be run with administrative privileges."
  exit 1
fi

# Get the current user's username
username=$(whoami)

# Change the ownership of the folder recursively
folder_path=$(dirname "$(realpath "$0")")
chown -R $username:$username $folder_path

# Change the ownership of the /etc folder
chown -R $username:$username /etc

# Grant necessary permissions to the /etc folder
chmod -R 755 /etc

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



