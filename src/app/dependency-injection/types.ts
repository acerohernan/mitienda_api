export const CONTAINER_TYPES = {
  /* CONTROLLERS */

  /**
   * StatusGetController
   * @author acerohernan
   */
  StatusGetController: Symbol.for("StatusGetController"),

  /* APPLICATION SERVICES */
  /**
   * @param {UserRepository} userRepository
   * @author acerohernan
   */
  UserCreator: Symbol.for("UserCreator"),

  /* INFRAESTRUCTURE */

  /**
   * PersistenceClientFactory
   * @author acerohernan
   */
  PersistenceClientFactory: Symbol.for("PersistenceClientFactory"),

  /**
   * UserRepository
   * @author acerohernan
   */
  UserRepository: Symbol.for("UserRepository"),
};
