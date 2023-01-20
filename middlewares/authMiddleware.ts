import { config } from 'dotenv';
import { Response, Request, NextFunction } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';

config();

const protectedRoute = (req: Request, res: Response, next: NextFunction) => {
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      const token = req.headers.authorization.split('Bearer ')[1];

      const verifiedToken = jwt.verify(token, process.env.JWT_SECRET_KEY) as JwtPayload;

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

export { protectedRoute };
