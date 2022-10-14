import { Request, Response } from "express";
import { ParamsDictionary } from "express-serve-static-core";
import { inject, injectable } from "inversify";
import { ParsedQs } from "qs";
import { StoreSocialUpdater } from "../../../Context/Store/application/update-store-social/StoreSocialUpdater";
import { CONTAINER_TYPES } from "../../dependency-injection/types";
import { Controller } from "../Controller";

@injectable()
export class StoreSocialPutController implements Controller {
  constructor(
    @inject(CONTAINER_TYPES.StoreSocialUpdater)
    private updater: StoreSocialUpdater
  ) {}
  async run(
    req: Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>,
    res: Response<any, Record<string, any>>
  ): Promise<void> {
    const { user_id } = res.locals.user;
    const {
      facebook,
      instagram,
      linkedin,
      pinterest,
      tiktok,
      twitter,
      youtube,
    } = req.body;

    await this.updater.run({
      user_id,
      facebook,
      instagram,
      linkedin,
      pinterest,
      tiktok,
      twitter,
      youtube,
    });

    res.status(200).send();
  }
}
