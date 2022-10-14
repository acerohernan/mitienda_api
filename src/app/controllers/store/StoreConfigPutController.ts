import { Request, Response } from "express";
import { ParamsDictionary } from "express-serve-static-core";
import { inject, injectable } from "inversify";
import { ParsedQs } from "qs";
import { StoreConfigUpdater } from "../../../Context/Store/application/update-store-config/StoreConfigUpdater";
import { CONTAINER_TYPES } from "../../dependency-injection/types";
import { Controller } from "../Controller";

@injectable()
export class StoreConfigPutController implements Controller {
  constructor(
    @inject(CONTAINER_TYPES.StoreConfigUpdater)
    private updater: StoreConfigUpdater
  ) {}
  async run(
    req: Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>,
    res: Response<any, Record<string, any>>
  ): Promise<void> {
    const { user_id } = res.locals.user;
    const { add_comment, add_delivery_date, comment, request_dni } = req.body;

    await this.updater.run({
      user_id,
      add_comment,
      add_delivery_date,
      comment,
      request_dni,
    });

    res.status(200).send();
  }
}
