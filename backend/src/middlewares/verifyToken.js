const jwt = require('jsonwebtoken');
const httpStatus = require('http-status');
const config = require('../config/config');
const ApiError = require('../utils/ApiError');

// Middleware to protect route from unauthorized access
const verifyToken = (req, res, next) => {
  const token = req.headers.authorization?.replace('Bearer ', '');

  if (!token) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'No token provided');
  }

  jwt.verify(token, config.jwt.secret, (err, decoded) => {
    if (err) {
      console.error(err);
      throw new ApiError(httpStatus.UNAUTHORIZED, 'Invalid token');
    }
    req.userId = decoded.id;
    next();
  });
};

module.exports = verifyToken;
