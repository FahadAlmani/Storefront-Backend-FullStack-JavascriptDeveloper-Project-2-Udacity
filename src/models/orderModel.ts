import { Connection } from "pg";
import client from "../database";

export type Order = {
  id?: number;
  userid: number;
  status: string;
  products: { productId: string; quantity: number }[];
};

export class orderModel {
  index = async (userId: number): Promise<Order[]> => {
    const connection = await client.connect();
    const SQL = `SELECT * FROM (SELECT id, status FROM orders WHERE userid = '${userId}') as userOrders INNER JOIN  order_products on id = orderid`;
    const result = await connection.query(SQL);
    connection.release();

    if (!result.rowCount) {
      return [];
    }
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

  completedOrders = async (userId: number): Promise<Order[]> => {
    const connection = await client.connect();
    const SQL = `SELECT * FROM (SELECT id, status FROM orders WHERE userid = '${userId}' and status = 'complete') as userOrder INNER JOIN  order_products on id = orderid`;
    const result = await connection.query(SQL);
    connection.release();

    if (!result.rowCount) {
      return [];
    }
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

  create = async (userId: number, status: string): Promise<Order | number> => {
    const connection = await client.connect();
    const SQLorder = `INSERT INTO orders (userId, status) VALUES ('${userId}', '${status}') RETURNING id`;
    const resultOrder = await connection.query(SQLorder);
    const orderId: number = resultOrder.rows[0].id;

    const result: Order = {
      id: orderId,
      userid: userId,
      status: status,
      products: [],
    };

    connection.release();
    return result;
  };
}
