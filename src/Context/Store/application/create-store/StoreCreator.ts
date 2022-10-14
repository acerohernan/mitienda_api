import { inject, injectable } from "inversify";
import { CONTAINER_TYPES } from "../../../../app/dependency-injection/types";
import { Criteria } from "../../../Shared/domain/criteria/Criteria";
import { Filter } from "../../../Shared/domain/criteria/Filter";
import { Operator } from "../../../Shared/domain/criteria/FilterOperator";
import { Filters } from "../../../Shared/domain/criteria/Filters";
import { Order } from "../../../Shared/domain/criteria/Order";
import { DuplicatedEntityException } from "../../../Shared/domain/exceptions/DuplicatedEntityException";
import { UserId } from "../../../Shared/domain/UserId";
import { Uuid } from "../../../Shared/domain/Uuid";
import { StoreConfigRepository } from "../../domain/ioc/StoreConfigRepository";
import { StoreRepository } from "../../domain/ioc/StoreRepository";
import { StoreSocialRepository } from "../../domain/ioc/StoreSocialRepository";
import { StoreTeamRepository } from "../../domain/ioc/StoreTeamRepository";
import { Store } from "../../domain/Store";
import { StoreConfig } from "../../domain/StoreConfig";
import { StoreSocial } from "../../domain/StoreSocial";
import { StoreTeam } from "../../domain/StoreTeam";
import { StoreConfigId } from "../../domain/value-objects/StoreConfigId";
import { StoreCountryId } from "../../domain/value-objects/StoreCountryId";
import { StoreCurrencyId } from "../../domain/value-objects/StoreCurrencyId";
import { StoreDomain } from "../../domain/value-objects/StoreDomain";
import { StoreId } from "../../domain/value-objects/StoreId";
import { StoreName } from "../../domain/value-objects/StoreName";
import { StoreSocialId } from "../../domain/value-objects/StoreSociald";
import { StoreTeamId } from "../../domain/value-objects/StoreTeamId";
import { StoreWhatsapp } from "../../domain/value-objects/StoreWhatsapp";

type Params = {
  domain: string;
  name: string;
  whatsapp: string;
  type: string;
  currency_id: string;
  country_id: string;
  user_id: string;
};

@injectable()
export class StoreCreator {
  constructor(
    @inject(CONTAINER_TYPES.StoreRepository)
    private repository: StoreRepository,
    @inject(CONTAINER_TYPES.StoreTeamRepository)
    private teamRepository: StoreTeamRepository,
    @inject(CONTAINER_TYPES.StoreConfigRepository)
    private configRepository: StoreConfigRepository,
    @inject(CONTAINER_TYPES.StoreSocialRepository)
    private socialRepository: StoreSocialRepository
  ) {}

  async run(params: Params): Promise<void> {
    await this.verifyIfExistAnStoreWithTheSameUserId(params.user_id);
    await this.verifyIfTheStoreDomainIsNotTaken(params.domain);

    const store_id = new StoreId(Uuid.random().value);
    const user_id = new UserId(params.user_id);
    const country_id = new StoreCountryId(params.country_id);
    const currency_id = new StoreCurrencyId(params.currency_id);
    const domain = new StoreDomain(params.domain);
    const name = new StoreName(params.name);
    const whatsapp = new StoreWhatsapp(params.whatsapp);
    const { tier_id, expiration_date } =
      await this.getDefaultTierAndExpirationDate();

    const store = new Store({
      id: store_id,
      user_id,
      country_id,
      currency_id,
      tier_id,
      expiration_date,
      domain,
      name,
      whatsapp,
      type: params.type,
      banner_img: null,
      buttons_color: null,
      description: null,
      logo_img: null,
    });
    await this.repository.save(store);

    await this.createStoreConfig(store_id);
    await this.createStoreSocial(store_id);
    await this.createStoreTeam(store_id);
  }

  private async verifyIfTheStoreDomainIsNotTaken(domain: string) {
    const storeDomain = new StoreDomain(domain);

    const criteria = new Criteria(
      new Filters([
        Filter.fromValues({
          field: "domain",
          operator: Operator.EQUAL,
          value: storeDomain.value,
        }),
      ]),
      Order.none(),
      1,
      0
    );

    const user = (await this.repository.matching(criteria))[0];

    if (user)
      throw new DuplicatedEntityException(
        `The store domain ${domain} is taken. Please use another`
      );
  }

  private async verifyIfExistAnStoreWithTheSameUserId(user_id: string) {
    const userId = new UserId(user_id);

    const store = await this.repository.searchByUserId(userId);

    if (store)
      throw new DuplicatedEntityException(`The user already have an store.`);
  }

  private async getDefaultTierAndExpirationDate(): Promise<{
    tier_id: string;
    expiration_date: Date;
  }> {
    return {
      tier_id: "b30875b8-7d1b-44c0-8dda-79963198904c",
      expiration_date: new Date(),
    };
  }

  private async createStoreConfig(store_id: StoreId) {
    const config_id = new StoreConfigId(Uuid.random().value);
    const config = new StoreConfig({
      id: config_id,
      store_id,
      request_dni: false,
      add_comment: false,
      add_delivery_date: false,
      comment: null,
    });

    await this.configRepository.save(config);
  }

  private async createStoreSocial(store_id: StoreId) {
    const social_id = new StoreSocialId(Uuid.random().value);
    const social = new StoreSocial({
      id: social_id,
      store_id,
      facebook: null,
      instagram: null,
      linkedin: null,
      pinterest: null,
      tiktok: null,
      twitter: null,
      youtube: null,
    });

    await this.socialRepository.save(social);
  }

  private async createStoreTeam(store_id: StoreId) {
    const team_id = new StoreTeamId(Uuid.random().value);
    const team = new StoreTeam({
      id: team_id,
      store_id,
      description: null,
      img: null,
      video_link: null,
    });
    await this.teamRepository.save(team);
  }
}
