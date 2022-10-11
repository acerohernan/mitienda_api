import { Request, Response } from "express";
import { inject, injectable } from "inversify";
import { UserRecoverPasswordRequestCreator } from "../../../Context/User/application/create-restore-password-request/UserRecoverPasswordRequestCreator";
import { CONTAINER_TYPES } from "../../dependency-injection/types";
import { Controller } from "../Controller";

@injectable()
export class UserRecoverPasswordRequestPostController implements Controller {
  constructor(
    @inject(CONTAINER_TYPES.UserRecoverPasswordRequestCreator)
    private userRecoverPasswordRequestCreator: UserRecoverPasswordRequestCreator
  ) {}

  async run(req: Request, res: Response): Promise<void> {
    const { email, request_uuid } = req.body;
    const { code } = await this.userRecoverPasswordRequestCreator.run({
      email,
      request_uuid,
    });

    res.status(201).send({ code });
  }
}
