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
    _response = await (_request = request(application.httpServer)
      .post(route)
      .send(JSON.parse(body)));
  }
);

Then("the response status code should be {int}", async (status: number) => {
  _response = await _request.expect(status);

  const responseStatus = (await _request).statusCode;

  assert.deepStrictEqual(
    status,
    responseStatus,
    `The response status code was ${responseStatus}`
  );
});

Then("the response should be empty", () => {
  assert.deepStrictEqual(_response.body, {});
});

Then("the response should have an error message", () => {
  if (_response.body["error"]) return;

  throw new Error("The response not contains an error message");
});

Then("the response should have the property {string}", (property: string) => {
  if (_response.body[property]) return true;

  throw new Error(`The response not have the property <${property}>`);
});
