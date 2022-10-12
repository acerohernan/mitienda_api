import { Request, Response } from "express";
import { ParamsDictionary } from "express-serve-static-core";
import { inject, injectable } from "inversify";
import { ParsedQs } from "qs";
import { UserSessionDeleter } from "../../../Context/User/application/delete-user-session/UserSessionDeleter";
import { CONTAINER_TYPES } from "../../dependency-injection/types";
import { Controller } from "../Controller";

@injectable()
export class UserSessionCloserPostController implements Controller {
  constructor(
    @inject(CONTAINER_TYPES.UserSessionDeleter)
    private deleter: UserSessionDeleter
  ) {}

  async run(
    req: Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>,
    res: Response<any, Record<string, any>>
  ): Promise<void> {
    const { user_id, session_id } = res.locals.user;

    await this.deleter.run({ user_id, session_id });

    res.status(200).send();
  }
}
