exports.protectedRoute = (req, res, next) => {
  console.log('token', req.authorization);
  next();
};
