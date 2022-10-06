import { injectable } from "inversify";
import { DataSource } from "typeorm";

@injectable()
export class TypeOrmClientFactory {
  static async createClient(contextName: string): Promise<DataSource> {
    try {
      const appDataSource = new DataSource({
        name: contextName,
        type: "postgres",
        host: "localhost",
        port: 5432,
        username: "mitienda",
        password: "password",
        database: "mitienda_local",
        entities: [
          __dirname +
            "/../../../../**/**/infrastructure/persistence/typeorm/*{.js,.ts}",
        ],
        synchronize: true /* Disabled from producction */,
      });

      console.log("Creando el cliente...");
      const connection = await appDataSource.initialize();
      console.log("Cliente creado");
      return connection;
    } catch (error) {
      console.log(error);
      throw new Error(`The App Data Source from ${contextName} can´t`);
    }
  }
}
