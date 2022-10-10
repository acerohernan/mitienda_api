import { Router } from "express";
import { UserPostController } from "../controllers/user/UserPostController";
import { UserRecoverPasswordRequestPostController } from "../controllers/user/UserRecoverPasswordRequestPostController";
import { UserSessionPostController } from "../controllers/user/UserSessionPostController";
import container from "../dependency-injection";
import { CONTAINER_TYPES } from "../dependency-injection/types";

export function register(router: Router) {
  const userPostController = container.get<UserPostController>(
    CONTAINER_TYPES.UserPostController
  );
  router.post("/user/auth/signup", (req, res) =>
    userPostController.run(req, res)
  );

  const userSessionPostController = container.get<UserSessionPostController>(
    CONTAINER_TYPES.UserSessionPostController
  );
  router.post("/user/auth/login", (req, res) =>
    userSessionPostController.run(req, res)
  );

  const userRecoverPasswordRequestPostController =
    container.get<UserRecoverPasswordRequestPostController>(
      CONTAINER_TYPES.UserRecoverPasswordRequestPostController
    );
  router.post("/user/auth/forgot-password", (req, res) =>
    userRecoverPasswordRequestPostController.run(req, res)
  );
}
