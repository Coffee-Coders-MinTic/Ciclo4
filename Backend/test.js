import { app } from "./index.js";
import assert from "assert";
import supertest from "supertest";

it("Inicio server", async () => {
  const resp = await supertest(app).get("/health-check");

  assert.equal(resp.statusCode, 200);
});
