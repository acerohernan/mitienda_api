export const CONTAINER_TYPES = {
  /* CONTROLLERS */

  /**
   * StatusGetController
   * @author acerohernan
   */
  StatusGetController: Symbol.for("StatusGetController"),

  /**
   * UserPostController
   * @param {UserCreator} userCreator
   * @author acerohernan
   */
  UserPostController: Symbol.for("UserPostController"),

  /**
   * UserSessionPostController
   * @param {UserSessionCreator} UserSessionCreator
   * @author acerohernan
   */
  UserSessionPostController: Symbol.for("UserSessionPostController"),

  /* APPLICATION SERVICES */
  /**
   * @param {UserRepository} userRepository
   * @author acerohernan
   */
  UserCreator: Symbol.for("UserCreator"),

  /**
   * @param {UserRepository} userRepository
   * @param {UserSessionRepository} userSessionRepository
   * @author acerohernan
   */
  UserSessionCreator: Symbol.for("UserSessionCreator"),

  /* INFRAESTRUCTURE */

  /**
   * PersistenceClientFactory
   * @author acerohernan
   */
  PersistenceClientFactory: Symbol.for("PersistenceClientFactory"),

  /**
   * EnvironmentArranger
   * @author acerohernan
   */
  EnvironmentArranger: Symbol.for("EnvironmentArranger"),

  /**
   * UserRepository
   * @author acerohernan
   */
  UserRepository: Symbol.for("UserRepository"),

  /**
   * UserSessionRepository
   * @author acerohernan
   */
  UserSessionRepository: Symbol.for("UserSessionRepository"),
};
