import { Request, Response } from "express";
import { ParamsDictionary } from "express-serve-static-core";
import { inject, injectable } from "inversify";
import { ParsedQs } from "qs";
import { StoreTeamUpdater } from "../../../Context/Store/application/update-store-team/StoreTeamUpdater";
import { CONTAINER_TYPES } from "../../dependency-injection/types";
import { Controller } from "../Controller";

@injectable()
export class StoreTeamPutController implements Controller {
  constructor(
    @inject(CONTAINER_TYPES.StoreTeamUpdater) private updater: StoreTeamUpdater
  ) {}
  async run(
    req: Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>,
    res: Response<any, Record<string, any>>
  ): Promise<void> {
    const { user_id } = res.locals.user;
    const { description, img, video_link } = req.body;

    await this.updater.run({
      user_id,
      description,
      img,
      video_link,
    });
    res.status(200).send();
  }
}
