import supertest from "supertest";
import app from "../../index";
import jwt from "jsonwebtoken";

import client from "../../database";
import { User } from "../../models/userModel";
import { Product } from "../../models/productModel";

const request = supertest(app);
let product: Product;
let user: User;
let token: string;
const { SECRET_TOKEN } = process.env;

describe("Testing Product Endpoint.", () => {
  beforeAll(async () => {
    const connection = await client.connect();

    const SQL = "SELECT * FROM users WHERE id = 1";
    const result = await connection.query(SQL);

    const SQL2 = "SELECT * FROM products WHERE id = 1";
    const result2 = await connection.query(SQL2);

    connection.release();

    user = result.rows[0];
    product = result2.rows[0];

    token = jwt.sign(
      { user: { id: user.id, username: user.username } },
      SECRET_TOKEN
    );
  });

  it("[Testing]: The index Endpoint.", async () => {
    await request.get("/product/index").expect(200);
  });

  it("[Testing]: The show Endpoint.", async () => {
    await request.get(`/product/show/${product.id}`).expect(200);
  });

  it("[Testing]: The popularProducts Endpoint.", async () => {
    await request.get("/product/popularProducts").expect(200);
  });

  it("[Testing]: The index Endpoint.", async () => {
    await request.get(`/product/category/${product.category}`).expect(200);
  });
});
