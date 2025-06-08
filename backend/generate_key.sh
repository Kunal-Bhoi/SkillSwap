#!/bin/bash

# Generate a secure 32-byte (256-bit) key and encode it in base64
JWT_SECRET=$(openssl rand -base64 32)

# Update the .env file
echo "DB_URL=jdbc:postgresql://ep-shiny-mud-a86r2nw6-pooler.eastus2.azure.neon.tech/neondb?sslmode=require" > .env
echo "DB_USER=neondb_owner" >> .env
echo "DB_PASSWORD=npg_Ngmio0kq5apF" >> .env
echo "JWT_SECRET=$JWT_SECRET" >> .env

echo "Generated new JWT secret and updated .env file" 