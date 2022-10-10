import { Container } from "inversify";
import { TypeOrmEnvironmentArranger } from "../../../tests/Context/Shared/infrastructure/typeorm/TypeOrmEnvironmentArranger";
import { TypeOrmClientFactory } from "../../Context/Shared/infrastructure/persistence/typeorm/TypeOrmClientFactory";
import { UserSessionCreator } from "../../Context/User/application/create-user-session/UserSessionCreator";
import { UserCreator } from "../../Context/User/application/create-user/UserCreator";
import { UserRecoverPasswordRequestRespository } from "../../Context/User/domain/ioc/UserRecoverPasswordRequestRespository";
import { UserRepository } from "../../Context/User/domain/ioc/UserRepository";
import { TypeOrmUserSessionRepository } from "../../Context/User/infrastructure/persistence/typeorm/session/TypeOrmUserSessionRepository";
import { StatusGetController } from "../controllers/status/StatusGetController";
import { UserPostController } from "../controllers/user/UserPostController";
import { UserSessionPostController } from "../controllers/user/UserSessionPostController";

import { UserRecoverPasswordRequestCreator } from "../../Context/User/application/create-restore-password-request/UserRecoverPasswordRequestCreator";
import { UserSessionRepository } from "../../Context/User/domain/ioc/UserSessionRepository";
import { TypeOrmUserReccoverPasswordRequestRepository } from "../../Context/User/infrastructure/persistence/typeorm/recover-password/TypeOrmUserReccoverPasswordRequestRepository";
import { TypeOrmUserRepository } from "../../Context/User/infrastructure/persistence/typeorm/user/TypeOrmUserRepository";
import { UserRecoverPasswordRequestPostController } from "../controllers/user/UserRecoverPasswordRequestPostController";
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
  .bind<UserRecoverPasswordRequestRespository>(
    CONTAINER_TYPES.UserRecoverPasswordRequestRepository
  )
  .to(TypeOrmUserReccoverPasswordRequestRepository);

export default container;
