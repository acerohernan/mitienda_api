import { Given, Then } from "@cucumber/cucumber";
import assert from "assert";
import request from "supertest";
import { application } from "./hooks.steps";

let _request: request.Test;
let _response: request.Response;
let _token: string | null = null;

Given("I send a GET request to {string}", async (route: string) => {
  _request = request(application.httpServer).get(route);
  _response = await _request;
  await wait(200);
});

Given("I get an access token {string}", (token: string) => {
  _token = token;
});

Given(
  "I send a POST request to {string} with body:",
  async (route: string, body: string) => {
    _request = request(application.httpServer)
      .post(route)
      .send(JSON.parse(body));
    await wait(200);
    _response = await _request;
  }
);

Given(
  "I send an authenticated GET request to {string}",
  async (route: string) => {
    if (!_token) throw new Error("The authorization token not exists");

    _request = request(application.httpServer)
      .get(route)
      .auth(_token, { type: "bearer" });
    await wait(200);

    _response = await _request;
  }
);

Given(
  "I send an authenticated POST request to {string} with body:",
  async (route: string, body: string) => {
    if (!_token) throw new Error("The authorization token not exists");

    _request = request(application.httpServer)
      .post(route)
      .auth(_token, { type: "bearer" })
      .send(JSON.parse(body));

    _response = await _request;

    await wait(200);
  }
);

Given(
  "I send an authenticated PUT request to {string} with body:",
  async (route: string, body: string) => {
    if (!_token) throw new Error("The authorization token not exists");

    _request = request(application.httpServer)
      .put(route)
      .auth(_token, { type: "bearer" })
      .send(JSON.parse(body));

    _response = await _request;

    await wait(200);
  }
);

Then("the response status code should be {int}", async (status: number) => {
  assert.deepStrictEqual(
    status,
    _response.status,
    `The response status code was ${_response.status}`
  );
});

Then("the response should be empty", async () => {
  assert.deepStrictEqual(_response.body, {});
});

Then("the response should have an error message", () => {
  if (_response.body["error"]) return;

  throw new Error("The response not contains an error message");
});

Then(
  "the response should have the property {string}",
  async (property: string) => {
    if (_response.body[property]) {
      if (property === "accessToken") _token = _response.body[property];
      return true;
    }
    throw new Error(`The response not have the property <${property}>`);
  }
);

/* Debug*/
Then("the response should be visible in the console", () => {
  console.log(_response.body);
  console.log(_response.status);
  console.log(_request.url);
});

function wait(milliseconds: number) {
  return new Promise((resolve) => setTimeout(resolve, milliseconds));
}
