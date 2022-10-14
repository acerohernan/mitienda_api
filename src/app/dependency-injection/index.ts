import { Container } from "inversify";
import { TypeOrmEnvironmentArranger } from "../../../tests/Context/Shared/infrastructure/typeorm/TypeOrmEnvironmentArranger";
import { TypeOrmClientFactory } from "../../Context/Shared/infrastructure/persistence/typeorm/TypeOrmClientFactory";
import { UserSessionCreator } from "../../Context/User/application/create-user-session/UserSessionCreator";
import { UserCreator } from "../../Context/User/application/create-user/UserCreator";
import { UserRecoverPasswordRequestRepository } from "../../Context/User/domain/ioc/UserRecoverPasswordRequestRepository";
import { UserRepository } from "../../Context/User/domain/ioc/UserRepository";
import { TypeOrmUserSessionRepository } from "../../Context/User/infrastructure/persistence/typeorm/session/TypeOrmUserSessionRepository";
import { StatusGetController } from "../controllers/status/StatusGetController";
import { UserPostController } from "../controllers/user/UserPostController";
import { UserSessionPostController } from "../controllers/user/UserSessionPostController";

import { StoreCreator } from "../../Context/Store/application/create-store/StoreCreator";
import { StoreInformationFinder } from "../../Context/Store/application/find-store/StoreInformationFinder";
import { StoreConfigUpdater } from "../../Context/Store/application/update-store-config/StoreConfigUpdater";
import { StoreSocialUpdater } from "../../Context/Store/application/update-store-social/StoreSocialUpdater";
import { StoreTeamUpdater } from "../../Context/Store/application/update-store-team/StoreTeamUpdater";
import { StoreUpdater } from "../../Context/Store/application/update-store/StoreUpdater";
import { StoreConfigRepository } from "../../Context/Store/domain/ioc/StoreConfigRepository";
import { StoreRepository } from "../../Context/Store/domain/ioc/StoreRepository";
import { StoreSocialRepository } from "../../Context/Store/domain/ioc/StoreSocialRepository";
import { StoreTeamRepository } from "../../Context/Store/domain/ioc/StoreTeamRepository";
import { TypeOrmStoreConfigRepository } from "../../Context/Store/infrastructure/persistence/typeorm/store-config/TypeOrmStoreConfigRepository";
import { TypeOrmStoreSocialRepository } from "../../Context/Store/infrastructure/persistence/typeorm/store-social/TypeOrmStoreSocialRepository";
import { TypeOrmStoreTeamRepository } from "../../Context/Store/infrastructure/persistence/typeorm/store-team/TypeOrmStoreTeamRepository";
import { TypeOrmStoreRepository } from "../../Context/Store/infrastructure/persistence/typeorm/store/TypeOrmStoreRepository";
import { UserRecoverPasswordRequestCreator } from "../../Context/User/application/create-restore-password-request/UserRecoverPasswordRequestCreator";
import { UserSessionDeleter } from "../../Context/User/application/delete-user-session/UserSessionDeleter";
import { UserSessionGetter } from "../../Context/User/application/get-user-session/UserSessionGetter";
import { UserPasswordRestorer } from "../../Context/User/application/restore-user-password/UserPasswordRestorer";
import { UserRecoverPasswordRequestVerifier } from "../../Context/User/application/verify-restore-password-request-code/UserRecoverPasswordRequestVerifier";
import { UserSessionRepository } from "../../Context/User/domain/ioc/UserSessionRepository";
import { TypeOrmUserReccoverPasswordRequestRepository } from "../../Context/User/infrastructure/persistence/typeorm/recover-password/TypeOrmUserReccoverPasswordRequestRepository";
import { TypeOrmUserRepository } from "../../Context/User/infrastructure/persistence/typeorm/user/TypeOrmUserRepository";
import { StoreConfigPutController } from "../controllers/store/StoreConfigPutController";
import { StoreCreatePostController } from "../controllers/store/StoreCreatePostController";
import { StoreFinderGetController } from "../controllers/store/StoreFinderGetController";
import { StoreSocialPutController } from "../controllers/store/StoreSocialPutController";
import { StoreTeamPutController } from "../controllers/store/StoreTeamPutController";
import { StoreUpdatePutController } from "../controllers/store/StoreUpdatePutController";
import { UserRecoverPasswordRequestGetController } from "../controllers/user/UserRecoverPasswordRequestGetController";
import { UserRecoverPasswordRequestPostController } from "../controllers/user/UserRecoverPasswordRequestPostController";
import { UserRestorePasswordPostController } from "../controllers/user/UserRestorePasswordPostController";
import { UserSessionCloserPostController } from "../controllers/user/UserSessionCloserPostController";
import { UserSessionGetController } from "../controllers/user/UserSessionGetController";
import { CONTAINER_TYPES } from "./types";

const container = new Container();

/* CONTROLLERS */

/**
 * StatusGetController
 * @author acerohernan
 */
