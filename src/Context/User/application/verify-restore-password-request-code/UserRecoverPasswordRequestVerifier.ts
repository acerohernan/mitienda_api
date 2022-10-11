import { inject, injectable } from "inversify";
import { CONTAINER_TYPES } from "../../../../app/dependency-injection/types";
import { NotFoundException } from "../../../Shared/domain/exceptions/NotFoundException";
import { Nullable } from "../../../Shared/domain/Nullable";
import { UserRecoverPasswordRequestRepository } from "../../domain/ioc/UserRecoverPasswordRequestRepository";
import { UserRecoverPasswordRequest } from "../../domain/UserRecoverPasswordRequest";
import { UserRecoverPasswordId } from "../../domain/value-objects/UserRecoverPasswordId";

type Params = {
  request_id: string;
};

@injectable()
export class UserRecoverPasswordRequestVerifier {
  constructor(
    @inject(CONTAINER_TYPES.UserRecoverPasswordRequestRepository)
    private repository: UserRecoverPasswordRequestRepository
  ) {}

  async run({ request_id }: Params): Promise<void> {
    const id = new UserRecoverPasswordId(request_id);
    const request = await this.repository.search(id);

    this.ensureThatRequestExists(request, id);
  }

  private ensureThatRequestExists(
    request: Nullable<UserRecoverPasswordRequest>,
    id: UserRecoverPasswordId
  ): void {
    if (request === null)
      throw new NotFoundException(
        `The recover password request code <${id.value}> is invalid`
      );
  }
}
