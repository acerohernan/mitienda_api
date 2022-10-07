import { Container } from "inversify";
import { TypeOrmClientFactory } from "../../Context/Shared/infrastructure/persistence/typeorm/TypeOrmClientFactory";
import { UserSessionCreator } from "../../Context/User/application/create-user-session/UserSessionCreator";
import { UserCreator } from "../../Context/User/application/create-user/UserCreator";
import { UserRepository } from "../../Context/User/domain/ioc/UserRepository";
import { UserSessionRepository } from "../../Context/User/domain/ioc/UserSessionRepository";
import { TypeOrmUserRepository } from "../../Context/User/infrastructure/persistence/typeorm/TypeOrmUserRepository";
import { TypeOrmUserSessionRepository } from "../../Context/User/infrastructure/persistence/typeorm/TypeOrmUserSessionRepository";
import { StatusGetController } from "../controllers/status/StatusGetController";
import { UserPostController } from "../controllers/user/UserPostController";
import { UserSessionPostController } from "../controllers/user/UserSessionPostController";
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

/* INFRASTRUCTURE */

/**
 * PersistenceClientFactory
 * @author acerohernan
 */
container
  .bind(CONTAINER_TYPES.PersistenceClientFactory)
  .to(TypeOrmClientFactory);

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

export default container;
