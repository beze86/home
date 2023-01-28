import { ObjectId } from 'mongodb';

declare global {
  namespace Express {
    interface Request {
      userId: string;
    }
  }

  namespace NodeJS {
    interface ProcessEnv {
      CONNECTION_STRING_LOCAL: string;
      CONNECTION_STRING_PRODUCTION: string;
      PORT?: number;
      JWT_SECRET_KEY: string;
    }
  }
}
