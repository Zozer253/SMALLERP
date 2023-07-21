const request = require("supertest");
const { app, Sequelize } = require('./app');


describe("singup", () => {
  it("should return 201 and success message when signup is successful", async () => {
    const response = await request(app).post("/signup").send({
      firstName: "John",
      lastName: "Doe",
      phone: "1234567890",
      email: "johndoe@example.com",
      password: "password123",
    });

    expect(response.statusCode).toBe(201);
    expect(response.body.message).toBe("inscription réussie");
    expect(response.body.User).toHaveProperty("firstName", "John");
    expect(response.body.User).toHaveProperty("lastName", "Doe");
    expect(response.body.User).toHaveProperty("phone", "1234567890");
    expect(response.body.User).toHaveProperty("email", "johndoe@example.com");
  });

  it("should return 406 and error message when email already exists", async () => {
    const response = await request(app).post("/signup").send({
      firstName: "Jane",
      lastName: "Smith",
      phone: "9876543210",
      email: "existing@example.com",
      password: "password456",
    });

    expect(response.statusCode).toBe(406);
    expect(response.body.message).toBe("cette email est déjà utilisé");
  });
});

describe("login", () => {
  it("should return 200 and success message when login is successful", async () => {
    const response = await request(app).post("/login").send({
      email: "johndoe@example.com",
      password: "password123",
    });

    expect(response.statusCode).toBe(200);
    expect(response.body.message).toBe("Connexion réussie !");
  });

  it("should return 404 and error message when user is not found", async () => {
    const response = await request(app).post("/login").send({
      email: "nonexistent@example.com",
      password: "password789",
    });

    expect(response.statusCode).toBe(404);
    expect(response.body.message).toBe("Utilisateur non trouvé.");
  });

  it("should return 401 and error message when password is incorrect", async () => {
    const response = await request(app).post("/login").send({
      email: "johndoe@example.com",
      password: "incorrectpassword",
    });

    expect(response.statusCode).toBe(401);
    expect(response.body.message).toBe("Mot de passe incorrect.");
  });
});
