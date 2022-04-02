const jwt = require('jsonwebtoken');

exports.protectedRoute = (req, res, next) => {
  if (req.headers.Authorization && req.header.Authorization.startsWith('Bearer')) {
    try {
      const token = req.header.authorization.split('Bearer ')[1];
      const verifiedToken = jwt.verify(token, 'test');
      req.userId = verifiedToken?.id;
      next();
    } catch (error) {
      res.status(401).json({ error: 'Not authorized' });
    }
  }

  res.status(401);
};
