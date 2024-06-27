const Joi = require('joi');

const getAll = {
  query: Joi.object()
    .keys({
      q: Joi.string(),
    })
    .unknown(true),
};

const getById = {
  params: {
    productId: Joi.string().required(),
  },
};

module.exports = {
  getAll,
  getById,
};
