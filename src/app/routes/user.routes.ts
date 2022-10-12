import { Router } from "express";
import { UserPostController } from "../controllers/user/UserPostController";
import { UserRecoverPasswordRequestGetController } from "../controllers/user/UserRecoverPasswordRequestGetController";
import { UserRecoverPasswordRequestPostController } from "../controllers/user/UserRecoverPasswordRequestPostController";
import { UserRestorePasswordPostController } from "../controllers/user/UserRestorePasswordPostController";
import { UserSessionCloserPostController } from "../controllers/user/UserSessionCloserPostController";
import { UserSessionGetController } from "../controllers/user/UserSessionGetController";
import { UserSessionPostController } from "../controllers/user/UserSessionPostController";
import container from "../dependency-injection";
import { CONTAINER_TYPES } from "../dependency-injection/types";
import { checkAuth } from "../middlewares/checkAuth";

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

  const userRecoverPasswordRequestGetController =
    container.get<UserRecoverPasswordRequestGetController>(
      CONTAINER_TYPES.UserRecoverPasswordRequestGetController
    );
  router.get("/user/auth/verify-code/:code", (req, res) =>
    userRecoverPasswordRequestGetController.run(req, res)
  );

  const userRestorePasswordPostController =
    container.get<UserRestorePasswordPostController>(
      CONTAINER_TYPES.UserRestorePasswordPostController
    );
  router.post("/user/auth/restore-password", (req, res) =>
    userRestorePasswordPostController.run(req, res)
  );

  const userSessionCloserPostController =
    container.get<UserSessionCloserPostController>(
      CONTAINER_TYPES.UserSessionCloserPostController
    );
  router.post("/user/auth/logout", checkAuth, (req, res) =>
    userSessionCloserPostController.run(req, res)
  );

  const userSessionGetController = container.get<UserSessionGetController>(
    CONTAINER_TYPES.UserSessionGetController
  );
  router.get("/user/auth/session", checkAuth, (req, res) =>
    userSessionGetController.run(req, res)
  );
}
