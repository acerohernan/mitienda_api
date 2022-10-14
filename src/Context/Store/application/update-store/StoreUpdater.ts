import { inject, injectable } from "inversify";
import { CONTAINER_TYPES } from "../../../../app/dependency-injection/types";
import { NotFoundException } from "../../../Shared/domain/exceptions/NotFoundException";
import { UserId } from "../../../Shared/domain/UserId";
import { StoreRepository } from "../../domain/ioc/StoreRepository";
import { StoreCurrencyId } from "../../domain/value-objects/StoreCurrencyId";
import { StoreName } from "../../domain/value-objects/StoreName";
import { StoreWhatsapp } from "../../domain/value-objects/StoreWhatsapp";

type Params = {
  user_id: string;
  name: string;
  whatsapp: string;
  type: string;
  currency_id: string;
};

@injectable()
export class StoreUpdater {
  constructor(
    @inject(CONTAINER_TYPES.StoreRepository) private repository: StoreRepository
  ) {}

  async run(params: Params): Promise<void> {
    const user_id = new UserId(params.user_id);
    const store = await this.repository.searchByUserId(user_id);

    if (!store)
      throw new NotFoundException("The user not have an store created");

    const name = new StoreName(params.name);
    const type = params.type;
    const whatsapp = new StoreWhatsapp(params.whatsapp);
    const currency_id = new StoreCurrencyId(params.currency_id);

    store.updateGeneralInformation({ name, type, whatsapp, currency_id });

    await this.repository.save(store);
  }
}
