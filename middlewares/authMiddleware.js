const jwt = require('jsonwebtoken');

exports.protectedRoute = (req, res, next) => {
  try {
    const token = req.header.authorization.split('Bearer ')[1];
    const verifiedToken = jwt.verify(token, 'test');
    req.userId = verifiedToken?.id;
    next();
  } catch (error) {
    console.log(`Not authorized: ${error}`);
    res.status(404);
  }
  next();
};
