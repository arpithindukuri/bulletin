import { assert } from "chai";
import { Request, Response } from "firebase-functions/v1";
const eventFunction = require("../src/event");
const boardFunctions = require("../src/board");

const ftest = require("firebase-functions-test")(
  {
    databaseURL: "https://bulletin-be82d.firebaseio.com",
    storageBucket: "bulletin-be82d.appspot.com",
    projectId: "bulletin-be82d",
  },
  "bulletin-be82d-firebase-adminsdk-bwpv8-7ce197c197.json"
);
describe("get events", () => {
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
      console.log("inside get events, added board id is: ", addedBoardId);
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
          assert.equal(code, 200);
          done();
        },
        end: () => {},
        setHeader: (arg) => {
          console.log(arg);
        },
        getHeader: () => {},
      } as unknown as Response;

      eventFunction.getEvents(req, res);
    });
    it("Should Return Status 400 Bad Params", (done: any) => {
        const req = {
            headers: {},
            method: "GET",
            body: {},
            query: {
              date: addedBoardId,
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
    
          eventFunction.getEvents(req, res);
      });
      it("Should Return Status 400 Bad Method", (done: any) => {
        const req = {
            headers: {},
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
    
          eventFunction.getEvents(req, res);
      });
      afterEach(async () => {
        ftest.cleanup();
      });
  });
});

describe("add Event", () => {
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
  
      it("Should Return 201 Budget Added", (done: any) => {
        const req = {
            headers: {},
            method: "POST",
            body: {
                name: "test name",
                startTime: "10:00:00",
                endTime: "12:00:00",
                date: "03/27/2022",
                description: "this is a test",
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
    
          eventFunction.addEvent(req, res);
      });
      it("Should Return Status 400 Bad Params", (done: any) => {
        const req = {
            headers: {},
            method: "POST",
            body: {
                name: "test name",
                startTime: "10:00:00",
                endTime: "12:00:00",
                date: "03/27/2022",
                description: "this is a test",
            },
            query: {
              number: addedBoardId,
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
    
          eventFunction.addEvent(req, res);
        });
        it("Should Return Status 400 Bad Method", (done: any) => {
            const req = {
                headers: {},
                method: "PUT",
                body: {
                    name: "test name",
                    startTime: "10:00:00",
                    endTime: "12:00:00",
                    date: "03/27/2022",
                    description: "this is a test",
                },
                query: {
                  number: addedBoardId,
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
        
              eventFunction.addEvent(req, res);
        });
        afterEach(async () => {
          ftest.cleanup();
        });
    });

  });
