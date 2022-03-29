import { assert } from "chai";
import { Request, Response } from "firebase-functions/v1";
const expenseFunction = require("../src/expense");
const boardFunctions = require("../src/board");

const ftest = require("firebase-functions-test")(
  {
    databaseURL: "https://bulletin-be82d.firebaseio.com",
    storageBucket: "bulletin-be82d.appspot.com",
    projectId: "bulletin-be82d",
  },
  "bulletin-be82d-firebase-adminsdk-bwpv8-7ce197c197.json"
);
describe("get expenses", () => {
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

      expenseFunction.getExpenses(req, res);
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
    
          expenseFunction.getExpenses(req, res);
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
    
          expenseFunction.getExpenses(req, res);
      });
      afterEach(async () => {
        boardFunctions.testingDeleteBoard(addedBoardId);
        ftest.cleanup();
      });
  });
});

describe("add Expense", () => {
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
  
      it("Should Return 201 Expense Added", (done: any) => {
        const req = {
            headers: {},
            method: "POST",
            body: {
                name: "test name",
                deadline: "03/27/2022",
                amount: 234,
                assignee: "John",
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
    
          expenseFunction.addExpense(req, res);
      });
      it("Should Return Status 400 Bad Params", (done: any) => {
        const req = {
            headers: {},
            method: "POST",
            body: {
                name: "test name",
                deadline: "03/27/2022",
                amount: 234,
                assignee: "John",
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
    
          expenseFunction.addExpense(req, res);
        });
        it("Should Return Status 400 Bad Method", (done: any) => {
            const req = {
                headers: {},
                method: "GET",
                body: {
                    name: "test name",
                    deadline: "03/27/2022",
                    amount: 234,
                    assignee: "John",
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
        
              expenseFunction.addExpense(req, res);
        });
        afterEach(async () => {
          boardFunctions.testingDeleteBoard(addedBoardId);
          ftest.cleanup();
        });
    });

  });

  describe("delete Expense", () => {
    describe("Needs added board and expense setup", () => {
      let addedBoardId = undefined;
      let addedExpenseId = undefined;
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
                    deadline: "03/27/2022",
                    amount: 234,
                    assignee: "John",
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
                      addedExpenseId = arg.id; 
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
  
              expenseFunction.addExpense(expenseReq, expenseRes);
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
  
      it("Should Return 202 Expense is Deleted", (done: any) => {
        console.log("inside delete notes, added board id is: ", addedBoardId);
        console.log("inside delete notes, added expense id is: ", addedExpenseId);
        const req = {
          headers: {},
          method: "DELETE",
          body: {},
          query: {
            board_id: addedBoardId,
            expense_id: addedExpenseId,
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
  
        expenseFunction.deleteExpense(req, res);
      });
  
    
      it("Should Return 400 Bad Params", (done: any) => {
        const req = {
            headers: {},
            method: "DELETE",
            body: {},
            query: {
              board_id: addedBoardId,
              user_id: addedExpenseId,
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
    
          expenseFunction.deleteExpense(req, res);
      });
      it("Should Return 400 Bad Method", (done: any) => {
        const req = {
            headers: {},
            method: "PUT",
            body: {},
            query: {
              board_id: addedBoardId,
              expense_id: addedExpenseId,
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
    
          expenseFunction.deleteExpense(req, res);
      });
  
      afterEach(async () => {
        boardFunctions.testingDeleteBoard(addedBoardId);
        ftest.cleanup();
      });
    });
  });

describe("edit Expense", () => {
    describe("Needs added board and expense setup", () => {
        let addedBoardId = undefined;
        let addedExpenseId = undefined;
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
                        deadline: "03/27/2022",
                        amount: 234,
                        assignee: "John",
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
                          addedExpenseId = arg.id; 
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
      
                  expenseFunction.addExpense(expenseReq, expenseRes);
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
          console.log("inside delete notes, added expense id is: ", addedExpenseId);
          const req = {
            headers: {},
            method: "PUT",
            body: {
                name: "Edited test name",
                deadline: "03/27/2022",
                amount: 234,
                assignee: "John",
            },
            query: {
              board_id: addedBoardId,
              expense_id: addedExpenseId,
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
    
          expenseFunction.editExpense(req, res);
        });
    
      
        it("Should Return 400 Bad Params", (done: any) => {
          const req = {
            headers: {},
            method: "PUT",
            body: {
                name: "Edited test name",
                deadline: "03/27/2022",
                amount: 234,
                assignee: "John",
            },
            query: {
              board_id: addedBoardId,
              user_id: addedExpenseId,
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
    
          expenseFunction.editExpense(req, res);
        });
        it("Should Return 400 Bad Method", (done: any) => {
            const req = {
                headers: {},
                method: "GET",
                body: {
                    name: "Edited test name",
                    deadline: "03/27/2022",
                    amount: 234,
                    assignee: "John",
                },
                query: {
                  board_id: addedBoardId,
                  expense_id: addedExpenseId,
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
    
            expenseFunction.editExpense(req, res);
        });
    
        afterEach(async () => {
          boardFunctions.testingDeleteBoard(addedBoardId);
          ftest.cleanup();
        });
      });
  });
