const express = require('express');
const { valRide } = require('../joiSchemas');
const { joiValidation } = require('../middlewares');
const prisma = require('../prismaClient');

const router = express.Router();

/**
 * A ride (with id for output display)
 * @typedef {object} DisplayRide
 * @property {number} id.required - ID
 * @property {string} label - Name of the ride
 * @property {string} summary - Summary
 * @property {string} start_date - Start of ride
 * @property {string} end_date - End of ride
 * @property {object} start_coord - Start coordinates
 * @property {number} id_user - User id of the ride
 */

/**
 * A ride
 * @typedef {object} Ride
 * @property {string} label - Name of the ride
 * @property {string} summary - Summary
 * @property {string} start_date - Start of ride
 * @property {string} end_date - End of ride
 * @property {object} start_coord - Start coordinates
 * @property {number} id_user - User id of the ride

 */

/**
 * GET /api/v0/rides
 * @summary View all rides
 * @tags rides
 * @return {array<DisplayRide>} 200 - Ride list successfully retrieved
 * @return {object} 400 - Bad request
 */
router.get('/', (req, res, next) => {
  const { label } = req.query;
  prisma.ride
    .findMany({
      where: {
        label,
      },
    })
    .then((rides) => {
      res.status(200).json(rides);
    })
    .catch((err) => {
      res.sendStatus(400);
      next(err);
    });
});

/**
 * GET /api/v0/rides/{id}
 * @summary View ride by id
 * @tags rides
 * @param {number} id.path - id of wanted ride
 * @return {array<DisplayRide>} 200 - Ride successfully retrieved
 * @return {object} 404 - Ride not found
 */
router.get('/:id', (req, res, next) => {
  const { id } = req.params;

  prisma.ride
    .findUnique({
      where: {
        id: parseInt(id, 10),
      },
    })
    .then((ride) => {
      if (ride !== null) {
        res.status(200).json(ride);
      }
      next();
    })
    .catch((err) => {
      res.sendStatus(404);
      next(err);
    });
});

/**
 * POST /api/v0/rides
 * @summary Create a ride
 * @tags rides
 * @param {Ride} request.body.required - Ride info
 * @return {array<DisplayRide>} 201 - Ride successfully created
 * @return {object} 422 - Bad data entries
 */
router.post('/', joiValidation(valRide), (req, res, next) => {
  const data = req.body;

  prisma.ride
    .create({
      data: { ...data },
    })
    .then((ride) => {
      res.status(201).json(ride);
    })
    .catch((err) => {
      res.sendStatus(422);
      next(err);
    });
});

/**
 * DELETE /api/v0/rides/{id}
 * @summary Delete a ride
 * @tags rides
 * @param {number} id.path - id of wanted ride
 * @return {object} 204 - Ride successfully deleted
 * @return {object} 404 - Ride not found
 */
router.delete('/:id', (req, res, next) => {
  const { id } = req.params;

  prisma.ride
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
 * PUT /api/v0/rides/{id}
 * @summary Update a ride
 * @tags rides
 * @param {number} id.path - id of wanted ride
 * @param {Ride} request.body.required - ride info
 * @return {array<DisplayRide>} 200 - Ride successfully updated
 * @return {object} 404 - Ride not found
 * @return {object} 422 - Bad data entries
 */
router.put('/:id', joiValidation(valRide), (req, res, next) => {
  const { id } = req.params;
  const data = req.body;

  prisma.ride
    .update({
      where: {
        id: parseInt(id, 10),
      },
      data: { ...data },
    })
    .then((updatedRide) => {
      res.status(200).json(updatedRide);
    })
    .catch((err) => {
      res.sendStatus(404);
      next(err);
    });
});

module.exports = router;