container
  .bind<StatusGetController>(CONTAINER_TYPES.StatusGetController)
  .to(StatusGetController);

/**
 * UserPostController
 * @param {UserCreator} userCreator
 * @author acerohernan
 */
container
  .bind<UserPostController>(CONTAINER_TYPES.UserPostController)
  .to(UserPostController);

/**
 * UserSessionPostController
 * @param {UserSessionCreator} UserSessionCreator
 * @author acerohernan
 */
container
  .bind<UserSessionPostController>(CONTAINER_TYPES.UserSessionPostController)
  .to(UserSessionPostController);

/**
 * UserRecoverPasswordRequestPostController
 * @param {UserRecoverPasswordRequestCreator} userRecoverPasswordRequestCreator
 * @author acerohernan
 */
container
  .bind<UserRecoverPasswordRequestPostController>(
    CONTAINER_TYPES.UserRecoverPasswordRequestPostController
  )
  .to(UserRecoverPasswordRequestPostController);

/**
 * UserRecoverPasswordRequestGetController
 * @param {UserRecoverPasswordRequestVerifier} userRecoverPasswordRequestVerifier
 * @author acerohernan
 */
container
  .bind<UserRecoverPasswordRequestGetController>(
    CONTAINER_TYPES.UserRecoverPasswordRequestGetController
  )
  .to(UserRecoverPasswordRequestGetController);

/**
 * UserRestorePasswordPostController
 * @param {UserPasswordRestorer} userPasswordRestorer
 * @author acerohernan
 */
container
  .bind<UserRestorePasswordPostController>(
    CONTAINER_TYPES.UserRestorePasswordPostController
  )
  .to(UserRestorePasswordPostController);

/**
 * UserSessionPostController
 * @param {UserSessionDeleter} userSessionDeleter
 * @author acerohernan
 */
container
  .bind<UserSessionCloserPostController>(
    CONTAINER_TYPES.UserSessionCloserPostController
  )
  .to(UserSessionCloserPostController);

/**
 * UserSessionGetController
 * @param {UserSessionGetter} userSessionGetter
 * @author acerohernan
 */
container
  .bind(CONTAINER_TYPES.UserSessionGetController)
  .to(UserSessionGetController);

/**
 *
 * @param {StoreCreator} StoreCreator
 * @author acerohernan
 */
container
  .bind<StoreCreatePostController>(CONTAINER_TYPES.StoreCreatePostController)
  .to(StoreCreatePostController);

/**
 * StoreFinderGetController
 * @param {StoreInformationFinder} storeInformationFinder
 * @author acerohernan
 */
container
  .bind<StoreFinderGetController>(CONTAINER_TYPES.StoreFinderGetController)
  .to(StoreFinderGetController);

/**
 * StoreUpdatePutController
 * @param {StoreUpdater} repository
 * @author acerohernan
 */
container
  .bind<StoreUpdatePutController>(CONTAINER_TYPES.StoreUpdatePutController)
  .to(StoreUpdatePutController);

/**
 * StoreTeamPutController
 * @param {StoreTeamUpdater} updater
 * @author acerohernan
 */
container
  .bind<StoreTeamPutController>(CONTAINER_TYPES.StoreTeamPutController)
  .to(StoreTeamPutController);

/**
 * StoreSocialPutController
 * @param {StoreSocialUpdater} updater
 * @author acerohernan
 */
container
  .bind<StoreSocialPutController>(CONTAINER_TYPES.StoreSocialPutController)
  .to(StoreSocialPutController);

/**
 * StoreConfigPutController
 * @param {StoreConfiglUpdater} updater
 * @author acerohernan
 */
container
  .bind<StoreConfigPutController>(CONTAINER_TYPES.StoreConfigPutController)
  .to(StoreConfigPutController);

/* APPLICATION SERVICES */
/**
 * UserCreator
 * @param {UserRepository} userRepository
 * @author acerohernan
 */
container.bind<UserCreator>(CONTAINER_TYPES.UserCreator).to(UserCreator);

/**
 * UserSessionCreator
 * @param {UserRepository} userRepository
 * @param {UserSessionRepository} userSessionRepository
 * @author acerohernan
 */
container
  .bind<UserSessionCreator>(CONTAINER_TYPES.UserSessionCreator)
  .to(UserSessionCreator);

/**
 * UserRecoverPasswordRequestCreator
 * @param {UserRepository} userRepository
 * @param {UserRecoverPasswordRequestRepository} userRecoverPasswordRequestRepository
 * @author acerohernan
 */
container
  .bind<UserRecoverPasswordRequestCreator>(
    CONTAINER_TYPES.UserRecoverPasswordRequestCreator
  )
  .to(UserRecoverPasswordRequestCreator);

/**
 * UserRecoverPasswordRequestVerifier
 * @param {UserRecoverPasswordRequestRespository} respository
 * @author acerohernan
 */
