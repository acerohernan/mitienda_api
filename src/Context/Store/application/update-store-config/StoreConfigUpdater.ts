import { inject, injectable } from "inversify";
import { CONTAINER_TYPES } from "../../../../app/dependency-injection/types";
import { NotFoundException } from "../../../Shared/domain/exceptions/NotFoundException";
import { UserId } from "../../../Shared/domain/UserId";
import { StoreConfigRepository } from "../../domain/ioc/StoreConfigRepository";
import { StoreRepository } from "../../domain/ioc/StoreRepository";
type Params = {
  user_id: string;
  request_dni: boolean;
  add_delivery_date: boolean;
  add_comment: boolean;
  comment: string | null;
};

@injectable()
export class StoreConfigUpdater {
  constructor(
    @inject(CONTAINER_TYPES.StoreRepository)
    private storeRepository: StoreRepository,
    @inject(CONTAINER_TYPES.StoreConfigRepository)
    private configRepository: StoreConfigRepository
  ) {}

  async run(params: Params): Promise<void> {
    const user_id = new UserId(params.user_id);
    const store = await this.storeRepository.searchByUserId(user_id);

    if (!store)
      throw new NotFoundException("The user not have a created store");

    const config = await this.configRepository.searchByStoreId(store.id);

    if (!config)
      throw new NotFoundException("The store not have a store config created");

    config.updateConfigInformation({
      request_dni: Boolean(params.request_dni),
      add_delivery_date: Boolean(params.add_delivery_date),
      add_comment: Boolean(params.add_comment),
      comment: params.comment || null,
    });

    await this.configRepository.save(config);
  }
}
