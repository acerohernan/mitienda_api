import { Container } from "inversify";
import { TypeOrmClientFactory } from "../../Context/Shared/infrastructure/persistence/typeorm/TypeOrmClientFactory";
import { UserCreator } from "../../Context/User/application/create-user/UserCreator";
import { UserRepository } from "../../Context/User/domain/ioc/UserRepository";
import { TypeOrmUserRepository } from "../../Context/User/infrastructure/persistence/typeorm/TypeOrmUserRepository";
import { StatusGetController } from "../controllers/status/StatusGetController";
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

/* APPLICATION SERVICES */
/**
 * UserCreator
 * @param {UserRepository} userRepository
 * @author acerohernan
 */
container.bind<UserCreator>(CONTAINER_TYPES.UserCreator).to(UserCreator);

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

export default container;
