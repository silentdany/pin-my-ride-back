/* eslint-disable no-console */
require('dotenv').config();
const util = require('util');
const exec = util.promisify(require('child_process').exec);

(async () => {
  if (!process.env.DATABASE_URL) {
    throw new Error('Please set your DATABASE_URL env variable !');
  }
  await exec('npx prisma migrate dev --preview-feature');
  await exec('npx prisma generate');
  await exec('npm run seed:dev');

  console.log('Done !');
  console.log("You can now start your dev server with 'npm run dev'");
})();
