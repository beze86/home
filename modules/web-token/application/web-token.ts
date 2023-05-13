import { sign } from 'jsonwebtoken';

const generateWebToken = (id: string, userName: string) => {
  return sign({ id, userName }, process.env.JWT_SECRET_KEY, {
    expiresIn: process.env.JTW_EXPIRATION_TIME,
  });
};

export { generateWebToken };
