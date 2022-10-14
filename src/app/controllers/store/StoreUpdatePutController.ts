import { Request, Response } from "express";
import { ParamsDictionary } from "express-serve-static-core";
import { inject, injectable } from "inversify";
import { ParsedQs } from "qs";
import { StoreUpdater } from "../../../Context/Store/application/update-store/StoreUpdater";
import { CONTAINER_TYPES } from "../../dependency-injection/types";
import { Controller } from "../Controller";

@injectable()
export class StoreUpdatePutController implements Controller {
  constructor(
    @inject(CONTAINER_TYPES.StoreUpdater) private updater: StoreUpdater
  ) {}
  async run(
    req: Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>,
    res: Response<any, Record<string, any>>
  ): Promise<void> {
    const { user_id } = res.locals.user;
    const { name, currency_id, type, whatsapp } = req.body;

    await this.updater.run({
      user_id,
      name,
      currency_id,
      type,
      whatsapp,
    });

    res.status(200).send();
  }
}
