import { Container } from "inversify";
import { TenanCreator } from "../../Context/Tenant/application/TenanCreator";
import { StatusGetController } from "../controllers/status/StatusGetController";
import { TenantPostController } from "../controllers/tenant/TenantPostController";
import { CONTAINER_TYPES } from "./types";

const container = new Container();

/* Controllers */

/**
 * StatusGetController
 * @author acerohernan
 */
container
  .bind<StatusGetController>(CONTAINER_TYPES.StatusGetController)
  .to(StatusGetController);

/**
 * TenantPostController
 * @param {TenanCreator} tenantCreator
 * @author acerohernan
 */
container
  .bind<TenantPostController>(CONTAINER_TYPES.TenantPostController)
  .to(TenantPostController);

/* Application Services */

/* Infraestrcuture */

export default container;
