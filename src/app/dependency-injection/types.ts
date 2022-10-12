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

  /**
   * UserRecoverPasswordRequestPostController
   * @param {UserRecoverPasswordRequestCreator} userRecoverPasswordRequestCreator
   * @author acerohernan
   */
  UserRecoverPasswordRequestPostController: Symbol.for(
    "UserRecoverPasswordRequestPostController"
  ),

  /**
   * UserRecoverPasswordRequestGetController
   * @param {UserRecoverPasswordRequestVerifier} userRecoverPasswordRequestVerifier
   * @author acerohernan
   */
  UserRecoverPasswordRequestGetController: Symbol.for(
    "UserRecoverPasswordRequestGetController"
  ),

  /**
   * UserRestorePasswordPostController
   * @param {UserPasswordRestorer} userPasswordRestorer
   * @author acerohernan
   */
  UserRestorePasswordPostController: Symbol.for(
    "UserRestorePasswordPostController"
  ),

  /**
   * UserSessionCloserPostController
   * @param {UserSessionDeleter} userSessionDeleter
   * @author acerohernan
   */
  UserSessionCloserPostController: Symbol.for(
    "UserSessionCloserPostController"
  ),

  /**
   * UserSessionGetController
   * @param {UserSessionGetter} userSessionGetter
   * @author acerohernan
   */
  UserSessionGetController: Symbol.for("UserSessionGetController"),

  /* APPLICATION SERVICES */

  /**
   * UserCreator
   * @param {UserRepository} userRepository
   * @author acerohernan
   */
  UserCreator: Symbol.for("UserCreator"),

  /**
   * UserSessionCreator
   * @param {UserRepository} userRepository
   * @param {UserSessionRepository} userSessionRepository
   * @author acerohernan
   */
  UserSessionCreator: Symbol.for("UserSessionCreator"),

  /**
   * UserRecoverPasswordRequestCreator
   * @param {UserRepository} userRepository
   * @param {UserRecoverPasswordRequestRespository} userRecoverPasswordRequestRespository
   * @author acerohernan
   */
  UserRecoverPasswordRequestCreator: Symbol.for(
    "UserRecoverPasswordRequestCreator"
  ),

  /**
   * UserRecoverPasswordRequestVerifier
   * @param {UserRecoverPasswordRequestRespository} repository
   * @author acerohernan
   */
  UserRecoverPasswordRequestVerifier: Symbol.for(
    "UserRecoverPasswordRequestVerifier"
  ),

  /**
   * UserPasswordRestorer
   * @param {UserRecoverPasswordRequestRespository} repository
   * @author acerohernan
   */
  UserPasswordRestorer: Symbol.for("UserPasswordRestorer"),

  /**
   * UserSessionDeleter
   * @param {UserSessionRepository} repository
   * @author acerohernan
   */
  UserSessionDeleter: Symbol.for("UserSessionDeleter"),

  /**
   * UserSessionGetter
   * @param {UserSessionRepository} sessionRepository
   * @param {UserRepository} userRespository
   * @author acerohernan
   */
  UserSessionGetter: Symbol.for("UserSessionGetter"),

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

  /**
   * UserRecoverPasswordRequestRepository
   * @author acerohernan
   */
  UserRecoverPasswordRequestRepository: Symbol.for(
    "UserRecoverPasswordRequestRepository"
  ),
};
