import { assert } from "chai";
import { Request, Response } from "firebase-functions/v1";
import * as boardFunctions from "../src/board";;

describe("addBoard", () => {
  let addedBoardId = undefined;

  after(async () => {
    console.log(addedBoardId);
    if (addedBoardId) {
      console.log("addedBoardId");
    }
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
