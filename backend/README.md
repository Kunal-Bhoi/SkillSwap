# SkillSwap Backend

This is the backend service for the SkillSwap application, built with Dropwizard and PostgreSQL (NeonDB).

## Prerequisites

- Java 17 or higher
- Maven 3.6 or higher
- PostgreSQL (NeonDB)

## Configuration

1. Create a `.env` file in the root directory with the following variables:
   ```
   DB_PASSWORD=your_neondb_password
   JWT_SECRET=your_jwt_secret_key
   ```

2. The application uses the following configuration by default:
   - Server port: 8080
   - Admin port: 8081
   - Database URL: `postgresql://neondb_owner:${DB_PASSWORD}@ep-shiny-mud-a86r2nw6-pooler.eastus2.azure.neon.tech/neondb?sslmode=require`

## Building and Running

1. Build the application:
   ```bash
   mvn clean package
   ```

2. Run the application:
   ```bash
   java -jar target/skillswap-backend-1.0-SNAPSHOT.jar server src/main/resources/configuration.yml
   ```

## API Endpoints

### Authentication

- `POST /api/auth/signup`
  - Request body:
    ```json
    {
      "email": "user@example.com",
      "password": "password123",
      "firstName": "John",
      "lastName": "Doe"
    }
    ```

- `POST /api/auth/login`
  - Request body:
    ```json
    {
      "email": "user@example.com",
      "password": "password123"
    }
    ```

- `POST /api/auth/logout`
  - Requires Authorization header with Bearer token

### Protected Routes

All protected routes require the `Authorization` header with a Bearer token:
```
Authorization: Bearer <jwt_token>
```

## Security

- Passwords are hashed using BCrypt
- JWT tokens are used for authentication
- All sensitive data is stored securely in environment variables
- HTTPS is recommended for production deployment

## Development

1. The application uses JDBI for database access
2. JWT is used for authentication
3. Dropwizard provides the web framework and configuration management

## Testing

Run the tests using Maven:
```bash
mvn test
``` 