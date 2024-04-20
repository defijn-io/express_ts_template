#!/bin/bash

set -e

echo "Starting setup..."

echo "Scaffolding base directories..."
mkdir -p src/controllers src/routes src/services src/middleware src/config
touch src/controllers/index.ts src/routes/index.ts src/services/index.ts src/middleware/index.ts src/config/index.ts

# Ask the user if they want to add a database
read -p "Do you want to add a database? (yes/no): " add_database

if [ "$add_database" == "yes" ]; then
  # Ask the user if they will use Prisma or Drizzle ORM
  read -p "Will you use Prisma or Drizzle ORM? (prisma/drizzle): " orm_choice

  # Check if docker-compose.yaml exists and contains "postgres"
  if [ -f "docker-compose.yaml" ] || [ -f "docker-compose.yml" ]; then
    if grep -q "postgres" "docker-compose.yaml" || grep -q "postgres" "docker-compose.yml"; then
      echo "Docker Compose file with Postgres found."
    else
      echo "Docker Compose file found, but it does not contain Postgres. Creating a new Docker Compose file..."
      # Ask the user for the project name
      read -p "Enter the project name: " project

      # Docker Compose template with placeholder for project name
      compose_content="version: \"3.8\"
services:
    ${project}-db:
        image: postgres
        restart: always
        environment:
            POSTGRES_USER: johndoe
            POSTGRES_PASSWORD: randompassword
            POSTGRES_DB: ${project}-postgres # Define the database name to be created automatically
        ports:
            - \"5432:5432\"
        volumes:
            - ${project}-postgres-data:/var/lib/postgresql/data

volumes:
    ${project}-postgres-data:
"

      # Write the Docker Compose configuration to a file
      echo "$compose_content" > docker-compose.yml

      echo "Docker Compose file created successfully."
    fi
  else
    echo "No Docker Compose file found. Creating a new Docker Compose file..."
    # Ask the user for the project name
    read -p "Enter the project name: " project

    # Docker Compose template with placeholder for project name
    compose_content="version: \"3.8\"
services:
    ${project}-db:
        image: postgres
        restart: always
        environment:
            POSTGRES_USER: johndoe
            POSTGRES_PASSWORD: randompassword
            POSTGRES_DB: ${project}-postgres # Define the database name to be created automatically
        ports:
            - \"5432:5432\"
        volumes:
            - ${project}-postgres-data:/var/lib/postgresql/data

volumes:
    ${project}-postgres-data:
"

    # Write the Docker Compose configuration to a file
    echo "$compose_content" > docker-compose.yml

    echo "Docker Compose file created successfully."
  fi

  # Handle Prisma setup
  if [ "$orm_choice" == "prisma" ]; then
    echo "Setting up Prisma..."
    yarn add prisma typescript ts-node @types/node --save-dev
    npx prisma init

    echo "Prisma setup complete. Please update the DATABASE_URL in the .env file to match your database connection string."

  # Handle Drizzle ORM setup  
  elif [ "$orm_choice" == "drizzle" ]; then
    echo "Setting up Drizzle ORM..."
    yarn add drizzle-orm pg
    yarn add -D drizzle-kit @types/pg
    
    mkdir -p database
    cd database
    
    # Create database.ts
    cat > database.ts <<EOL
import { pgTable, serial, text, varchar } from "drizzle-orm/pg-core";
import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";
const pool = new Pool({
  connectionString: "postgresql://johndoe:randompassword@localhost:5432/${project}-postgres",
});

const db = drizzle(pool);
export {db};
EOL

    # Create schema.ts
    touch schema.ts
    
    echo "Drizzle ORM setup complete. Please update the database connection string in the database/database.ts file if needed."
    cd ..
  else
    echo "Invalid choice. Skipping database setup."
  fi
fi

# Ask the user if they need authentication
read -p "Do you need authentication? (yes/no): " need_auth

if [ "$need_auth" == "yes" ]; then
  echo "Creating auth..."
  # TODO: Update authentication setup
  echo "Authentication setup complete."
fi

echo "Setup completed successfully."
echo "To start the project, run: yarn dev"
