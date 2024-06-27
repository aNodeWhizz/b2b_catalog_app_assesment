const express = require('express');
const { authController } = require('../../controllers');
const validate = require('../../middlewares/validate');
const { authValidation } = require('../../validations');

const router = express.Router();

router
  .route('/login')
  .post(validate(authValidation.login), authController.login);

module.exports = router;
