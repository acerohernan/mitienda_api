import "reflect-metadata";
import { Server } from "./server";

export class MiTiendaApp {
  server?: Server;

  async start() {
    const port = process.env.PORT || "5000";
    this.server = new Server(port);
    return this.server.listen();
  }

  get httpServer() {
    return this.server?.getHttpServer();
  }

  async stop() {
    return this.server?.stop();
  }
}
