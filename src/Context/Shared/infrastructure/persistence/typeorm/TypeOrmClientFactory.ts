import { injectable } from "inversify";
import { DataSource } from "typeorm";
import { config } from "../../config";

@injectable()
export class TypeOrmClientFactory {
  static _client: DataSource | null = null;

  static async createClient(): Promise<DataSource> {
    try {
      const appDataSource = new DataSource({
        name: "MiTiendaAdmin",
        type: config.typeorm.type,
        host: config.typeorm.host,
        port: config.typeorm.port,
        username: config.typeorm.username,
        password: config.typeorm.password,
        database: config.typeorm.database,
        entities: [
          __dirname +
            "/../../../../**/**/infrastructure/persistence/typeorm/*{.js,.ts}",
        ],
        synchronize: true /* Disabled from producction */,
      });

      console.log("Initializing the TypeORM client...");
      const client = await appDataSource.initialize();
      console.log("TypeORM Client initialized");
      return client;
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
