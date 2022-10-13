import { Router } from "express";
import { StoreCreatePostController } from "../controllers/store/StoreCreatePostController";
import container from "../dependency-injection";
import { CONTAINER_TYPES } from "../dependency-injection/types";
import { checkAuth } from "../middlewares/checkAuth";

export function register(router: Router) {
  const storeCreatePostController = container.get<StoreCreatePostController>(
    CONTAINER_TYPES.StoreCreatePostController
  );
  router.post("/store/create", checkAuth, (req, res) =>
    storeCreatePostController.run(req, res)
  );
}
