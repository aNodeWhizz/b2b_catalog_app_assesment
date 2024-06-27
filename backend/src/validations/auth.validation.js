const Joi = require('joi');

const login = {
  body: Joi.object()
    .keys({
      username: Joi.string().required(),
      password: Joi.string().required(),
    })
    .unknown(false),
};

module.exports = {
  login,
};
