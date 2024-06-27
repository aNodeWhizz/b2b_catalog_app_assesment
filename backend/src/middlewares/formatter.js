// Middleware to provide a consistent response structure
const responseFormatter = (req, res, next) => {
  res.formatter = (status, body) => {
    res.status(status).json({ code: status, data: body });
  };
  next();
};

module.exports = responseFormatter;
