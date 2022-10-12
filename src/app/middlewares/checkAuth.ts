import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { config } from "../../Context/Shared/infrastructure/config";

export function checkAuth(req: Request, res: Response, next: NextFunction) {
  const token = req.get("authorization")?.replace("Bearer ", "");

  if (!token) return res.status(401).send({ error: "Unathorized" });

  const { decoded, expired } = decodeJwt(token);

  if (decoded) {
    const { user, session } = decoded;
    res.locals.user = { user_id: user, session_id: session };
    return next();
  }

  if (expired) {
    return res.status(401).send({ error: "Your credentials are expired" });
  }

  res.status(401).send({ error: "Unathorized" });
}

function decodeJwt(token: string): {
  decoded: any;
  expired: boolean;
  error: boolean;
} {
  try {
    const decoded = jwt.verify(token, config.jwt.secret);
    return {
      decoded,
      expired: false,
      error: false,
    };
  } catch (error: any) {
    console.log(error);
    return {
      decoded: null,
      expired: error.message === "jwt expired",
      error: true,
    };
  }
}
