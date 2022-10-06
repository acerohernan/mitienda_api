import { DataSource, EntitySchema, EntityTarget, Repository } from "typeorm";
import { TypeOrmClientFactory } from "./TypeOrmClientFactory";

export abstract class TypeOrmRepository<T> {
  constructor() {}

  protected abstract entitySchema(): EntityTarget<EntitySchema<T>>;

  protected client(): Promise<DataSource> {
    return TypeOrmClientFactory.createClient("mitienda");
  }

  protected async repository(): Promise<Repository<EntitySchema<T>>> {
    return (await this.client()).getRepository(this.entitySchema());
  }

  protected async persist(aggregateRoot: T): Promise<void> {
    const repository = await this.repository();
    await repository.save(aggregateRoot as any);
  }
}
