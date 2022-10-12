import { Request, Response } from "express";
import { ParamsDictionary } from "express-serve-static-core";
import { inject, injectable } from "inversify";
import { ParsedQs } from "qs";
import { UserRecoverPasswordRequestVerifier } from "../../../Context/User/application/verify-restore-password-request-code/UserRecoverPasswordRequestVerifier";
import { CONTAINER_TYPES } from "../../dependency-injection/types";
import { Controller } from "../Controller";

@injectable()
export class UserRecoverPasswordRequestGetController implements Controller {
  constructor(
    @inject(CONTAINER_TYPES.UserRecoverPasswordRequestVerifier)
    private verifier: UserRecoverPasswordRequestVerifier
  ) {}
  async run(
    req: Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>,
    res: Response<any, Record<string, any>>
  ): Promise<void> {
    const { code } = req.params;

    await this.verifier.run({ request_id: code });

    res.status(200).send();
  }
}
