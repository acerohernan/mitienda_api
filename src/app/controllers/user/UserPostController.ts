import { Request, Response } from "express";
import { ParamsDictionary } from "express-serve-static-core";
import { inject, injectable } from "inversify";
import { ParsedQs } from "qs";
import { UserCreator } from "../../../Context/User/application/create-user/UserCreator";
import { CONTAINER_TYPES } from "../../dependency-injection/types";
import { Controller } from "../Controller";

@injectable()
export class UserPostController implements Controller {
  constructor(
    @inject(CONTAINER_TYPES.UserCreator) private userCreator: UserCreator
  ) {}
  async run(
    req: Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>,
    res: Response<any, Record<string, any>>
  ): Promise<void> {
    const { email, password, phone } = req.body;
    await this.userCreator.run({ email, password, phone });
    res.status(201).send();
  }
}
