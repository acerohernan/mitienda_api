import express, { Express } from "express";

export class PlayApp {
  private server: Express;

  constructor() {
    this.server = express();
    this.server.get("/count", (req, res) => {
      let count = 0;
      count = count++;

      res.status(200).send({
        count,
      });
    });
  }

  async start() {
    await this.server.listen(9999);
    console.log("Play server is listening");
  }

  close() {
    console.log("Cerrando el server");
    process.exit(0);
  }
}
