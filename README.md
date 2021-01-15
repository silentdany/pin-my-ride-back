# API Pin My Ride

This application provides a simple API for managing users and their roadtrips in Pin My Back app !

Follow the instructions below!

## Get it and install dependencies

```sh
git clone repo
cd repo
npm install
```

## Create and edit the `.env` file

This application uses [dotenv](https://www.npmjs.com/package/dotenv), which allows to load variables from a specific file: `.env`. This is where sensitive data, such as database settings, JWT secret key, API keys, etc. are stored.

For JWT add `SECRET=`, this is a secret key, you can put what you want.

This file is **not** provided here, because it should **never** be committed! Use the example below, the quickly create your .env file.

```
# General settings
PORT=5000

# Database settings
DB_HOST=localhost
DB_USER=root
DB_PASS=YourPassword
DB_NAME=dbName
SECRET=YourSecretKey
```

## We use in his project

Includes API Server utilities:

- [morgan](https://www.npmjs.com/package/morgan)
  - HTTP request logger middleware for node.js
- [helmet](https://www.npmjs.com/package/helmet)
  - Helmet helps you secure your Express apps by setting various HTTP headers. It's not a silver bullet, but it can help!
- [dotenv](https://www.npmjs.com/package/dotenv)
  - Dotenv is a zero-dependency module that loads environment variables from a `.env` file into `process.env`
- [express-jsdoc-swagger](https://www.npmjs.com/package/express-jsdoc-swagger)
  - With this library, you can document your express endpoints using swagger OpenAPI 3 Specification without writing YAML or JSON.
- [joi](https://www.npmjs.com/package/joi)
  - The most powerful schema description language and data validator for JavaScript.
- [multer](https://www.npmjs.com/package/multer)
  - Multer is a node.js middleware for handling multipart/form-data, which is primarily used for uploading files. It is written on top of busboy for maximum efficiency.
- [jsonwebtoken](https://www.npmjs.com/package/jsonwebtoken)
  - An implementation of JSON Web Tokens.


Development utilities:

- [prisma](https://www.npmjs.com/package/@prisma/cli)
  - Prisma helps app developers build faster and make fewer errors with an open source ORM for PostgreSQL, MySQL and SQLite.
- [nodemon](https://www.npmjs.com/package/nodemon)
  - nodemon is a tool that helps develop node.js based applications by automatically restarting the node application when file changes in the directory are detected.
- [eslint](https://www.npmjs.com/package/eslint)
  - ESLint is a tool for identifying and reporting on patterns found in ECMAScript/JavaScript code.
- [jest](https://www.npmjs.com/package/jest)
  - Complete and ready to set-up JavaScript testing solution. Works out of the box for any React project.
- [supertest](https://www.npmjs.com/package/supertest)
  - HTTP assertions made easy via superagent.
  
  
Scripts:

- Start Dev server
```npm run dev```
- Start tests
```npm run test```

- Generate Prisma schema
```npm run generate```
- Migrate Prisma schema to update database
```npm run migrate:dev```
- Reset your database and add seeds (dev/test)
```npm run seed:dev / npm run seed:test```

