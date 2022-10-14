import { inject, injectable } from "inversify";
import { CONTAINER_TYPES } from "../../../../app/dependency-injection/types";
import { NotFoundException } from "../../../Shared/domain/exceptions/NotFoundException";
import { UserId } from "../../../Shared/domain/UserId";
import { StoreRepository } from "../../domain/ioc/StoreRepository";
import { StoreTeamRepository } from "../../domain/ioc/StoreTeamRepository";

type Params = {
  user_id: string;
  img: string;
  video_link: string;
  description: string;
};

@injectable()
export class StoreTeamUpdater {
  constructor(
    @inject(CONTAINER_TYPES.StoreRepository)
    private storeRepository: StoreRepository,
    @inject(CONTAINER_TYPES.StoreTeamRepository)
    private teamRepository: StoreTeamRepository
  ) {}

  async run(params: Params): Promise<void> {
    const user_id = new UserId(params.user_id);
    const store = await this.storeRepository.searchByUserId(user_id);

    if (!store)
      throw new NotFoundException("The user not have a created store");

    const team = await this.teamRepository.searchByStoreId(store.id);

    if (!team)
      throw new NotFoundException("The store not have a store team created");

    team.updateTeamInformation({
      description: params.description || null,
      img: params.img || null,
      video_link: params.video_link || null,
    });

    await this.teamRepository.save(team);
  }
}
