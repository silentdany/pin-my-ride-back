require('dotenv').config();
const util = require('util');
const exec = util.promisify(require('child_process').exec);

(async () => {
  if (process.env.NODE_ENV === 'test') {
    if (!process.env.DATABASE_TEST_URL) {
      throw new Error(
        'You should first set your DATABASE_TEST_URL env variable !'
      );
    }

    process.env.DATABASE_URL = process.env.DATABASE_TEST_URL;
  }
  await exec('npx prisma migrate dev --preview-feature');
})();
