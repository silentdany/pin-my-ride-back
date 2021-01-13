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
  notFound,
  badRequest,
  errorHandler,
  joiValidation,
};
