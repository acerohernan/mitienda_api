import compress from "compression";
import errorHandler from "errorhandler";
import express, {
  json,
  NextFunction,
  Request,
  Response,
  urlencoded,
} from "express";
import Router from "express-promise-router";
import helmet from "helmet";
import http from "http";
import httpStatus from "http-status";
import {
  AppException,
  APP_EXCEPTIONS,
} from "../Context/Shared/domain/exceptions/AppException";
import { registerRoutes } from "./routes";

export class Server {
  private express: express.Express;
  private port: string;
  private httpServer?: http.Server;

  constructor(port: string) {
    this.port = port;
    this.express = express();
    this.express.use(json());
    this.express.use(urlencoded({ extended: true }));
    this.express.use(helmet.xssFilter());
    this.express.use(helmet.noSniff());
    this.express.use(helmet.hidePoweredBy());
    this.express.use(helmet.frameguard({ action: "deny" }));
    this.express.use(compress());

    const router = Router();
    router.use(errorHandler());

    this.express.use(router);

    registerRoutes(router);

    router.use(
      (err: AppException, req: Request, res: Response, next: NextFunction) => {
        switch (err.type) {
          case APP_EXCEPTIONS.INVALID_ARGUMENT: {
            res.status(httpStatus.BAD_REQUEST).send({ error: err.message });
            break;
          }
          case APP_EXCEPTIONS.DUPLICATED: {
            res.status(httpStatus.BAD_REQUEST).send({ error: err.message });
            break;
          }
          case APP_EXCEPTIONS.UNATHORIZED: {
            res.status(httpStatus.UNAUTHORIZED).send({ error: err.message });
            break;
          }
          case APP_EXCEPTIONS.NOT_FOUND: {
            res.status(httpStatus.NOT_FOUND).send({ error: err.message });
            break;
          }
          default: {
            console.log(err);
            res.status(httpStatus.INTERNAL_SERVER_ERROR).send();
            break;
          }
        }
      }
    );
  }

  async listen(): Promise<void> {
    return new Promise((resolve) => {
      this.httpServer = this.express.listen(this.port, () => {
        console.log(
          `Mi Tienda Backend App is running in http://localhost:${this.port}`
        );

        console.log("Press CTRL-C to stop\n");
        resolve();
      });
    });
  }

  getHttpServer() {
    return this.httpServer;
  }

  async stop(): Promise<void> {
    return new Promise((resolve, reject) => {
      if (!this.httpServer) return resolve();

      this.httpServer.close((error) => {
        if (error) return reject(error);

        return resolve();
      });
    });
  }
}
