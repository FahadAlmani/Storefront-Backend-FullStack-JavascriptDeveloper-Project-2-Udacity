import supertest from "supertest";
import app from "../../index";
import jwt from "jsonwebtoken";

import client from "../../database";
import { User, userModel } from "../../models/userModel";

const UserModel = new userModel();
const request = supertest(app);

let user: User;
let token: string;
const { SECRET_TOKEN } = process.env;

describe("Testing Order Endpoint.", () => {
  beforeAll(async () => {
    const connection = await client.connect();
    const SQL =
      "INSERT INTO products (name, price, category) VALUES ('Apple', 10, 'Fruit')";
    await connection.query(SQL);

    user = (await UserModel.register({
      firstname: "Fahad",
      lastname: "Almani",
      username: "FHD",
      password: "123",
    })) as User;

    // const SQLorder = `INSERT INTO orders (userId, status) VALUES ('${user.id}', 'complete') RETURNING id`;
    // const resultOrder = await connection.query(SQLorder);
    // const orderId: number = resultOrder.rows[0].id;

    // const SQLorder_products = `INSERT INTO order_products VALUES ('${orderId}', '1', 100)`;
    // await connection.query(SQLorder_products);
    connection.release();

    token = jwt.sign(
      { user: { id: user.id, username: user.username } },
      SECRET_TOKEN
    );
  });

  it("[Testing]: The create Endpoint.", async () => {
    await request
      .post("/order/create")
      .send({ status: "complete" })
      .set("authorization", `Bearer ${token}`)
      .expect(200);
  });

  it("[Testing]: The index Endpoint.", async () => {
    await request
      .get("/order/index")
      .set("authorization", `Bearer ${token}`)
      .expect(200);
  });

  it("[Testing]: The completedOrders Endpoint.", async () => {
    await request
      .get("/order/completedOrders")
      .set("authorization", `Bearer ${token}`)
      .expect(200);
  });
});
