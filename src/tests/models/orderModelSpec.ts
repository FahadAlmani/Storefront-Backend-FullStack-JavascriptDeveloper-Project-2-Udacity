import client from "../../database";
import { Order, orderModel } from "../../models/orderModel";

const testedModel = new orderModel();
const orderTestCase: Order = {
  id: 1,
  userid: 1,
  status: "complete",
  products: [{ productId: "1", quantity: 100 }],
};
let userId: string;

describe("Testing Order Model.", () => {
  beforeAll(async () => {
    const connection = await client.connect();

    const SQL = "SELECT * FROM users WHERE id = 1";
    const result = await connection.query(SQL);
    connection.release();

    userId = result.rows[0].id;
  });
  it("[Testing]: index function returns all user orders.", async () => {
    const orders: Order[] = await testedModel.index(userId);
    expect(orders).toEqual([orderTestCase]);
  });

  it("[Testing]: completedOrders function returns all user completed orders.", async () => {
    const orders: Order[] = await testedModel.completedOrders(userId);
    expect(orders).toEqual([orderTestCase]);
  });
});
