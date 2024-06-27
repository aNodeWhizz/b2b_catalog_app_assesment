const httpStatus = require('http-status');
const { Op } = require('sequelize');
const catchAsync = require('../utils/catchAsync');
const { Product } = require('../models');

const getAll = catchAsync(async (req, res) => {
  let filters = {};
  if (req.query?.q) {
    filters = {
      [Op.or]: [
        {
          data_category: {
            [Op.like]: `%${req.query.q}%`,
          },
        },
        {
          company_name: {
            [Op.like]: `%${req.query.q}%`,
          },
        },
      ],
    };
  }
  const products = await Product.findAll({ where: filters });
  res.formatter(httpStatus.OK, products ?? []);
});

const getById = catchAsync(async (req, res) => {
  const { productId } = req.params;
  const productDetails = await Product.findByPk(productId);
  res.formatter(httpStatus.OK, productDetails ?? null);
});

module.exports = {
  getAll,
  getById,
};
