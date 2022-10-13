import { AfterAll, BeforeAll, Given, Then } from "@cucumber/cucumber";
import request from "supertest";
import { PlayApp } from "../server";

let app: PlayApp;
/* let _request: Request;
let _response: Response; */

BeforeAll(async () => {
  app = new PlayApp();
  await app.start();
});

AfterAll(() => {
  app.close();
});

Given("I send a GET request to {string}", async (route: string) => {
  let response = await request(app).get(route).send().expect(200);
  console.log(response.body);
});

Then("the body should have a count", () => {
  console.log("Count");
});
