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

  /**
   * @param {UserRepository} userRepository
   * @param {UserRecoverPasswordRequestRespository} userRecoverPasswordRequestRespository
   * @author acerohernan
   */
  UserRecoverPasswordRequestCreator: Symbol.for(
    "UserRecoverPasswordRequestCreator"
  ),

  /**
   * @param {UserRecoverPasswordRequestRespository} respository
   * @author acerohernan
   */
  UserRecoverPasswordRequestVerifier: Symbol.for(
    "UserRecoverPasswordRequestVerifier"
  ),

  /**
   * @param {UserRecoverPasswordRequestRespository} respository
   * @author acerohernan
   */
  UserPasswordRestorer: Symbol.for("UserPasswordRestorer"),

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
