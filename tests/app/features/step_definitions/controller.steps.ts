import { Given, Then } from "@cucumber/cucumber";
import assert from "assert";
import request from "supertest";
import { application } from "./hooks.steps";

let _request: request.Test;
let _response: request.Response;

Given("I send a GET request to {string}", (route: string) => {
  _request = request(application.httpServer).get(route);
});

Given(
  "I send a POST request to {string} with body:",
  async (route: string, body: string) => {
    await (_request = request(application.httpServer)
      .post(route)
      .send(JSON.parse(body)));
  }
);

Then("the response status code should be {int}", async (status: number) => {
  _response = await _request.expect(status);
});

Then("the response should be empty", () => {
  assert.deepStrictEqual(_response.body, {});
});

Then("the response should have an error message", () => {
  if (_response.body["error"]) return;

  throw new Error("The response not contains an error field");
});

Then("the response should have authorization tokens", async () => {
  if (_response.body["accessToken"] && _response.body["refreshToken"])
    return true;

  throw new Error("The body not have the authorization tokens");
});
