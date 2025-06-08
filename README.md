# Home Library Service

Home Library Service is a RESTful API for managing your personal music library. The service allows you to create, view, update, and delete users, artists, albums, tracks, and manage favorites. It features authentication, containerization with Docker, and OpenAPI/Swagger documentation for easy integration and exploration.

## Getting Started with Docker (Recommended)

This is the recommended way to run the application.

### Prerequisites

*   [Git](https://git-scm.com/downloads)
*   [Docker](https://www.docker.com/products/docker-desktop/) and [Docker Compose](https://docs.docker.com/compose/install/)

### 1. Clone the Repository

```bash
git clone https://github.com/natapage/nodejs2025Q2-service.git
cd nodejs2025Q2-service
git checkout hl-part-2-development
```

### 2. Create Environment File

Create a `.env` file by copying the example file. This file contains the necessary environment variables for the application and database.

```bash
cp .env.example .env
```

### 3. Build, Run, and Migrate

Use a single command to build the images, start the containers, and run the database migrations.

```bash
npm run start:docker
```

This command executes the `docker-compose up -d --build` and `npx prisma migrate dev` steps for you.

### 4.Testing

After application running open new terminal and enter:

To run all tests without authorization

```
npm run test
```

To run only one of all test suites

```
npm test -- test/users.e2e.spec.ts
npm test -- test/artists.e2e.spec.ts
npm test -- test/albums.e2e.spec.ts
npm test -- test/favorites.e2e.spec.ts
npm test -- test/tracks.e2e.spec.ts
```

### 5. Accessing the Application

*   **API Documentation (Swagger):** [http://localhost:4000/doc](http://localhost:4000/doc)
*   **Application Logs:** `docker-compose logs -f app`
*   **Database Logs:** `docker-compose logs -f postgres-db`

### 6. Stopping the Application

To stop the containers, run:
```bash
docker-compose down
```

This will stop and remove the containers.

## Local Development (Without Docker)

These instructions are for running the application directly on your machine without using Docker.

### 1. Clone and Install

```bash
git clone https://github.com/natapage/nodejs2025Q2-service.git
cd nodejs2025Q2-service
git checkout hl-part-2-development
npm install
```

### 2. Configure Environment

Create a `.env` file and update the `DATABASE_URL` to point to your local PostgreSQL instance.

```bash
cp .env.example .env
```
_For Windows, you can use `copy .env.example .env`_

**Edit `.env` and set your `DATABASE_URL`:**
`DATABASE_URL="postgresql://YOUR_USER:YOUR_PASSWORD@localhost:5432/YOUR_DATABASE?schema=public"`

### 3. Run Migrations
```bash
npx prisma migrate dev
```

### 4. Run the App

```bash
npm run start:dev
```

## Testing

After the application is running, open a new terminal and enter:

To run all tests:
```bash
npm run test
```

To run a specific test suite:
```bash
npm test -- test/users.e2e.spec.ts
```

## License

This project is licensed under the MIT License.
