import { assert } from "chai";
import { Request, Response } from "firebase-functions/v1";
const budgetFunction = require("../src/budget");
const boardFunctions = require("../src/board");

const ftest = require("firebase-functions-test")(
  {
    databaseURL: "https://bulletin-be82d.firebaseio.com",
    storageBucket: "bulletin-be82d.appspot.com",
    projectId: "bulletin-be82d",
  },
  "bulletin-be82d-firebase-adminsdk-bwpv8-7ce197c197.json"
);
describe("get budgets", () => {
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
      console.log("inside get budgets, added board id is: ", addedBoardId);
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

      budgetFunction.getBudgets(req, res);
    });
    it("Should Return Status 400 Bad Params", (done: any) => {
        const req = {
            headers: {},
            method: "GET",
            body: {},
            query: {
              user: addedBoardId,
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
    
          budgetFunction.getBudgets(req, res);
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
    
          budgetFunction.getBudgets(req, res);
      });
      afterEach(async () => {
        boardFunctions.testingDeleteBoard(addedBoardId);
        ftest.cleanup();
      });
  });
});

describe("add Budget", () => {
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
                assigned: "John",
                date: "03/27/2022",
                balance: 123,
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
    
          budgetFunction.addBudget(req, res);
      });
      it("Should Return Status 400 Bad Params", (done: any) => {
        const req = {
            headers: {},
            method: "POST",
            body: {
                name: "test name",
                assigned: "John",
                date: "03/27/2022",
                balance: 123,
            },
            query: {
              user: addedBoardId,
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
    
          budgetFunction.addBudget(req, res);
        });
        it("Should Return Status 400 Bad Method", (done: any) => {
            const req = {
                headers: {},
                method: "DELETE",
                body: {
                    name: "test name",
                    assigned: "John",
                    date: "03/27/2022",
                    balance: 123,
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
        
              budgetFunction.addBudget(req, res);
        });
        afterEach(async () => {
          boardFunctions.testingDeleteBoard(addedBoardId);
          ftest.cleanup();
        });
    });

  });



  describe("delete Budget", () => {
    describe("Needs added board and budget setup", () => {
      let addedBoardId = undefined;
      let addedBudgetId = undefined;
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
              const expenseReq = {
                headers: {},
                method: "POST",
                body: {
                    name: "test name",
                    date: "03/27/2022",
                    balance: 234,
                    assigned: "John",
                },
                query: {
                  id: addedBoardId,
                },
              } as unknown as Request;
  
              const expenseRes = {
                status: (code: number) => {
                  // ----------------------------------- For nested function calls return an object having the next fucntion
                  // for eg: res.status(xx).json(xx) should have the following format --------------------
                  return {
                    json: (arg: any) => {
                      addedBudgetId = arg.id; 
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
  
              budgetFunction.addBudget(expenseReq, expenseRes);
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
  
      it("Should Return 202 Budget is Deleted", (done: any) => {
        console.log("inside delete notes, added board id is: ", addedBoardId);
        console.log("inside delete notes, added budget id is: ", addedBudgetId);
        const req = {
          headers: {},
          method: "DELETE",
          body: {},
          query: {
            board_id: addedBoardId,
            budget_id: addedBudgetId,
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
  
        budgetFunction.deleteBudget(req, res);
      });
  
    
      it("Should Return 400 Bad Params", (done: any) => {
        const req = {
            headers: {},
            method: "DELETE",
            body: {},
            query: {
              board_id: addedBoardId,
              user_id: addedBudgetId,
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
    
          budgetFunction.deleteBudget(req, res);
      });
      it("Should Return 400 Bad Method", (done: any) => {
        const req = {
            headers: {},
            method: "PUT",
            body: {},
            query: {
              board_id: addedBoardId,
              budget_id: addedBudgetId,
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
    
          budgetFunction.deleteBudget(req, res);
      });
  
      afterEach(async () => {
        boardFunctions.testingDeleteBoard(addedBoardId);
        ftest.cleanup();
      });
    });
  });

describe("edit Budget", () => {
    describe("Needs added board and budget setup", () => {
        let addedBoardId = undefined;
        let addedBudgetId = undefined;
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
                const expenseReq = {
                  headers: {},
                  method: "POST",
                  body: {
                      name: "test name",
                      date: "03/27/2022",
                      balance: 234,
                      assigned: "John",
                  },
                  query: {
                    id: addedBoardId,
                  },
                } as unknown as Request;
    
                const expenseRes = {
                  status: (code: number) => {
                    // ----------------------------------- For nested function calls return an object having the next fucntion
                    // for eg: res.status(xx).json(xx) should have the following format --------------------
                    return {
                      json: (arg: any) => {
                        addedBudgetId = arg.id; 
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
    
                budgetFunction.addBudget(expenseReq, expenseRes);
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
          console.log("inside delete notes, added budget id is: ", addedBudgetId);
          const req = {
            headers: {},
            method: "PUT",
            body: {
                name: "EDITED test name",
                date: "03/27/2022",
                balance: 234,
                assigned: "John",
            },
            query: {
              board_id: addedBoardId,
              budget_id: addedBudgetId,
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
    
          budgetFunction.editBudget(req, res);
        });
    
      
        it("Should Return 400 Bad Params", (done: any) => {
            const req = {
            headers: {},
            method: "PUT",
            body: {
                name: "EDITED test name",
                date: "03/27/2022",
                balance: 234,
                assigned: "John",
            },
            query: {
                board_id: addedBoardId,
                user_id: addedBudgetId,
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
    
            budgetFunction.editBudget(req, res);
        });
        it("Should Return 400 Bad Method", (done: any) => {
            const req = {
                headers: {},
                method: "GET",
                body: {
                    name: "EDITED test name",
                    date: "03/27/2022",
                    balance: 234,
                    assigned: "John",
                },
                query: {
                  board_id: addedBoardId,
                  budget_id: addedBudgetId,
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
    
            budgetFunction.editBudget(req, res);
        });
    
        afterEach(async () => {
          boardFunctions.testingDeleteBoard(addedBoardId);
          ftest.cleanup();
        });
      });
  });
