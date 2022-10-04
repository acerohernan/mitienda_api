import { AfterAll, BeforeAll, Given, Then } from "@cucumber/cucumber";
import request from "supertest";
import { MiTiendaApp } from "../../../../src/app/MiTiendaApp";

let _request: request.Test;
let application: MiTiendaApp;
//let _response: request.Response;

Given("I send a GET request to {string}", (route: string) => {
  _request = request(application.httpServer).get(route);
});

Then("the response status code should be {int}", async (status: number) => {
  /* _response = */ await _request.expect(status);
});

/* Initilizatio and kill the app */
BeforeAll(async () => {
  application = new MiTiendaApp();
  await application.start();
});

AfterAll(async () => {
  await application.stop();
});
