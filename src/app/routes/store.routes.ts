import { Router } from "express";
import { StoreConfigPutController } from "../controllers/store/StoreConfigPutController";
import { StoreCreatePostController } from "../controllers/store/StoreCreatePostController";
import { StoreFinderGetController } from "../controllers/store/StoreFinderGetController";
import { StoreSocialPutController } from "../controllers/store/StoreSocialPutController";
import { StoreTeamPutController } from "../controllers/store/StoreTeamPutController";
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

  const storeTeamPutController = container.get<StoreTeamPutController>(
    CONTAINER_TYPES.StoreTeamPutController
  );
  router.put("/store/team", checkAuth, (req, res) =>
    storeTeamPutController.run(req, res)
  );

  const storeSocialPutController = container.get<StoreSocialPutController>(
    CONTAINER_TYPES.StoreSocialPutController
  );
  router.put("/store/social", checkAuth, (req, res) =>
    storeSocialPutController.run(req, res)
  );

  const storeConfigPutController = container.get<StoreConfigPutController>(
    CONTAINER_TYPES.StoreConfigPutController
  );
  router.put("/store/config", checkAuth, (req, res) =>
    storeConfigPutController.run(req, res)
  );
}
