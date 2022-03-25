import { assert } from "chai";
import { Request, Response } from "firebase-functions/v1";
const boardFunctions = require("../src/board");

const ftest = require("firebase-functions-test")(
  {
    databaseURL: "https://bulletin-be82d.firebaseio.com",
    storageBucket: "bulletin-be82d.appspot.com",
    projectId: "bulletin-be82d",
  },
  "bulletin-be82d-firebase-adminsdk-bwpv8-7ce197c197.json"
);

describe("addBoard with valid data", () => {
  let addedBoardId = undefined;

  after(async () => {
    console.log(addedBoardId);
    if (addedBoardId) {
      boardFunctions.testingDeleteBoard(addedBoardId);
    }
    ftest.cleanup();
  });

  it("should return a 201 created", (done: any) => {
    const req = {
      headers: {},
      method: "POST",
      body: {
        name: "Test Board",
        description: "desc",
        users: ["923uiewndaaa"],
      },
    } as unknown as Request;
    const res = {
      status: (code: number) => {
        console.log("status called with staus: ", code);
        assert.equal(code, 201);
      },
      json: (arg: any) => {
        addedBoardId = arg.board.id;
        done();
      },
      end: () => {},
      setHeader: (arg) => {
        console.log(arg);
      },
      getHeader: () => {},
    } as unknown as Response;

    boardFunctions.addBoard(req, res);
  });
});

describe("addBoard With Invalid Body", () => {
  after(() => {
    ftest.cleanup();
  });

  it("should return a 400 bad request", (done: any) => {
    const req = {
      headers: {},
      method: "POST",
      body: {},
    } as unknown as Request;
    const res = {
      status: (code: number) => {
        assert.equal(code, 400);
        done();
      },
      end: () => {},
      setHeader: (arg) => {
        console.log(arg);
      },
      getHeader: () => {},
    } as unknown as Response;

    boardFunctions.addBoard(req, res);
  });

  describe("addBoard With Invalid Method", () => {
    after(() => {
      ftest.cleanup();
    });

    it("should return a 400 bad request", (done: any) => {
      const req = {
        headers: {},
        method: "GET",
        body: {
          name: "Test Board",
          description: "desc",
          users: ["923uiewndaaa"],
        },
      } as unknown as Request;
      const res = {
        status: (code: number) => {
          assert.equal(code, 400);
          done();
        },
        end: () => {},
        setHeader: (arg) => {
          console.log(arg);
        },
        getHeader: () => {},
      } as unknown as Response;

      boardFunctions.addBoard(req, res);
    });
  });
});
