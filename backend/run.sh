#!/bin/bash

# Set environment variables
export DB_PASSWORD="npg_Ngmio0kq5apF"
export JWT_SECRET="$(openssl rand -hex 32)"

# Verify environment variables are set
echo "Checking environment variables..."
if [ -z "$DB_PASSWORD" ]; then
    echo "Error: DB_PASSWORD is not set"
    exit 1
fi
if [ -z "$JWT_SECRET" ]; then
    echo "Error: JWT_SECRET is not set"
    exit 1
fi
echo "Environment variables are set"
echo "JWT_SECRET: $JWT_SECRET"

# Run database migrations
java -jar target/skillswap-backend-1.0-SNAPSHOT.jar db migrate src/main/resources/configuration.yml

# Start the application with environment variables
JAVA_OPTS="-DDB_PASSWORD=$DB_PASSWORD -DJWT_SECRET=$JWT_SECRET" java -jar target/skillswap-backend-1.0-SNAPSHOT.jar server src/main/resources/configuration.yml 