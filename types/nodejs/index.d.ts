declare global {
  namespace NodeJS {
    interface ProcessEnv {
      CONNECTION_STRING_LOCAL: string;
      CONNECTION_STRING_PRODUCTION: string;
      PORT?: number;
      JWT_SECRET_KEY: string;
    }
  }
}
