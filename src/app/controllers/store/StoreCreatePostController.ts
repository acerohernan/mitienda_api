import { Request, Response } from "express";
import { ParamsDictionary } from "express-serve-static-core";
import { inject, injectable } from "inversify";
import { ParsedQs } from "qs";
import { StoreCreator } from "../../../Context/Store/application/create-store/StoreCreator";
import { CONTAINER_TYPES } from "../../dependency-injection/types";
import { Controller } from "../Controller";

@injectable()
export class StoreCreatePostController implements Controller {
  constructor(
    @inject(CONTAINER_TYPES.StoreCreator) private storeCreator: StoreCreator
  ) {}
  async run(
    req: Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>,
    res: Response<any, Record<string, any>>
  ): Promise<void> {
    const { user_id } = res.locals.user;
    const { domain, name, whatsapp, type, country_id, currency_id } = req.body;

    await this.storeCreator.run({
      domain,
      name,
      country_id,
      currency_id,
      type,
      user_id,
      whatsapp,
    });
    res.status(201).send();
  }
}
