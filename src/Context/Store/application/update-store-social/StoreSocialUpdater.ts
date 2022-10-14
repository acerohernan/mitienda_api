import { inject, injectable } from "inversify";
import { CONTAINER_TYPES } from "../../../../app/dependency-injection/types";
import { NotFoundException } from "../../../Shared/domain/exceptions/NotFoundException";
import { UserId } from "../../../Shared/domain/UserId";
import { StoreRepository } from "../../domain/ioc/StoreRepository";
import { StoreSocialRepository } from "../../domain/ioc/StoreSocialRepository";
type Params = {
  user_id: string;
  facebook: string | null;
  instagram: string | null;
  pinterest: string | null;
  twitter: string | null;
  linkedin: string | null;
  tiktok: string | null;
  youtube: string | null;
};

@injectable()
export class StoreSocialUpdater {
  constructor(
    @inject(CONTAINER_TYPES.StoreRepository)
    private storeRepository: StoreRepository,
    @inject(CONTAINER_TYPES.StoreSocialRepository)
    private socialRepository: StoreSocialRepository
  ) {}

  async run(params: Params): Promise<void> {
    const user_id = new UserId(params.user_id);
    const store = await this.storeRepository.searchByUserId(user_id);

    if (!store)
      throw new NotFoundException("The user not have a created store");

    const social = await this.socialRepository.searchByStoreId(store.id);

    if (!social)
      throw new NotFoundException("The store not have a store social created");

    social.updateSocialInformation({
      facebook: params.facebook || null,
      instagram: params.instagram || null,
      pinterest: params.pinterest || null,
      twitter: params.twitter || null,
      linkedin: params.linkedin || null,
      tiktok: params.tiktok || null,
      youtube: params.youtube || null,
    });

    await this.socialRepository.save(social);
  }
}
