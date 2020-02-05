const httpMocks = require("node-mocks-http");
const userManagementService = require("../services/userManagement.service");
const userManagementController = require("../controllers/userManagement.controller");
const userValidation = require('../validation/userManagement.validation')
const bcrypt = require('bcryptjs')
const { pass } = require('../fixtures/bcryptPass.json')

jest.mock("../services/userManagement.service");

describe("User Management", () => {
  it("registerNewUser", async () => {
    const req = httpMocks.createRequest({
      method: "POST",
      url: "/register",
      body: {
        email: "ananth@gmail.com",
        password: "nullvoid",
        firstName: "Ananth",
        lastName: "Prasad",
        phoneNumber: "9840614023"
      }
    });
    const res = httpMocks.createResponse();
    userManagementService.register.mockResolvedValue([]);
    await userManagementController.registerUser(req, res);
    expect(res.statusCode).toBe(201);
  });

});
