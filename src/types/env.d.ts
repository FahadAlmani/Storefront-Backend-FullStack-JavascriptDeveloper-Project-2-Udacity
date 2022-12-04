declare global {
  namespace NodeJS {
    interface ProcessEnv {
      DB_HOST: string;
      DB_USER: string;
      DB_PASSWORD: string;
      DEV_DB_NAME: string;
      TEST_DB_NAME: string;
      PORT: string;
      PEPPER: string;
      SECRET_TOKEN: string;
      ENV: string;
    }
  }
}
export {};
