import dotenv from "dotenv";
dotenv.config({
  path: __dirname + `/../../../../../.env.${process.env.NODE_ENV}`,
});
interface AppConfig {
  env: string;
  jwt: {
    secret: string;
  };
}

export const config: AppConfig = {
  env: String(process.env.NODE_ENV),
  jwt: {
    secret: String(process.env.JWT_SECRET),
  },
};
