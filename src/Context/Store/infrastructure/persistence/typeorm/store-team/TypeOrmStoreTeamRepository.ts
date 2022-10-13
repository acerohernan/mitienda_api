import { injectable } from "inversify";
import { EntitySchema } from "typeorm";
import { Nullable } from "../../../../../Shared/domain/Nullable";
import { TypeOrmRepository } from "../../../../../Shared/infrastructure/persistence/typeorm/TypeOrmRepository";
import { StoreTeamRepository } from "../../../../domain/ioc/StoreTeamRepository";
import { StoreTeam, StoreTeamPrimitives } from "../../../../domain/StoreTeam";
import { StoreTeamId } from "../../../../domain/value-objects/StoreTeamId";
import { StoreTeamEntity } from "./StoreTeamEntity";

@injectable()
export class TypeOrmStoreTeamRepository
  extends TypeOrmRepository<StoreTeam, StoreTeamPrimitives>
  implements StoreTeamRepository
{
  protected entitySchema(): EntitySchema<StoreTeamPrimitives> {
    return StoreTeamEntity;
  }
  async save(store: StoreTeam): Promise<void> {
    this.persist(store);
  }
  async search(id: StoreTeamId): Promise<Nullable<StoreTeam>> {
    const team = await this.searchById(id);

    if (!team) return null;

    return StoreTeam.fromPrimitives(team);
  }
}
