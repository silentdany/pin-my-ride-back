const jwt = require('jsonwebtoken');

function jwtDecode(req, res, next) {
  const { authorization } = req.headers;
  try {
    if (!authorization) throw new Error('no Authorization header found');

    const [bearer, token] = authorization.split(' ');

    if (bearer === 'Bearer' && token) {
      const decoded = jwt.verify(token, process.env.SECRET);
      req.user = decoded;
      next();
    }
  } catch (error) {
    res.status(403);
    next(error);
  }
}

function notFound(req, res, next) {
  res.status(404);
  const err = new Error('Not Found');
  next(err);
}

function badRequest(req, res, next) {
  res.status(400);
  const err = new Error('Bad Request');
  next(err);
}

/* eslint-disable no-unused-vars */
function errorHandler(err, req, res, next) {
  const statusCode = res.statusCode !== 200 ? res.statusCode : 500;
  res.status(statusCode);
  res.json({
    message: err.message,
    stack: process.env.NODE_ENV === 'production' ? '🥞' : err.stack,
  });
}

const joiValidation = (schema) => async (req, res, next) => {
  try {
    await schema.validateAsync(req.body, { abortEarly: false });
    next();
  } catch (err) {
    res.status(422);
    next(err);
  }
};

module.exports = {
  jwtDecode,
  notFound,
  badRequest,
  errorHandler,
  joiValidation,
};
