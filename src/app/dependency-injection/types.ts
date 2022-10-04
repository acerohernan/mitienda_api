import { TenanCreator } from "../../Context/Tenant/application/TenanCreator";

export const CONTAINER_TYPES = {
  /* Controllers */

  /**
   * StatusGetController
   * @author acerohernan
   */
  StatusGetController: Symbol.for("StatusGetController"),

  /**
   * TenantPostController
   * @param {TenanCreator} tenantCreator
   * @author acerohernan
   */
  TenantPostController: Symbol.for("TenantPostController"),
};
