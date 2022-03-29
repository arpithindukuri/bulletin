import { assert } from "chai";
import { Request, Response } from "firebase-functions/v1";
const notesFunction = require("../src/notes");
const boardFunctions = require("../src/board");

const ftest = require("firebase-functions-test")(
  {
    databaseURL: "https://bulletin-be82d.firebaseio.com",
    storageBucket: "bulletin-be82d.appspot.com",
    projectId: "bulletin-be82d",
  },
  "bulletin-be82d-firebase-adminsdk-bwpv8-7ce197c197.json"
);
describe("get Notes", () => {
  describe("Needs added board setup", () => {
    let addedBoardId = undefined;
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
            resolve();
          },
          end: () => {},
          setHeader: (arg) => {
            console.log(arg);
          },
          getHeader: () => {},
        } as unknown as Response;
  
        boardFunctions.addBoard(initialReq, initialRes);
      })
    });

    it("Should Return 200 OK Valid Input", (done: any) => {
      console.log("inside get notes, added board id is: ", addedBoardId);
      const req = {
        headers: {},
        method: "GET",
        body: {},
        query: {
          board_id: addedBoardId,
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

      notesFunction.getNotes(req, res);
    });
    it("Should Return Status 400 Bad Params", (done: any) => {
        console.log("inside get notes, added board id is: ", addedBoardId);
        const req = {
          headers: {},
          method: "GET",
          body: {},
          query: {
            id: addedBoardId,
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
  
        notesFunction.getNotes(req, res);
      });
      it("Should Return Status 400 Bad Method", (done: any) => {
        console.log("inside get notes, added board id is: ", addedBoardId);
        const req = {
          headers: {},
          method: "POST",
          body: {},
          query: {
            board_id: addedBoardId,
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
  
        notesFunction.getNotes(req, res);
      });
      afterEach(async () => {
        ftest.cleanup();
      });
  });
});

describe("add Notes", () => {
    describe("Needs added board setup", () => {
      let addedBoardId = undefined;
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
              resolve();
            },
            end: () => {},
            setHeader: (arg) => {
              console.log(arg);
            },
            getHeader: () => {},
          } as unknown as Response;
    
          boardFunctions.addBoard(initialReq, initialRes);
        })
      });
  
      it("Should Return 200 OK Valid Input", (done: any) => {
        console.log("inside get notes, added board id is: ", addedBoardId);
        const req = {
          headers: {},
          method: "POST",
          body: {
            name: "test note",
            content: "this is a test",
            date: "03/27/2022",
          },
          query: {
            id: addedBoardId,
          },
        } as unknown as Request;
        const res = {
          status: (code: number) => {
            assert.equal(code, 201);
            done();
          },
          end: () => {},
          setHeader: (arg) => {
            console.log(arg);
          },
          getHeader: () => {},
        } as unknown as Response;
  
        notesFunction.addNote(req, res);
      });
      it("Should Return Status 400 Bad Params", (done: any) => {
          console.log("inside post notes, added board id is: ", addedBoardId);
          const req = {
            headers: {
                name: "test note",
                content: "this is a test",
            },
            method: "POST",
            body: {},
            query: {
              id: addedBoardId,
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
    
          notesFunction.addNote(req, res);
        });
        it("Should Return Status 400 Bad Method", (done: any) => {
          console.log("inside ADD notes, added board id is: ", addedBoardId);
          const req = {
            headers: {},
            method: "PUT",
            body: {
                name: "test note",
                content: "this is a test",
                date: "03/27/2022",
            },
            query: {
              id: addedBoardId,
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
    
          notesFunction.addNote(req, res);
        });
        afterEach(async () => {
          ftest.cleanup();
        });
    });

  });
