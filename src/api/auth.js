const jwt = require('jsonwebtoken');
const express = require('express');
const prisma = require('../prismaClient');

const router = express.Router();

/**
 * POST /api/v0/login
 * @summary This route check user
 * @tags auth
 * @param {auth} request.body.required - Enter user data (example: email: "contact@email.com", password : "myPassword")
 * @return {object} 201 - Succesfully check user
 * @return {object} 404 - Not found
 * @return {object} 500 - Internal Server Error
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
