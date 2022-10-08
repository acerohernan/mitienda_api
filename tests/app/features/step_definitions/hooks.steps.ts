import { AfterAll, BeforeAll } from "@cucumber/cucumber";
import container from "../../../../src/app/dependency-injection";
import { CONTAINER_TYPES } from "../../../../src/app/dependency-injection/types";
import { MiTiendaApp } from "../../../../src/app/MiTiendaApp";
import { EnvironmentArranger } from "../../../Context/Shared/infrastructure/arranger/EnvironmentArranger";

let application: MiTiendaApp;
let environmentArranger: EnvironmentArranger;

BeforeAll(async () => {
  environmentArranger = container.get<EnvironmentArranger>(
    CONTAINER_TYPES.EnvironmentArranger
  );

  await environmentArranger.arrange();
  application = new MiTiendaApp();
  await application.start();
});

AfterAll(async () => {
  await environmentArranger.close();
  await application.stop();
});

export { application, environmentArranger };
