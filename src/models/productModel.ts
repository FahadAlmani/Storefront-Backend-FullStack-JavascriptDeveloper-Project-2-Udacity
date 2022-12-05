import client from "../database";
import { Order } from "./orderModel";

export type Product = {
  id?: number;
  name: string;
  price: number;
  category: string;
};

export class productModel {
  index = async (): Promise<Product[]> => {
    const connection = await client.connect();
    const SQL = `SELECT * FROM products`;
    const result = await connection.query(SQL);
    connection.release();
    const products: Product[] = result.rows;
    return products;
  };

  show = async (id: number): Promise<Product> => {
    const connection = await client.connect();
    const SQL = `SELECT * FROM products WHERE id = ${id}`;
    const result = await connection.query(SQL);
    connection.release();
    const product = result.rows[0];

    return product;
  };

  create = async (
    userId: number,
    productsID: string[],
    quantity: number[],
    status: string
  ): Promise<Order | number> => {
    const connection = await client.connect();
    const testSQL = `SELECT id FROM products`;
    const testResult = await connection.query(testSQL);
    const productsId: string[] = testResult.rows;
    const orders = [];
    console.log(productsId);

    for (let i = 0; i < productsID.length; i++) {
      if (!(productsID[i] in productsId)) {
        connection.release();
        return Number(productsID[i]);
      }
    }
    const SQLorder = `INSERT INTO orders (userId, status) VALUES ('${userId}', '${status}') RETURNING id`;
    const resultOrder = await connection.query(SQLorder);
    const orderId: number = resultOrder.rows[0].id;

    for (let i = 0; i < productsID.length; i++) {
      const SQL = `INSERT INTO order_products VALUES ('${orderId}', '${productsID[i]}', ${quantity[i]}) RETURNING productid, quantity `;
      const temp = await connection.query(SQL);
      const order = temp.rows[0];
      orders.push({ productId: order.productid, quantity: order.quantity });
    }

    const result: Order = {
      id: orderId,
      userid: Number(userId),
      status: status,
      products: orders,
    };

    connection.release();
    return result;
  };

  popularProducts = async (): Promise<Product[]> => {
    const connection = await client.connect();
    const SQL = `SELECT products.* FROM products, (SELECT productId, SUM (quantity) from order_products group by productId order by sum DESC limit 5) as mostProduct WHERE products.id = mostProduct.productId order by mostProduct.sum DESC`;
    const result = await connection.query(SQL);
    connection.release();
    return result.rows;
  };

  category = async (category: string): Promise<Product[]> => {
    const connection = await client.connect();
    const SQL = `SELECT * FROM products WHERE category = '${category}'`;
    const result = await connection.query(SQL);
    connection.release;
    return result.rows;
  };
}
