import convict from "convict";

const config = convict({
  env: {
    doc: "The appliation environment.",
    format: ["production", "development", "test"],
    default: "default",
    env: "NODE_ENV",
  },
  typeorm: {
    host: {
      doc: "The database host",
      format: String,
      env: "TYPEORM_HOST",
      default: "localhost",
    },
    port: {
      doc: "The database port",
      format: Number,
      env: "TYPEORM_PORT",
      default: 5432,
    },
    username: {
      doc: "The database username",
      format: String,
      env: "TYPEORM_USERNAME",
      default: "mitienda",
    },
    password: {
      doc: "The database password",
      format: String,
      env: "TYPEORM_PASSWORD",
      default: "password",
    },
    database: {
      doc: "The database name",
      format: Number,
      env: "TYPEORM_DATABASE",
      default: 5432,
    },
  },
});

config.loadFile([
  __dirname + "/default.json",
  __dirname + `/${config.get("env")}.json`,
]);
