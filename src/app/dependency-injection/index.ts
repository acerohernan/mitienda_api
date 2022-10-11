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

import { UserRecoverPasswordRequestCreator } from "../../Context/User/application/create-restore-password-request/UserRecoverPasswordRequestCreator";
import { UserPasswordRestorer } from "../../Context/User/application/restore-user-password/UserPasswordRestorer";
import { UserRecoverPasswordRequestVerifier } from "../../Context/User/application/verify-restore-password-request-code/UserRecoverPasswordRequestVerifier";
import { UserSessionRepository } from "../../Context/User/domain/ioc/UserSessionRepository";
import { TypeOrmUserReccoverPasswordRequestRepository } from "../../Context/User/infrastructure/persistence/typeorm/recover-password/TypeOrmUserReccoverPasswordRequestRepository";
import { TypeOrmUserRepository } from "../../Context/User/infrastructure/persistence/typeorm/user/TypeOrmUserRepository";
import { UserRecoverPasswordRequestGetController } from "../controllers/user/UserRecoverPasswordRequestGetController";
import { UserRecoverPasswordRequestPostController } from "../controllers/user/UserRecoverPasswordRequestPostController";
import { UserRestorePasswordPostController } from "../controllers/user/UserRestorePasswordPostController";
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
 * @param {UserRecoverPasswordRequestRespository} respository
 * @author acerohernan
 */
container
  .bind<UserRecoverPasswordRequestVerifier>(
    CONTAINER_TYPES.UserRecoverPasswordRequestVerifier
  )
  .to(UserRecoverPasswordRequestVerifier);

/**
 * @param {UserRecoverPasswordRequestRespository} respository
 * @author acerohernan
 */
container
  .bind<UserPasswordRestorer>(CONTAINER_TYPES.UserPasswordRestorer)
  .to(UserPasswordRestorer);

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

export default container;
