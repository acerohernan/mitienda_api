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

  /**
   * StoreCreatePostController
   * @param {StoreCreator} storeCreator
   * @author acerohernan
   */
  StoreCreatePostController: Symbol.for("StoreCreatePostController"),

  /**
   * StoreFinderGetController
   * @param {StoreInformationFinder} storeInformationFinder
   * @author acerohernan
   */
  StoreFinderGetController: Symbol.for("StoreFinderGetController"),

  /**
   * StoreUpdatePutController
   * @param {StoreUpdater} updater
   * @author acerohernan
   */
  StoreUpdatePutController: Symbol.for("StoreUpdatePutController"),

  /**
   * StoreTeamPutController
   * @param {StoreTeamUpdater} updater
   * @author acerohernan
   */
  StoreTeamPutController: Symbol.for("StoreTeamPutController"),

  /**
   * StoreSocialPutController
   * @param {StoreSocialUpdater} updater
   * @author acerohernan
   */
  StoreSocialPutController: Symbol.for("StoreSocialPutController"),

  /**
   * StoreConfigPutController
   * @param {StoreConfiglUpdater} updater
   * @author acerohernan
   */
  StoreConfigPutController: Symbol.for("StoreConfigPutController"),

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

  /**
   * StoreCreator
   * @param {StoreRepository} repository
   * @param {StoreTeamRepository} teamRepository
   * @param {StoreConfigRepository} configRepository
   * @param {StoreSocialRepository} socialRepository
   * @author acerohernan
   */
  StoreCreator: Symbol.for("StoreCreator"),

  /**
   * StoreInformationFinder
   * @param {StoreRepository} repository
   * @param {StoreTeamRepository} teamRepository
   * @param {StoreConfigRepository} configRepository
   * @param {StoreSocialRepository} socialRepository
   * @author acerohernan
   */
  StoreInformationFinder: Symbol.for("StoreInformationFinder"),

  /**
   * StoreUpdater
   * @param {StoreRepository} repository
   * @author acerohernan
   */
  StoreUpdater: Symbol.for("StoreUpdater"),

  /**
   * StoreTeamUpdater
   * @param {StoreRepository} repository
   * @param {StoreTeamRepository} teamRepository
   * @author acerohernan
   */
  StoreTeamUpdater: Symbol.for("StoreTeamUpdater"),

  /**
   * StoreSocialUpdater
   * @param {StoreRepository} repository
   * @param {StoreSocialRepository} socialRepository
   * @author acerohernan
   */
  StoreSocialUpdater: Symbol.for("StoreSocialUpdater"),

  /**
   * StoreConfigUpdater
   * @param {StoreRepository} repository
   * @param {StoreConfigRepository} configRepository
   * @author acerohernan
   */
  StoreConfigUpdater: Symbol.for("StoreConfigUpdater"),

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

  /**
   * StoreRepository
   * @author acerohernan
   */
  StoreRepository: Symbol.for("StoreRepository"),

  /**
   * StoreTeamRepository
   * @author acerohernan
   */
  StoreTeamRepository: Symbol.for("StoreTeamRepository"),

  /**
   * StoreConfigRepository
   * @author acerohernan
   */
  StoreConfigRepository: Symbol.for("StoreConfigRepository"),

  /**
   * StoreSocialRepository
   * @author acerohernan
   */
  StoreSocialRepository: Symbol.for("StoreSocialRepository"),
};
