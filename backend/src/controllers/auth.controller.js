const httpStatus = require('http-status');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const catchAsync = require('../utils/catchAsync');
const { User } = require('../models');
const ApiError = require('../utils/ApiError');
const config = require('../config/config');

const login = catchAsync(async (req, res) => {
  const { username, password } = req.body;

  const user = await User.findOne({ where: { username } });

  if (!user) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'Invalid username or password');
  }

  // Compare passwords
  const isMatch = await bcrypt.compare(password, user.passwordHash);

  if (!isMatch) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'Invalid username or password');
  }

  // Create JWT token
  const token = jwt.sign({ id: user.id }, config.jwt.secret, {
    expiresIn: config.jwt.expiresIn,
  });

  res.formatter(httpStatus.OK, token);
});

module.exports = {
  login,
};
