import supertest from "supertest";
import app from "../../index";
import jwt from "jsonwebtoken";
import { User } from "../../models/userModel";

const request = supertest(app);

const newUser: User = {
  firstname: "test",
  lastname: "test",
  username: "test",
  password: "test",
};
const user: User = {
  id: 1,
  firstname: "Fahad",
  lastname: "Almani",
  username: "FHD",
  password: "123",
};
const { SECRET_TOKEN } = process.env;
const token: string = jwt.sign(
  { user: { id: user.id, username: user.username } },
  SECRET_TOKEN
);

describe("Testing User Endpoint.", () => {
  it("[Testing]: The index Endpoint.", async () => {
    await request
      .get("/user/index")
      .set("authorization", `Bearer ${token}`)
      .expect(200);
  });

  it("[Testing]: The show Endpoint.", async () => {
    await request
      .get(`/user/show/${user.id}`)
      .set("authorization", `Bearer ${token}`)
      .expect(200);
  });

  it("[Testing]: The login Endpoint.", async () => {
    await request
      .post("/user/login")
      .send({ username: user.username, password: user.password })
      .expect(200);
  });

  it("[Testing]: The register Endpoint.", async () => {
    await request
      .post("/user/register")
      .send({
        firstname: newUser.firstname,
        lastname: newUser.lastname,
        username: newUser.username,
        password: newUser.password,
      })
      .expect(200);
  });
});
