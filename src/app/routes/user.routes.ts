import { Router } from "express";
import { UserPostController } from "../controllers/user/UserPostController";
import container from "../dependency-injection";
import { CONTAINER_TYPES } from "../dependency-injection/types";

export function register(router: Router) {
  const userPostController = container.get<UserPostController>(
    CONTAINER_TYPES.UserPostController
  );
  router.post("/user/signup", (req, res) => userPostController.run(req, res));
}
