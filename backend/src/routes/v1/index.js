const express = require('express');
const productRoutes = require('./product.route');
const authRoutes = require('./auth.route');

const router = express.Router();

const routes = [
  {
    path: '/product',
    route: productRoutes,
  },
  {
    path: '/auth',
    route: authRoutes,
  },
];

routes.forEach((route) => {
  router.use(route.path, route.route);
});

module.exports = router;
