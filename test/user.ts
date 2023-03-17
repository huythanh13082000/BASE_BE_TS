// import app from "../app";
// import request from "supertest";

// describe("User API", () => {
//   // Test create user API
//   it("should create a new user", async () => {
//     const res = await request(app)
//       .post("/users")
//       .send({ name: "John Doe", email: "john.doe@example.com" });
//     expect(res.statusCode).toEqual(201);
//     expect(res.body.name).toEqual("John Doe");
//     expect(res.body.email).toEqual("john.doe@example.com");
//   });

//   // Test get all users API
//   it("should get all users", async () => {
//     const res = await request(app).get("/users");
//     expect(res.statusCode).toEqual(200);
//     expect(res.body.length).toBeGreaterThan(0);
//   });

//   // Test get user by ID API
//   it("should get a user by ID", async () => {
//     const res = await request(app).get("/users/:id");
//     expect(res.statusCode).toEqual(200);
//     expect(res.body._id).toBeDefined();
//   });

//   // Test update user API
//   it("should update a user", async () => {
//     const res = await request(app)
//       .put("/users/:id")
//       .send({ name: "Jane Doe" });
//     expect(res.statusCode).toEqual(200);
//     expect(res.body.name).toEqual("Jane Doe");
//   });

//   // Test delete user API
//   it("should delete a user", async () => {
//     const res = await request(app).delete("/users/:id");
//     expect(res.statusCode).toEqual(200);
//     expect(res.body.message).toEqual("User deleted successfully");
//   });
// });