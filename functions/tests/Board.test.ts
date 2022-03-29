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
describe("get boards", () => {

    it("Should Return 200 OK status", (done: any) => {
        const req = {
            headers: {},
            method: "GET",
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
    
          boardFunctions.getBoards(req, res);
        });
    it("Should Return Status 400 Bad Method", (done: any) => {
        const req = {
            headers: {},
            method: "DELETE",
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
    
          boardFunctions.getBoards(req, res);
      });
        afterEach(async () => {
            ftest.cleanup();
        });
    });

describe("add Board", () => {
    it("Should Return a board id", (done: any) => {
        const req = {
            headers: {},
            method: "POST",
            body: {
              name: "testing",
              description: "testing123",
            },
          } as unknown as Request;
          const res = {
              end: () => {},
              setHeader: (arg) => {
                console.log(arg);
              },
              json: (arg: any) => {
                  assert.exists(arg.board.id)
                done()
              },
              getHeader: () => {},
          } as unknown as Response;
    
          boardFunctions.addBoard(req, res);
        });
    it("Should Return Status 400 Bad Body", (done: any) => {
        const req = {
            headers: {},
            method: "POST",
            body: {
              name: "testing",
              information: "testing123",
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
      it("Should Return Status 400 Bad Method", (done: any) => {
        const req = {
            headers: {},
            method: "PUT",
            body: {
              name: "testing",
              description: "testing123",
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
        afterEach(async () => {
            ftest.cleanup();
          });
  });

// *******************************************


describe("get board users", () => {
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
  
      it("Should Return 201 User is added", (done: any) => {
        console.log("inside get events, added board id is: ", addedBoardId);
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
  
        boardFunctions.getBoardUsers(req, res);
      });
      it("Should Return Status 400 Bad Params", (done: any) => {
        const req = {
            headers: {},
            method: "GET",
            body: {},
            query: {
              user_id: addedBoardId,
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
    
          boardFunctions.getBoardUsers(req, res);
        });
        it("Should Return Status 400 Bad Method", (done: any) => {
            const req = {
                headers: {},
                method: "PUT",
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
        
              boardFunctions.getBoardUsers(req, res);
        });
        afterEach(async () => {
          ftest.cleanup();
        });
    });
  });

  describe("add user to board", () => {
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
  
      it("Should Return 201 User is added", (done: any) => {
        console.log("inside get events, added board id is: ", addedBoardId);
        const req = {
          headers: {},
          method: "PUT",
          body: {
              name: "John",
              email: "john@email.com",
              id: "hd7839hbd",
              role: "member"
          },
          query: {
            board_id: addedBoardId,
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
  
        boardFunctions.addUserToBoard(req, res);
      });
      it("Should Return Status 400 Bad Params", (done: any) => {
        const req = {
            headers: {},
            method: "PUT",
            body: {
                name: "John",
                email: "john@email.com",
                id: "hd7839hbd",
                role: "member"
            },
            query: {
              user_id: addedBoardId,
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
    
          boardFunctions.addUserToBoard(req, res);
        });
        it("Should Return Status 400 Bad Method", (done: any) => {
            const req = {
            headers: {},
            method: "GET",
            body: {
                name: "John",
                email: "john@email.com",
                id: "hd7839hbd",
                role: "member"
            },
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
    
            boardFunctions.addUserToBoard(req, res);
        });
        afterEach(async () => {
          boardFunctions.testingDeleteBoard(addedBoardId);
          ftest.cleanup();
        });
    });
  });