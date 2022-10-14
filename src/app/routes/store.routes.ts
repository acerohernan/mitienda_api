import { Router } from "express";
import { StoreCreatePostController } from "../controllers/store/StoreCreatePostController";
import { StoreFinderGetController } from "../controllers/store/StoreFinderGetController";
import { StoreUpdatePutController } from "../controllers/store/StoreUpdatePutController";
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

  const storeFinderGetController = container.get<StoreFinderGetController>(
    CONTAINER_TYPES.StoreFinderGetController
  );
  router.get("/store/information", checkAuth, (req, res) =>
    storeFinderGetController.run(req, res)
  );

  const storeUpdatePutController = container.get<StoreUpdatePutController>(
    CONTAINER_TYPES.StoreUpdatePutController
  );
  router.put("/store/information", checkAuth, (req, res) =>
    storeUpdatePutController.run(req, res)
  );
}
