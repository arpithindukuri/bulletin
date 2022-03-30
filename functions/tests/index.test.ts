import { assert } from "chai";
import { Request, Response } from "firebase-functions/v1";
const index = require("../src/index");

const ftest = require("firebase-functions-test")(
  {
    databaseURL: "https://bulletin-be82d.firebaseio.com",
    storageBucket: "bulletin-be82d.appspot.com",
    projectId: "bulletin-be82d",
  },
  "bulletin-be82d-firebase-adminsdk-bwpv8-7ce197c197.json"
);

describe("hello world test", () => {
  
  it("should return a 200 OK status", (done: any) => {
    const req = {
      headers: {},
      method: "",
      body: {},
    } as unknown as Request;
    const res = {
      status: (code: number) => {
        assert.equal(code, 200);
        done();
      },
      end: () => {},
      setHeader: (arg) => {
        console.log(arg);
      },
      getHeader: () => {},
    } as unknown as Response;

    index.helloWorld(req, res);
  });
  afterEach(async () => {
    ftest.cleanup();
  });
});