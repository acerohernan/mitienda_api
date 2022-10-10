import dotenv from "dotenv";

dotenv.config({
  path: __dirname + `/../../../../../.env.${process.env.NODE_ENV}`,
});
interface AppConfig {
  env: string;
  typeorm: {
    type: "postgres";
    host: string;
    port: number;
    username: string;
    password: string;
    database: string;
  };
  jwt: {
    secret: string;
  };
}

export const config: AppConfig = {
  env: String(process.env.NODE_ENV),
  typeorm: {
    type: "postgres",
    host: String(process.env.TYPEORM_HOST),
    port: Number(process.env.TYPEORM_PORT),
    username: String(process.env.TYPEORM_USERNAME),
    password: String(process.env.TYPEORM_PASSWORD),
    database: String(process.env.TYPEORM_DATABASE),
  },
  jwt: {
    secret: String(process.env.JWT_SECRET),
  },
};
