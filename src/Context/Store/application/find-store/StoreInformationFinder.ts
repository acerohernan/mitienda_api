import { inject, injectable } from "inversify";
import { omit } from "lodash";
import { CONTAINER_TYPES } from "../../../../app/dependency-injection/types";
import { Criteria } from "../../../Shared/domain/criteria/Criteria";
import { Filter } from "../../../Shared/domain/criteria/Filter";
import { Operator } from "../../../Shared/domain/criteria/FilterOperator";
import { Filters } from "../../../Shared/domain/criteria/Filters";
import { Order } from "../../../Shared/domain/criteria/Order";
import { NotFoundException } from "../../../Shared/domain/exceptions/NotFoundException";
import { UserId } from "../../../Shared/domain/UserId";
import { StoreConfigRepository } from "../../domain/ioc/StoreConfigRepository";
import { StoreRepository } from "../../domain/ioc/StoreRepository";
import { StoreSocialRepository } from "../../domain/ioc/StoreSocialRepository";
import { StoreTeamRepository } from "../../domain/ioc/StoreTeamRepository";
import { Store } from "../../domain/Store";
import { StoreConfig } from "../../domain/StoreConfig";
import { StoreSocial } from "../../domain/StoreSocial";
import { StoreTeam } from "../../domain/StoreTeam";
import { StoreId } from "../../domain/value-objects/StoreId";

type StoreInformation = any;

type Params = {
  user_id: string;
};

@injectable()
export class StoreInformationFinder {
  constructor(
    @inject(CONTAINER_TYPES.StoreRepository)
    private repository: StoreRepository,
    @inject(CONTAINER_TYPES.StoreTeamRepository)
    private teamRepository: StoreTeamRepository,
    @inject(CONTAINER_TYPES.StoreSocialRepository)
    private socialRepository: StoreSocialRepository,
    @inject(CONTAINER_TYPES.StoreConfigRepository)
    private configRepository: StoreConfigRepository
  ) {}

  async run(params: Params): Promise<StoreInformation> {
    const user_id = new UserId(params.user_id);
    const store = await this.getStoreByUserId(user_id);

    const team = await this.getTeamByStoreId(store.id);
    const social = await this.getSocialByStoreId(store.id);
    const config = await this.getConfigByStoreId(store.id);

    const hiddenProperties = ["id", "store_id"];

    return {
      ...store.toPrimitives(),
      team: omit(team.toPrimitives(), hiddenProperties),
      social: omit(social.toPrimitives(), hiddenProperties),
      config: omit(config.toPrimitives(), hiddenProperties),
    };
  }

  private async getStoreByUserId(user_id: UserId): Promise<Store> {
    const criteria = new Criteria(
      new Filters([
        Filter.fromValues({
          field: "user_id",
          operator: Operator.EQUAL,
          value: user_id.value,
        }),
      ]),
      Order.none(),
      1,
      0
    );
    const store = (await this.repository.matching(criteria))[0];

    if (!store)
      throw new NotFoundException(`The user not have a store created`);

    return store;
  }

  private async getTeamByStoreId(store_id: StoreId): Promise<StoreTeam> {
    const team = await this.teamRepository.searchByStoreId(store_id);

    if (!team)
      throw new NotFoundException(
        `The team information of your store not exists, please contact the support team <mitienda@support.com>`
      );

    return team;
  }

  private async getSocialByStoreId(store_id: StoreId): Promise<StoreSocial> {
    const social = await this.socialRepository.searchByStoreId(store_id);

    if (!social)
      throw new NotFoundException(
        `The social information of your store not exists, please contact the support social <mitienda@support.com>`
      );

    return social;
  }

  private async getConfigByStoreId(store_id: StoreId): Promise<StoreConfig> {
    const config = await this.configRepository.searchByStoreId(store_id);

    if (!config)
      throw new NotFoundException(
        `The config information of your store not exists, please contact the support config <mitienda@support.com>`
      );

    return config;
  }
}
