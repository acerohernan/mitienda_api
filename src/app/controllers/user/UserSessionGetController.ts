import { Request, Response } from "express";
import { ParamsDictionary } from "express-serve-static-core";
import { inject, injectable } from "inversify";
import { ParsedQs } from "qs";
import { UserSessionGetter } from "../../../Context/User/application/get-user-session/UserSessionGetter";
import { CONTAINER_TYPES } from "../../dependency-injection/types";
import { Controller } from "../Controller";

@injectable()
export class UserSessionGetController implements Controller {
  constructor(
    @inject(CONTAINER_TYPES.UserSessionGetter) private getter: UserSessionGetter
  ) {}
  async run(
    req: Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>,
    res: Response<any, Record<string, any>>
  ): Promise<void> {
    const { user_id, session_id } = res.locals.user;

    const session = await this.getter.run({ user_id, session_id });

    res.status(200).send(session);
  }
}
