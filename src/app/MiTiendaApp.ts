import "reflect-metadata";
import { TypeOrmClientFactory } from "../Context/Shared/infrastructure/persistence/typeorm/TypeOrmClientFactory";
import { Server } from "./server";

export class MiTiendaApp {
  server?: Server;

  async start() {
    const port = process.env.PORT || "5000";
    this.server = new Server(port);

    await TypeOrmClientFactory.getClient();

    return this.server.listen();
  }

  get httpServer() {
    return this.server?.getHttpServer();
  }

  async stop() {
    return this.server?.stop();
  }
}
