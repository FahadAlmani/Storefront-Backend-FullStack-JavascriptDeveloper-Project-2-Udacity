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
}
