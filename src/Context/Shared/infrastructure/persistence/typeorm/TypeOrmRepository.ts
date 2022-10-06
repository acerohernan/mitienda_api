import { injectable } from "inversify";
import { DataSource, EntitySchema, Repository } from "typeorm";
import { AgregateRoot } from "../../../domain/AgregateRoot";
import { TypeOrmClientFactory } from "./TypeOrmClientFactory";

@injectable()
export abstract class TypeOrmRepository<T extends AgregateRoot> {
  constructor() {}

  protected abstract entitySchema(): EntitySchema<T>;

  protected client(): Promise<DataSource> {
    return TypeOrmClientFactory.createClient("mitienda");
  }

  protected async repository(): Promise<Repository<T>> {
    return (await this.client()).getRepository(this.entitySchema());
  }

  protected async persist(aggregateRoot: T): Promise<void> {
    const repository = await this.repository();
    await repository.save(aggregateRoot.toPrimitives() as any);
  }
}
