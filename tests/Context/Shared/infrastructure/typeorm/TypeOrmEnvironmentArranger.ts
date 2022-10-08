import { injectable } from "inversify";
import { DataSource, EntityMetadata } from "typeorm";
import { TypeOrmClientFactory } from "../../../../../src/Context/Shared/infrastructure/persistence/typeorm/TypeOrmClientFactory";
import { EnvironmentArranger } from "../arranger/EnvironmentArranger";

@injectable()
export class TypeOrmEnvironmentArranger extends EnvironmentArranger {
  public async client(): Promise<DataSource> {
    return TypeOrmClientFactory.getClient();
  }

  public async arrange(): Promise<void> {
    await this.cleanDatabase();
  }

  public async cleanDatabase() {
    const entities = await this.entities();

    try {
      for (const entity of entities) {
        const repository = (await this.client()).getRepository(entity.name);
        await repository.query(`TRUNCATE TABLE ${entity.tableName}`);
      }
    } catch (error) {
      throw new Error(`Unable to clean test database: ${error}`);
    }
  }

  private async entities(): Promise<Array<EntityMetadata>> {
    return (await this.client()).entityMetadatas;
  }

  public async close(): Promise<void> {
    return;
  }
}
