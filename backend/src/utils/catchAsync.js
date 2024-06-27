const catchAsync = (fn) => (req, res, next) => {
  // Error catch handler to wrap any function for handling unwanted error
  Promise.resolve(fn(req, res, next)).catch((err) => {
    console.error(err);
    return next(err);
  });
};

module.exports = catchAsync;
