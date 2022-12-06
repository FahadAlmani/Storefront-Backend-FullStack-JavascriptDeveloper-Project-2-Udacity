import { Connection } from "pg";
import client from "../database";

export type Order = {
  id?: number;
  userid: number;
  status: string;
  products: { productId: string; quantity: number }[];
};

export class orderModel {
  index = async (userId: string): Promise<Order[]> => {
    const connection = await client.connect();
    const SQL = `SELECT * FROM (SELECT id, status from orders WHERE userid = '${userId}') as userOrders INNER JOIN  order_products on id = orderid`;
    const result = await connection.query(SQL);
    connection.release();
    const orders = result.rows;

    const fucResult: Order[] = [];
    let temp: Order = {
      id: orders[0].id,
      userid: Number(userId),
      status: orders[0].status,
      products: [
        { productId: orders[0].productid, quantity: orders[0].quantity },
      ],
    };

    for (let i = 1; i < orders.length; i++) {
      if (temp.id != orders[i].id) {
        fucResult.push(temp);
        temp = {
          id: orders[i].id,
          userid: Number(userId),
          status: orders[0].status,
          products: [
            { productId: orders[i].productid, quantity: orders[i].quantity },
          ],
        };
      } else {
        temp.products.push({
          productId: orders[i].productid,
          quantity: orders[i].quantity,
        });
      }
    }

    fucResult.push(temp);
    return fucResult;
  };

  completedOrders = async (userId: string): Promise<Order[]> => {
    const connection = await client.connect();
    const SQL = `SELECT * FROM (SELECT id, status from orders WHERE userid = '${userId}' and status = 'complete') as userOrder INNER JOIN  order_products on id = orderid`;
    const result = await connection.query(SQL);
    connection.release();
    const orders = result.rows;

    const fucResult: Order[] = [];
    let temp: Order = {
      id: orders[0].id,
      userid: Number(userId),
      status: orders[0].status,
      products: [
        { productId: orders[0].productid, quantity: orders[0].quantity },
      ],
    };

    for (let i = 1; i < orders.length; i++) {
      if (temp.id != orders[i].id) {
        fucResult.push(temp);
        temp = {
          id: orders[i].id,
          userid: Number(userId),
          status: orders[0].status,
          products: [
            { productId: orders[i].productid, quantity: orders[i].quantity },
          ],
        };
      } else {
        temp.products.push({
          productId: orders[i].productid,
          quantity: orders[i].quantity,
        });
      }
    }

    fucResult.push(temp);
    return fucResult;
  };

  addProduct = async (
    userID: string,
    orderID: string,
    productID: string,
    quantity: number
  ) => {
    const connection = await client.connect();
    const SQLtest1 = `SELECT FROM order WHERE id = ${orderID} and userid = ${userId} RETURNING *`;
    const test1 = await connection.query(SQLtest1);

    if (!test1.rowCount) {
      connection.release();
      return { err: "orderId", value: orderID };
    }

    const SQLtest2 = `SELECT FROM product WHERE id = ${productID} RETURNING *`;
    const test2 = await connection.query(SQLtest2);

    if (!test2.rowCount) {
      connection.release();
      return { err: "productId", value: productID };
    }

    if (quantity <= 0) {
      connection.release();
      return { err: "quantity", value: quantity };
    }

    const SQLadd = `INSERT INTO order_product(${orderID}, ${productID},${quantity})`;
    await connection.query(SQLadd);
    const SQLfind = `SELECT * FROM order_products WHERE orderid = ${orderID}`;
    const findResult = await connection.query(SQLfind);
    const orders = findResult.rows;
    const SQLstatus = `SELECT status FROM order WHERE orderid = ${orderID}`;
    const statusResult = await connection.query(SQLstatus);
    const status = statusResult.rows[0].status;

    const orderAfterAddition: Order = {
      id: orderID,
      userid: userID,
      status: status,
      products: {},
    };
  };
}