container
  .bind<UserRecoverPasswordRequestVerifier>(
    CONTAINER_TYPES.UserRecoverPasswordRequestVerifier
  )
  .to(UserRecoverPasswordRequestVerifier);

/**
 * UserPasswordRestorer
 * @param {UserRecoverPasswordRequestRespository} respository
 * @author acerohernan
 */
container
  .bind<UserPasswordRestorer>(CONTAINER_TYPES.UserPasswordRestorer)
  .to(UserPasswordRestorer);

/**
 * UserSessionDeleter
 * @param {UserSessionRepository} repository
 * @author acerohernan
 */
container
  .bind<UserSessionDeleter>(CONTAINER_TYPES.UserSessionDeleter)
  .to(UserSessionDeleter);

/**
 * UserSessionGetter
 * @param {UserSessionRepository} sessionRepository
 * @param {UserRepository} userRespository
 * @author acerohernan
 */
container
  .bind<UserSessionGetter>(CONTAINER_TYPES.UserSessionGetter)
  .to(UserSessionGetter);

/**
 * StoreCreator
 * @param {StoreRepository} repository
 * @param {StoreTeamRepository} teamRepository
 * @param {StoreConfigRepository} configRepository
 * @param {StoreSocialRepository} socialRepository
 * @author acerohernan
 */
container.bind<StoreCreator>(CONTAINER_TYPES.StoreCreator).to(StoreCreator);

/**
 * StoreInformationFinder
 * @param {StoreRepository} repository
 * @param {StoreTeamRepository} teamRepository
 * @param {StoreConfigRepository} configRepository
 * @param {StoreSocialRepository} socialRepository
 * @author acerohernan
 */
container
  .bind<StoreInformationFinder>(CONTAINER_TYPES.StoreInformationFinder)
  .to(StoreInformationFinder);

/**
 * StoreUpdater
 * @param {StoreRepository} repository
 * @author acerohernan
 */
container.bind<StoreUpdater>(CONTAINER_TYPES.StoreUpdater).to(StoreUpdater);

/**
 * StoreTeamUpdater
 * @param {StoreRepository} repository
 * @param {StoreTeamRepository} teamRepository
 * @author acerohernan
 */
container
  .bind<StoreTeamUpdater>(CONTAINER_TYPES.StoreTeamUpdater)
  .to(StoreTeamUpdater);

/**
 * StoreSocialUpdater
 * @param {StoreRepository} repository
 * @param {StoreSocialRepository} socialRepository
 * @author acerohernan
 */
container
  .bind<StoreSocialUpdater>(CONTAINER_TYPES.StoreSocialUpdater)
  .to(StoreSocialUpdater);

/**
 * StoreConfigUpdater
 * @param {StoreRepository} repository
 * @param {StoreConfigRepository} configRepository
 * @author acerohernan
 */
container
  .bind<StoreConfigUpdater>(CONTAINER_TYPES.StoreConfigUpdater)
  .to(StoreConfigUpdater);

/* INFRASTRUCTURE */

/**
 * PersistenceClientFactory
 * @author acerohernan
 */
container
  .bind(CONTAINER_TYPES.PersistenceClientFactory)
  .to(TypeOrmClientFactory);

/**
 * EnvironmentArranger
 * @author acerohernan
 */
container
  .bind(CONTAINER_TYPES.EnvironmentArranger)
  .to(TypeOrmEnvironmentArranger);

/**
 * UserRepository
 * @author acerohernan
 */
container
  .bind<UserRepository>(CONTAINER_TYPES.UserRepository)
  .to(TypeOrmUserRepository);

/**
 * UserSessionRespoitory
 * @author acerohernan
 */
container
  .bind<UserSessionRepository>(CONTAINER_TYPES.UserSessionRepository)
  .to(TypeOrmUserSessionRepository);

/**
 * UserRecoverPasswordRequestRespository
 * @author acerohernan
 */
container
  .bind<UserRecoverPasswordRequestRepository>(
    CONTAINER_TYPES.UserRecoverPasswordRequestRepository
  )
  .to(TypeOrmUserReccoverPasswordRequestRepository);

/**
 * StoreRepository
 * @author acerohernan
 */
container
  .bind<StoreRepository>(CONTAINER_TYPES.StoreRepository)
  .to(TypeOrmStoreRepository);

/**
 * StoreTeamRepository
 * @author acerohernan
 */
container
  .bind<StoreTeamRepository>(CONTAINER_TYPES.StoreTeamRepository)
  .to(TypeOrmStoreTeamRepository);

/**
 * StoreConfigRepository
 * @author acerohernan
 */
container
  .bind<StoreConfigRepository>(CONTAINER_TYPES.StoreConfigRepository)
  .to(TypeOrmStoreConfigRepository);

/**
 * StoreSocialRepository
 * @author acerohernan
 */
container
  .bind<StoreSocialRepository>(CONTAINER_TYPES.StoreSocialRepository)
  .to(TypeOrmStoreSocialRepository);

export default container;
