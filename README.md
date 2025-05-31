# Home Library Service

Home Library Service is a RESTful API for managing your personal music library. The service allows you to create, view, update, and delete users, artists, albums, tracks, and manage favorites. It features authentication, automated testing, and OpenAPI/Swagger documentation for easy integration and exploration.

## Prerequisites

- Git - [Download & Install Git](https://git-scm.com/downloads).
- Node.js - [Download & Install Node.js](https://nodejs.org/en/download/) and the npm package manager.

## Downloading

```
git clone https://github.com/natapage/nodejs2025Q2-service.git
```

## Installing NPM modules

```
npm install
```

## Running application

Before starting rename `.env.example` file to `.env` and set the port in the `.env` file (default is 4000):

```
npm start
```

After starting the app on port (4000 as default) you can open
in your browser OpenAPI documentation by typing http://localhost:4000/doc/.
For more information about OpenAPI/Swagger please visit https://swagger.io/.

## Testing

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

> Authorization for these tests is not implemented yet, so you do not need to check or run them.
To run all test with authorization

```
npm run test:auth
```

To run only specific test suite with authorization

```
npm run test:auth -- <path to suite>
```

### Auto-fix and format

```
npm run lint
```

```
npm run format
```

### Debugging in VSCode

Press <kbd>F5</kbd> to debug.

For more information, visit: https://code.visualstudio.com/docs/editor/debugging
