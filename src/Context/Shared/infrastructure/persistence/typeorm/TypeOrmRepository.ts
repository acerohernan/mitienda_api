import { injectable } from "inversify";
import { DataSource, EntitySchema, Repository } from "typeorm";
import { AgregateRoot } from "../../../domain/AgregateRoot";
import { Criteria } from "../../../domain/criteria/Criteria";
import { Filter } from "../../../domain/criteria/Filter";
import { Uuid } from "../../../domain/Uuid";
import { TypeOrmClientFactory } from "./TypeOrmClientFactory";

interface AggregatePrimitives {
  id: string;
}

@injectable()
export abstract class TypeOrmRepository<
  T extends AgregateRoot,
  Primitives extends AggregatePrimitives
> {
  constructor() {}

  protected abstract entitySchema(): EntitySchema<Primitives>;

  protected client(): Promise<DataSource> {
    return TypeOrmClientFactory.getClient();
  }

  protected async repository(): Promise<Repository<Primitives>> {
    return (await this.client()).getRepository(this.entitySchema());
  }

  protected async persist(aggregateRoot: T): Promise<void> {
    const repository = await this.repository();
    await repository.save(aggregateRoot.toPrimitives() as any);
  }

  protected async remove(id: Uuid): Promise<void> {
    const repository = await this.repository();
    await repository.delete(id.value);
  }

  protected async searchByCriteria(
    criteria: Criteria
  ): Promise<Array<Primitives>> {
    const repository = await this.repository();

    const { query, parameters, sortBy, order, offset, limit } =
      this.criteriaConverter(criteria);

    return repository
      .createQueryBuilder("entity")
      .where(query)
      .orderBy(sortBy, order)
      .skip(offset)
      .take(limit)
      .setParameters(parameters)
      .getMany();
  }

  protected criteriaConverter(criteria: Criteria): {
    query: string;
    parameters: Object;
    sortBy: string;
    order: "ASC" | "DESC";
    offset: number;
    limit: number;
  } {
    let query = "";
    let parameters = {};
    let sortBy = "";
    let order: "ASC" | "DESC" = "ASC";
    let offset = criteria.offset || 0;
    let limit = criteria.limit || 100;

    if (criteria.hasFilters()) {
      query = this.queryCreator(criteria.filters.filters);
      parameters = this.parametersCreator(criteria.filters.filters);
    }

    if (criteria.order.hasOrder()) {
      sortBy = criteria.order.orderBy.value;

      if (!criteria.order.orderType.isAsc()) order = "DESC";
    }

    return {
      query,
      parameters,
      sortBy,
      order,
      offset,
      limit,
    };
  }

  protected queryCreator(filters: Array<Filter>): string {
    const querys = filters.map(this.filterCriteraConverterToQuery);

    return querys.reduce((prevQuery, currentQuery) =>
      prevQuery.concat(` AND ${currentQuery}`)
    );
  }

  protected parametersCreator(filters: Array<Filter>): Object {
    const parametersArray = filters.map(this.filterCriteraConverterToParameter);
    const parametersObject = parametersArray.reduce(
      (prevParam, currentParam) => ({
        ...prevParam,
        ...currentParam,
      })
    );
    return parametersObject;
  }

  protected filterCriteraConverterToQuery(filter: Filter): string {
    return `entity.${filter.field.value} ${filter.operator.value} :${filter.field.value}`;
  }

  protected filterCriteraConverterToParameter(filter: Filter): Object {
    const field = filter.field.value;
    const value = filter.value.value;
    const obj = new Object({ [field]: value });

    return obj;
  }
}
