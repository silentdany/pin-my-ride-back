# API Pin My Ride

This application provides a simple API for the dashboad used by Follow the market.

Follow the instructions below!

## Get it and install dependencies

```sh
git clone repo
cd repo
npm install
```

## Create and edit the `.env` file

This application uses [dotenv](https://www.npmjs.com/package/dotenv), which allows to load variables from a specific file: `.env`. This is where sensitive data, such as database settings, JWT secret key, API keys, etc. are stored.

This file is **not** provided here, because it should **never** be committed! Use the example below, the quickly create your .env file.

```
# General settings
PORT=5000

# Database settings
DB_HOST=localhost
DB_USER=root
DB_PASS=YourPassword
DB_NAME=dbName
```

Second, **edit** `.env`. **You only have to replace the value behind `DB_USER=`**, `DB_PASS=`\*\* with your own root password.

## We use in his project

Includes API Server utilities:

- [morgan](https://www.npmjs.com/package/morgan)
  - HTTP request logger middleware for node.js
- [helmet](https://www.npmjs.com/package/helmet)
  - Helmet helps you secure your Express apps by setting various HTTP headers. It's not a silver bullet, but it can help!
- [dotenv](https://www.npmjs.com/package/dotenv)
  - Dotenv is a zero-dependency module that loads environment variables from a `.env` file into `process.env`

Development utilities:

- [nodemon](https://www.npmjs.com/package/nodemon)
  - nodemon is a tool that helps develop node.js based applications by automatically restarting the node application when file changes in the directory are detected.
- [eslint](https://www.npmjs.com/package/eslint)
  - ESLint is a tool for identifying and reporting on patterns found in ECMAScript/JavaScript code.
- [mocha](https://www.npmjs.com/package/mocha)
  - ☕️ Simple, flexible, fun JavaScript test framework for Node.js & The Browser ☕️
- [supertest](https://www.npmjs.com/package/supertest)
  - HTTP assertions made easy via superagent.
