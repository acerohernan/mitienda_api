import { Request, Response } from "express";
import { ParamsDictionary } from "express-serve-static-core";
import { inject, injectable } from "inversify";
import { ParsedQs } from "qs";
import { StoreInformationFinder } from "../../../Context/Store/application/find-store/StoreInformationFinder";
import { CONTAINER_TYPES } from "../../dependency-injection/types";
import { Controller } from "../Controller";

@injectable()
export class StoreFinderGetController implements Controller {
  constructor(
    @inject(CONTAINER_TYPES.StoreInformationFinder)
    private finder: StoreInformationFinder
  ) {}
  async run(
    req: Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>,
    res: Response<any, Record<string, any>>
  ): Promise<void> {
    const { user_id } = res.locals.user;

    const store = await this.finder.run({ user_id });

    res.status(200).send({ store });
  }
}
