exports.protectedRoute = (req, res, next) => {
  console.log(req.authorization);
  next();
};
