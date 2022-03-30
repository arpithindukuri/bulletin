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
        boardFunctions.testingDeleteBoard(addedBoardId);
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
          boardFunctions.testingDeleteBoard(addedBoardId);
          ftest.cleanup();
        });
    });

  });

  describe("delete Event", () => {
    describe("Needs added board and event setup", () => {
      let addedBoardId = undefined;
      let addedEventId = undefined;
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
              const eventReq = {
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
  
              const eventRes = {
                status: (code: number) => {
                  // ----------------------------------- For nested function calls return an object having the next fucntion
                  // for eg: res.status(xx).json(xx) should have the following format --------------------
                  return {
                    json: (arg: any) => {
                      addedEventId = arg.id; 
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
  
              eventFunction.addEvent(eventReq, eventRes);
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
  
      it("Should Return 202 Event is Deleted", (done: any) => {
        console.log("inside delete notes, added board id is: ", addedBoardId);
        console.log("inside delete notes, added node id is: ", addedEventId);
        const req = {
          headers: {},
          method: "DELETE",
          body: {},
          query: {
            board_id: addedBoardId,
            event_id: addedEventId,
          },
        } as unknown as Request;
        const res = {
          status: (code: number) => {
            assert.equal(code, 202);
            done();
          },
          end: () => {},
          setHeader: (arg) => {
            console.log(arg);
          },
          getHeader: () => {},
        } as unknown as Response;
  
        eventFunction.deleteEvent(req, res);
      });
  
    
      it("Should Return 400 Bad Params", (done: any) => {
        const req = {
          headers: {},
          method: "DELETE",
          body: {},
          query: {
            board_id: addedBoardId,
            user_id: addedEventId,
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
  
        eventFunction.deleteEvent(req, res);
      });
      it("Should Return 400 Bad Method", (done: any) => {
        const req = {
          headers: {},
          method: "PUT",
          body: {},
          query: {
            board_id: addedBoardId,
            event_id: addedEventId,
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
  
        eventFunction.deleteEvent(req, res);
      });
  
      afterEach(async () => {
        boardFunctions.testingDeleteBoard(addedBoardId);
        ftest.cleanup();
      });
    });
  });

describe("edit Event", () => {
    describe("Needs added board and event setup", () => {
        let addedBoardId = undefined;
        let addedEventId = undefined;
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
    
                const noteRes = {
                  status: (code: number) => {
                    // ----------------------------------- For nested function calls return an object having the next fucntion
                    // for eg: res.status(xx).json(xx) should have the following format --------------------
                    return {
                      json: (arg: any) => {
                        addedEventId = arg.id;  
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
    
                eventFunction.addEvent(noteReq, noteRes);
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
    
        it("Should Return 200 OK Valid Input", (done: any) => {
          console.log("inside delete notes, added board id is: ", addedBoardId);
          console.log("inside delete notes, added node id is: ", addedEventId);
          const req = {
            headers: {},
            method: "PUT",
            body: {
                name: "Edited test name",
                startTime: "10:00:00",
                endTime: "12:00:00",
                date: "03/27/2022",
                description: "this is a test",
            },
            query: {
              board_id: addedBoardId,
              event_id: addedEventId,
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
    
          eventFunction.editEvent(req, res);
        });
    
      
        it("Should Return 400 Bad Params", (done: any) => {
          const req = {
            headers: {},
            method: "PUT",
            body: {},
            query: {
              board_id: addedBoardId,
              user_id: addedEventId,
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
    
          eventFunction.editEvent(req, res);
        });
        it("Should Return 400 Bad Method", (done: any) => {
          const req = {
            headers: {},
            method: "GET",
            body: {},
            query: {
              board_id: addedBoardId,
              event_id: addedEventId,
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
    
          eventFunction.editEvent(req, res);
        });
    
        afterEach(async () => {
          boardFunctions.testingDeleteBoard(addedBoardId);
          ftest.cleanup();
        });
      });
  });
