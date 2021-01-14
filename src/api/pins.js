const express = require('express');
const multer = require('multer');
const { valPin } = require('../joiSchemas');
const { joiValidation } = require('../middlewares');
const prisma = require('../prismaClient');

const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, './medias');
  },
  filename: (req, file, cb) => {
    const name = file.originalname.split(' ').join('_');
    cb(null, `${Date.now()}_${name}`);
  },
});
const upload = multer({ storage });

const router = express.Router();

/**
 * A pin (with id for output display)
 * @typedef {object} DisplayPin
 * @property {number} id.required - ID
 * @property {string} label - Name of the pin
 * @property {string} summary - Summary
 * @property {string} media - Media url
 * @property {string} media_type - Media type
 * @property {string} lat - Latitude of coordinates
 * @property {string} long - Longitude of coordinates
 * @property {number} id_ride - Ride if the pin
 */

/**
 * A pin
 * @typedef {object} Pin
 * @property {string} label - Name of the pin
 * @property {string} summary - Summary
 * @property {string} media - Media url
 * @property {string} media_type - Media type
 * @property {string} lat - Latitude of coordinates
 * @property {string} long - Longitude of coordinates
 * @property {number} id_ride - Ride if the pin
 *  /**
 
 * GET /api/v0/pins
 * @summary View all pins
 * @tags pins
 * @return {array<DisplayPin>} 200 - Pin list successfully retrieved
 * @return {object} 400 - Bad request
 */
router.get('/', (req, res, next) => {
  const { label } = req.query;
  prisma.pin
    .findMany({
      where: {
        label,
      },
    })
    .then((pins) => {
      res.status(200).json(pins);
    })
    .catch((err) => {
      res.sendStatus(400);
      next(err);
    });
});

/**
 * GET /api/v0/pins/{id}
 * @summary View pin by id
 * @tags pins
 * @param {number} id.path - id of wanted pin
 * @return {array<DisplayPin>} 200 - Pin successfully retrieved
 * @return {object} 404 - Pin not found
 */
router.get('/:id', (req, res, next) => {
  const { id } = req.params;

  prisma.pin
    .findUnique({
      where: {
        id: parseInt(id, 10),
      },
    })
    .then((pin) => {
      if (pin !== null) {
        res.status(200).json(pin);
      }
      next();
    })
    .catch((err) => {
      res.sendStatus(404);
      next(err);
    });
});

// PIN MEDIA UPLOAD
router.post('/upload', upload.single('media'), (req, res) => {
  res
    .status(201)
    .json({ path: `${req.protocol}://${req.hostname}/${req.file.path}` });
});

/**
 * POST /api/v0/pins
 * @summary Create a pin
 * @tags pins
 * @param {Pin} request.body.required - pin info
 * @return {array<DisplayPin>} 201 - Pin successfully created
 * @return {object} 422 - Bad data entries
 */
router.post(
  '/',
  upload.single('media'),
  joiValidation(valPin),
  (req, res, next) => {
    const data = req.body;

    prisma.pin
      .create({
        data: { ...data },
      })
      .then((pin) => {
        res.status(201).json(pin);
      })
      .catch((err) => {
        res.sendStatus(422);
        next(err);
      });
  }
);

/**
 * DELETE /api/v0/pins/{id}
 * @summary Delete a pin
 * @tags pins
 * @param {number} id.path - id of wanted pin
 * @return {object} 204 - Pin successfully deleted
 * @return {object} 404 - Pin not found
 */
router.delete('/:id', (req, res, next) => {
  const { id } = req.params;

  prisma.pin
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
 * PUT /api/v0/pins/{id}
 * @summary Update a pin
 * @tags pins
 * @param {number} id.path - id of wanted pin
 * @param {Pin} request.body.required - pin info
 * @return {array<DisplayPin>} 200 - Pin successfully updated
 * @return {object} 404 - Pin not found
 * @return {object} 422 - Bad data entries
 */
router.put('/:id', joiValidation(valPin), (req, res, next) => {
  const { id } = req.params;
  const data = req.body;

  prisma.pin
    .update({
      where: {
        id: parseInt(id, 10),
      },
      data: { ...data },
    })
    .then((updatedPin) => {
      res.status(200).json(updatedPin);
    })
    .catch((err) => {
      res.sendStatus(404);
      next(err);
    });
});

module.exports = router;
