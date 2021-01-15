const jwt = require('jsonwebtoken');
const express = require('express');
const prisma = require('../prismaClient');

const router = express.Router();

/**
 * Auth
 * @typedef {object} Auth
 * @property {string} email - Email
 * @property {string} password - Password
 */

/**
 * POST /api/v0/login
 * @summary This route check user
 * @tags auth
 * @param {Auth} request.body.required - Enter user data (example: email: "contact@email.com", password : "myPassword")
 * @return {array<Auth>} 200 - Succesfully check user
 * @return {object} 404 - User not found
 * @return {object} 401 - Invalid password
 */

router.post('/', async (req, res, next) => {
  const { email, password } = req.body;

  try {
    // check if this user exists in database
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (!user) {
      res.status(404);
      throw new Error('User does not exists');
    }

    // if yes, continue by comparing both password

    if (password !== user.password) {
      res.status(401);
      throw new Error('Invalid password');
    }

    // if it is valid, then continue by signing a new token
    const token = jwt.sign(
      {
        email: user.email,
      },
      process.env.SECRET,
      {
        expiresIn: '2h',
      }
    );

    res.status(200).json({
      token,
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
