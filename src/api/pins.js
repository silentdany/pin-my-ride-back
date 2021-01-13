/* eslint-disable camelcase */
const express = require('express');
const { valUser } = require('../joiSchemas');
const { joiValidation } = require('../middlewares');
const prisma = require('../prismaClient');

const router = express.Router();

/**
 * A user (with id for output display)
 * @typedef {object} DisplayUser
 * @property {number} id.required - ID
 * @property {string} firstname - Firstname
 * @property {string} lastname - Lastname
 * @property {string} email - Email
 * @property {string} password - Password
 * @property {object} ride - Rides
 */

/**
 * A user
 * @typedef {object} User
 * @property {string} firstname - Firstname
 * @property {string} lastname - Lastname
 * @property {string} email - Email
 * @property {string} password - Password 
 * @property {object} ride - Rides

 */

/**
 * GET /api/v0/users
 * @summary View all users
 * @tags users
 * @return {array<DisplayUser>} 200 - User list successfully retrieved
 * @return {object} 400 - Bad request
 */
router.get('/', (req, res, next) => {
  const { name } = req.query;
  prisma.user
    .findMany({
      where: {
        firstName: name,
      },
    })
    .then((users) => {
      res.status(200).json(users);
    })
    .catch((err) => {
      res.sendStatus(400);
      next(err);
    });
});

/**
 * GET /api/v0/users/{id}
 * @summary View user by id
 * @tags users
 * @param {number} id.path - id of wanted user
 * @return {array<DisplayUser>} 200 - User successfully retrieved
 * @return {object} 404 - User not found
 */
router.get('/:id', (req, res, next) => {
  const { id } = req.params;

  prisma.user
    .findUnique({
      where: {
        id: parseInt(id, 10),
      },
    })
    .then((user) => {
      if (user !== null) {
        res.status(200).json(user);
      }
      next();
    })
    .catch((err) => {
      res.sendStatus(404);
      next(err);
    });
});

/**
 * POST /api/v0/users
 * @summary Create a user
 * @tags users
 * @param {User} request.body.required - User info
 * @return {array<DisplayUser>} 201 - User successfully created
 * @return {object} 422 - Bad data entries
 */
router.post('/', joiValidation(valUser), (req, res, next) => {
  const data = req.body;

  prisma.user
    .create({
      data: { ...data },
    })
    .then((user) => {
      res.status(201).json(user);
    })
    .catch((err) => {
      res.sendStatus(422);
      next(err);
    });
});

/**
 * DELETE /api/v0/users/{id}
 * @summary Delete a user
 * @tags users
 * @param {number} id.path - id of wanted user
 * @return {object} 204 - User successfully deleted
 * @return {object} 404 - User not found
 */
router.delete('/:id', (req, res, next) => {
  const { id } = req.params;

  prisma.user
    .delete({
      where: {
        id: parseInt(id, 10),
      },
    })
    .then(() => {
      res.sendStatus(204);
    })
    .catch((err) => {
      res.sendStatus(404);
      next(err);
    });
});

/**
 * PUT /api/v0/users/{id}
 * @summary Update a user
 * @tags users
 * @param {number} id.path - id of wanted user
 * @param {User} request.body.required - User info
 * @return {array<DisplayUser>} 200 - User successfully updated
 * @return {object} 404 - User not found
 * @return {object} 422 - Bad data entries
 */
router.put('/:id', joiValidation(valUser), (req, res, next) => {
  const { id } = req.params;
  const data = req.body;

  prisma.user
    .update({
      where: {
        id: parseInt(id, 10),
      },
      data: { ...data },
    })
    .then((updatedUser) => {
      res.status(200).json(updatedUser);
    })
    .catch((err) => {
      res.sendStatus(404);
      next(err);
    });
});

module.exports = router;
