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

  addProduct = async (
    userID: number,
    orderID: number,
    productID: number,
    quantity: number
  ): Promise<Order | number> => {
    const connection = await client.connect();
    const SQLtest1 = `SELECT * FROM orderS WHERE id = ${orderID} and userid = ${userID}`;
    const test1 = await connection.query(SQLtest1);

    if (!test1.rowCount) {
      connection.release();
      return 0;
    }
    const SQLtest2 = `SELECT * FROM products WHERE id = ${productID}`;
    const test2 = await connection.query(SQLtest2);

    if (!test2.rowCount) {
      connection.release();
      return 1;
    }

    if (quantity <= 0) {
      connection.release();
      return 2;
    }

    const SQLadd = `INSERT INTO order_products VALUES (${orderID}, ${productID},${quantity})`;
    await connection.query(SQLadd);
    const SQLfind = `SELECT * FROM order_products WHERE orderid = ${orderID}`;
    const findResult = await connection.query(SQLfind);
    const orders = findResult.rows;
    const SQLstatus = `SELECT status FROM orders WHERE id = ${orderID}`;
    const statusResult = await connection.query(SQLstatus);
    const status = statusResult.rows[0].status;

    const orderAfterAddition: Order = {
      id: orderID,
      userid: userID,
      status: status,
      products: [],
    };
    for (let i = 0; i < orders.length; i++) {
      orderAfterAddition.products.push({
        productId: orders[i].productid,
        quantity: orders[i].quantity,
      });
    }
    return orderAfterAddition;
  };

  deleteProduct = async (
    userID: number,
    orderID: number,
    productID: number
  ): Promise<Order | number> => {
    const connection = await client.connect();
    const SQLtest1 = `SELECT * FROM orderS WHERE id = ${orderID} and userid = ${userID}`;
    const test1 = await connection.query(SQLtest1);

    if (!test1.rowCount) {
      connection.release();
      return 0;
    }

    const SQLtest2 = `SELECT * FROM products WHERE id = ${productID}`;
    const test2 = await connection.query(SQLtest2);

    if (!test2.rowCount) {
      connection.release();
      return 1;
    }

    const SQLtest3 = `SELECT * FROM order_products WHERE orderid = ${orderID} AND productid = ${productID}`;
    const test3 = await connection.query(SQLtest3);
    if (!test3.rowCount) {
      connection.release();
      return 2;
    }

    const SQLdelete = `DELETE FROM order_products WHERE orderid = ${orderID} AND productid = ${productID}`;
    await connection.query(SQLdelete);
    const SQLfind = `SELECT * FROM order_products WHERE orderid = ${orderID}`;
    const findResult = await connection.query(SQLfind);
    const orders = findResult.rows;
    const SQLstatus = `SELECT status FROM orders WHERE id = ${orderID}`;
    const statusResult = await connection.query(SQLstatus);
    const status = statusResult.rows[0].status;

    const orderAfterAddition: Order = {
      id: orderID,
      userid: userID,
      status: status,
      products: [],
    };
    for (let i = 0; i < orders.length; i++) {
      orderAfterAddition.products.push({
        productId: orders[i].productid,
        quantity: orders[i].quantity,
      });
    }
    return orderAfterAddition;
  };
}
