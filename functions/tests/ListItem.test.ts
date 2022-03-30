import { assert } from "chai";
import { Request, Response } from "firebase-functions/v1";
const listItemFunction = require("../src/listItem");
const listFunctions = require("../src/lists");
const boardFunctions = require("../src/board");

const ftest = require("firebase-functions-test")(
  {
    databaseURL: "https://bulletin-be82d.firebaseio.com",
    storageBucket: "bulletin-be82d.appspot.com",
    projectId: "bulletin-be82d",
  },
  "bulletin-be82d-firebase-adminsdk-bwpv8-7ce197c197.json"
);

describe("get listItems", () => {
  describe("Needs added board and list setup", () => {
    let addedBoardId = undefined;
    let addedListId = undefined;
    beforeEach(async () => {
      return new Promise<void>((resolve, reject) => {
        const initialReq = {
          headers: {},
          method: "POST",
          body: {
            name: "testing",
            description: "testing123",
          },
        } as unknown as Request;
        const initialRes = {
          status: (code: number) => {
            console.log("status called with staus: ", code);
          },
          json: (arg: any) => {
            addedBoardId = arg.board.id;
            const noteReq = {
              headers: {},
              method: "POST",
              body: {
                name: "test list",
              },
              query: {
                id: addedBoardId,
              },
            } as unknown as Request;

            const noteRes = {
              status: (code: number) => {
                return {
                  json: (arg: any) => {
                    addedListId = arg.id;
                    resolve();
                  },
                };
              },
              end: () => {},
              setHeader: (arg) => {
                console.log(arg);
              },
              getHeader: () => {},
            } as unknown as Response;

            listFunctions.addList(noteReq, noteRes);
          },
          end: () => {},
          setHeader: (arg) => {
            console.log(arg);
          },
          getHeader: () => {},
        } as unknown as Response;

        boardFunctions.addBoard(initialReq, initialRes);
      });
    });

    it("Should Return 200 OK Status", (done: any) => {
      console.log("inside get budgets, added board id is: ", addedListId);
      const req = {
        headers: {},
        method: "GET",
        body: {},
        query: {
          board_id: addedBoardId,
          list_id: addedListId,
        },
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

      listItemFunction.getListItems(req, res);
    });
    it("Should Return Status 400 Bad Params", (done: any) => {
      const req = {
        headers: {},
        method: "GET",
        body: {},
        query: {
          board_id: addedBoardId,
          user_id: addedListId,
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

      listItemFunction.getListItems(req, res);
    });
    it("Should Return Status 400 Bad Method", (done: any) => {
      const req = {
        headers: {},
        method: "POST",
        body: {},
        query: {
          board_id: addedBoardId,
          list_id: addedListId,
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

      listItemFunction.getListItems(req, res);
    });
    afterEach(async () => {
      boardFunctions.testingDeleteBoard(addedBoardId);
      ftest.cleanup();
    });
  });
});

describe("post listItem", () => {
  describe("Needs added board and list setup", () => {
    let addedBoardId = undefined;
    let addedListId = undefined;
    beforeEach(async () => {
      return new Promise<void>((resolve, reject) => {
        const initialReq = {
          headers: {},
          method: "POST",
          body: {
            name: "testing",
            description: "testing123",
          },
        } as unknown as Request;
        const initialRes = {
          status: (code: number) => {
            console.log("status called with staus: ", code);
          },
          json: (arg: any) => {
            addedBoardId = arg.board.id;
            const noteReq = {
              headers: {},
              method: "POST",
              body: {
                name: "test list",
              },
              query: {
                id: addedBoardId,
              },
            } as unknown as Request;

            const noteRes = {
              status: (code: number) => {
                // ----------------------------------- For nested function calls return an object having the next fucntion
                // for eg: res.status(xx).json(xx) should have the folloeing format --------------------
                return {
                  json: (arg: any) => {
                    addedListId = arg.id;
                    resolve();
                  },
                };
              },
              end: () => {},
              setHeader: (arg) => {
                console.log(arg);
              },
              getHeader: () => {},
            } as unknown as Response;

            listFunctions.addList(noteReq, noteRes);
          },
          end: () => {},
          setHeader: (arg) => {
            console.log(arg);
          },
          getHeader: () => {},
        } as unknown as Response;

        boardFunctions.addBoard(initialReq, initialRes);
      });
    });

    it("Should Return 201 ListItem Added", (done: any) => {
      const req = {
        headers: {},
        method: "POST",
        body: {
          name: "test name",
          isDone: true,
        },
        query: {
          board_id: addedBoardId,
          list_id: addedListId,
        },
      } as unknown as Request;

      const res = {
        status: (code: number) => {
          assert.equal(code, 201);
          done();
          return {
            send: () => {},
          };
        },
        end: () => {},
        setHeader: (arg) => {
          console.log(arg);
        },
        getHeader: () => {},
      } as unknown as Response;

      listItemFunction.addListItem(req, res);
    });

    it("Should Return Status 400 Bad Params", (done: any) => {
      const req = {
        headers: {},
        method: "POST",
        body: {
          name: "test name",
          isDone: true,
        },
        query: {
          board_id: addedBoardId,
          user_id: addedListId,
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

      listItemFunction.addListItem(req, res);
    });
    it("Should Return Status 400 Bad Method", (done: any) => {
      const req = {
        headers: {},
        method: "GET",
        body: {
          name: "test name",
          isDone: true,
        },
        query: {
          board_id: addedBoardId,
          list_id: addedListId,
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

      listItemFunction.addListItem(req, res);
    });
    afterEach(async () => {
      boardFunctions.testingDeleteBoard(addedBoardId);
      ftest.cleanup();
    });
  });
});
