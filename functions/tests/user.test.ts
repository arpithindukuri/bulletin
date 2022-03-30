import { assert } from "chai";
import { Request, Response } from "firebase-functions/v1";
const userFunctions = require("../src/user");

const ftest = require("firebase-functions-test")(
  {
    databaseURL: "https://bulletin-be82d.firebaseio.com",
    storageBucket: "bulletin-be82d.appspot.com",
    projectId: "bulletin-be82d",
  },
  "bulletin-be82d-firebase-adminsdk-bwpv8-7ce197c197.json"
);
describe("Add Users", () => {

    it("Should Return 201 User is Added", (done: any) => {
        const req = {
            headers: {},
            method: "POST",
            body: {
                id: "67vdu73",
                name: "John",
                email: "john@email.com",
                alternativeEmail: "",
                phoneNumber: "",
                overview: "",
                boards: [],
                idToken: "35g5j6",
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
    
          userFunctions.addUser(req, res);
        });
    it("Should Return Status 400 Bad Method", (done: any) => {
        const req = {
            headers: {},
            method: "GET",
            body: {
                id: "67vdu73",
                name: "John",
                email: "john@email.com",
                alternativeEmail: "",
                phoneNumber: "",
                overview: "",
                boards: [],
                idToken: "35g5j6",
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
    
          userFunctions.addUser(req, res);
      });

    it("Should Return Status 400 Bad Params", (done: any) => {
        const req = {
            headers: {},
            method: "POST",
            body: {
                id: "67vdu73",
                name: "John",
                email: "john@email.com",
                alternativeEmail: "",
                phoneNumber: "",
                overview: "",
                boards: "",
                idToken: "35g5j6",
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
    
          userFunctions.addUser(req, res);
      });
        afterEach(async () => {
            ftest.cleanup();
        });
});

describe("get user", () => {
    describe("Needs added user setup", () => {
      beforeEach(async () => {
        return new Promise<void>((resolve, reject) => {
          const initialReq = {
            headers: {},
            method: "POST",
            body: {
                id: "67vdu73",
                name: "John",
                email: "john@email.com",
                alternativeEmail: "",
                phoneNumber: "",
                overview: "",
                boards: [],
                idToken: "35g5j6",
            },
          } as unknown as Request;
          const initialRes = {
            status: (code: number) => {
              console.log("status called with staus: ", code);
              if(code===201){
                resolve();
              }
            },
            end: () => {},
            setHeader: (arg) => {
              console.log(arg);
            },
            getHeader: () => {},
          } as unknown as Response;
    
          userFunctions.addUser(initialReq, initialRes);
        })
      });
      it("Should Return 200 OK status", (done: any) => {
        const req = {
            headers: {},
            method: "GET",
            query: {
                user_id: "67vdu73",
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
    
          userFunctions.getUser(req, res);
        });
        it("Should Return 400 User Not Found", (done: any) => {
            const req = {
                headers: {},
                method: "GET",
                query: {
                    user_id: "4fcs",
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
        
              userFunctions.getUser(req, res);
            });
        it("Should Return 400 Bad Method", (done: any) => {
            const req = {
                headers: {},
                method: "POST",
                query: {
                    user_id: "67vdu73",
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
        
            userFunctions.getUser(req, res);
        });
        it("Should Return 200 OK Status", (done: any) => {
            const req = {
                headers: {},
                method: "GET",
                query: {
                    email: "john@email.com",
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
        
            userFunctions.getUserByEmail(req, res);
        });
        it("Should Return 400 Bad Method", (done: any) => {
            const req = {
                headers: {},
                method: "POST",
                query: {
                    email: "john@email.com",
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
        
            userFunctions.getUserByEmail(req, res);
        });
        it("Should Return 400 Bad User Not Found", (done: any) => {
            const req = {
                headers: {},
                method: "POST",
                query: {
                    email: "nick@email.com",
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
        
            userFunctions.getUserByEmail(req, res);
        });
        it("Should Return 200 OK Status", (done: any) => {
            const req = {
                headers: {},
                method: "PUT",
                body: {
                    id: "67vdu73",
                    name: "John",
                    email: "john@email.com",
                    alternativeEmail: "",
                    phoneNumber: "",
                    overview: "this is edited",
                    boards: [],
                    idToken: "35g5j6",
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
        
            userFunctions.editUser(req, res);
        });
        afterEach(async () => {
            ftest.cleanup();
        });
    });
});
