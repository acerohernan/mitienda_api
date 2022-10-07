import { Request, Response } from "express";
import { ParamsDictionary } from "express-serve-static-core";
import httpStatus from "http-status";
import { inject, injectable } from "inversify";
import { ParsedQs } from "qs";
import { UserSessionCreator } from "../../../Context/User/application/create-user-session/UserSessionCreator";
import { CONTAINER_TYPES } from "../../dependency-injection/types";
import { Controller } from "../Controller";

@injectable()
export class UserSessionPostController implements Controller {
  constructor(
    @inject(CONTAINER_TYPES.UserSessionCreator)
    private userSessionCreator: UserSessionCreator
  ) {}

  async run(
    req: Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>,
    res: Response<any, Record<string, any>>
  ): Promise<void> {
    const { email, password } = req.body;
    let ip = req.headers["x-forwarded-for"] || req.socket.remoteAddress;

    if (typeof ip !== "string") ip = "000.000.0.00";

    const agent = req.headers["user-agent"] || "No avaliable";

    const response = await this.userSessionCreator.run({
      email,
      password,
      ip,
      agent,
    });

    res.status(httpStatus.OK).send(response);
  }
}
