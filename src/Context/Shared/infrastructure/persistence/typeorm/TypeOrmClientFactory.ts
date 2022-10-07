import { injectable } from "inversify";
import { DataSource } from "typeorm";

@injectable()
export class TypeOrmClientFactory {
  static _client: DataSource | null = null;

  static async createClient(): Promise<DataSource> {
    try {
      const appDataSource = new DataSource({
        name: "MiTiendaAdmin",
        type: "postgres",
        host: "localhost",
        port: 5433,
        username: "mitienda",
        password: "password",
        database: "mitienda_local",
        entities: [
          __dirname +
            "/../../../../**/**/infrastructure/persistence/typeorm/*{.js,.ts}",
        ],
        synchronize: true /* Disabled from producction */,
      });

      console.log("Initializing the TypeORM client...");
      const connection = await appDataSource.initialize();
      console.log("TypeORM Client initialized");
      return connection;
    } catch (error) {
      console.log(error);
      throw new Error(
        `The App Data Source from MiTiendaAdmin could not create a connection`
      );
    }
  }

  static async getClient(): Promise<DataSource> {
    if (this._client === null) this._client = await this.createClient();

    return this._client;
  }
}
