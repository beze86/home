const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();

exports.protectedRoute = (req, res, next) => {
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      const token = req.headers.authorization.split('Bearer ')[1];
      const verifiedToken = jwt.verify(token, process.env.JWT_SECRET_KEY);
      jwt.decode(token);
      req.userId = verifiedToken?.id;
      next();
    } catch (error) {
      res.status(401).json({ error: 'Not authorized' });
    }
  } else {
    res.status(401);
    throw new Error('Not authorized');
  }
};
