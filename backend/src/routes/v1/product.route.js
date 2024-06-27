const express = require('express');
const { productController } = require('../../controllers');
const validate = require('../../middlewares/validate');
const { productValidation } = require('../../validations');
const verifyToken = require('../../middlewares/verifyToken');

const router = express.Router();

router
  .route('/')
  .get(
    verifyToken,
    validate(productValidation.getAll),
    productController.getAll
  );

router
  .route('/:productId')
  .get(
    verifyToken,
    validate(productValidation.getById),
    productController.getById
  );

module.exports = router;
