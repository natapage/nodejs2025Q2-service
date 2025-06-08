# Home Library Service

Home Library Service is a RESTful API for managing your personal music library. The service allows you to create, view, update, and delete users, artists, albums, tracks, and manage favorites. It features authentication, containerization with Docker, and OpenAPI/Swagger documentation for easy integration and exploration.

## Getting Started with Docker

This section provides two ways to run the application using Docker.

### Option 1: Build and Run Locally (for development)

This is the recommended way if you are developing the application. It will build the Docker image from your local source code.

#### 1. Clone the Repository

```bash
git clone https://github.com/natapage/nodejs2025Q2-service.git
cd nodejs2025Q2-service
git checkout hl-part-2-development
```

#### 2. Install Dependencies
```bash
npm install
```

#### 3. Create Environment File

Create a `.env` file by copying the example file. This file contains the necessary environment variables for the application and database.

```bash
cp .env.example .env
```

#### 4. Build and Run the Containers
Use a single command to build the image and start the containers.

```bash
npm run start:docker
```

### Option 2: Run from Pre-built Docker Hub Image (for checking)

This option will download the pre-built image from Docker Hub and run it. It does not require building anything locally.

#### 1. Clone the Repository

```bash
git clone https://github.com/natapage/nodejs2025Q2-service.git
cd nodejs2025Q2-service
git checkout hl-part-2-development
```

#### 2. Create Environment File

Create a `.env` file by copying the example file.

```bash
cp .env.example .env
```

#### 3. Run the Application

This command will download the pre-built image from Docker Hub and start the containers.

```bash
npm run start:docker:prod
```

### Accessing the Application

*   **API Documentation (Swagger):** [http://localhost:4000/doc](http://localhost:4000/doc)
*   **Application Logs:** `docker-compose logs -f app` or `docker-compose -f docker-compose.prod.yml logs -f app`
*   **Database Logs:** `docker-compose logs -f postgres-db` or `docker-compose -f docker-compose.prod.yml logs -f postgres-db`


### Stopping the Application

To stop the containers, run the corresponding `down` command depending on how you started them:
```bash
# For Option 1
docker-compose down

# For Option 2
docker-compose -f docker-compose.prod.yml down
```


## Local Development (Without Docker)

These instructions are for running the application directly on your machine without using Docker.

### 1. Clone and Install

```bash
git clone https://github.com/natapage/nodejs2025Q2-service.git
cd nodejs2025Q2-service
git checkout hl-part-2-development
```

After switching the branch, install the project dependencies:
```bash
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
npm test -- test/artists.e2e.spec.ts
npm test -- test/albums.e2e.spec.ts
npm test -- test/favorites.e2e.spec.ts
npm test -- test/tracks.e2e.spec.ts
```

## License

This project is licensed under the MIT License.
