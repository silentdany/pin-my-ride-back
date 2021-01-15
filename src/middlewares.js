const jwt = require('jsonwebtoken');
const multer = require('multer');
const path = require('path');

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

// MULTER CONFIG
// Storage path
const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, './medias');
  },
  filename: (req, file, cb) => {
    cb(
      null,
      `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`
    );
  },
});
// Check files type
const checkFileType = (file, cb) => {
  // Allowed ext
  const filetypes = /jpeg|jpg|png/;
  // Check ext
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  // Check mime
  const mimetype = filetypes.test(file.mimetype);

  if (mimetype && extname) {
    return cb(null, true);
  }
  return cb('Error: Images Only!');
};
// Upload options
const upload = multer({
  storage,
  limits: {
    fields: 5,
    fieldNameSize: 10,
    fieldSize: 20000,
    fileSize: 25000000,
  },
  fileFilter(req, file, cb) {
    checkFileType(file, cb);
  },
}).single('media');

module.exports = {
  jwtDecode,
  notFound,
  badRequest,
  errorHandler,
  joiValidation,
  upload,
};
