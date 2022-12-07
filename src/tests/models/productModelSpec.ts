import { Order } from "../../models/orderModel";
import { Product, productModel } from "../../models/productModel";

const ProductModel = new productModel();
const productTestCase: Product = {
  id: 1,
  name: "Apple",
  price: 10,
  category: "Fruit",
};
const orderTestCase: Order = {
  id: 2,
  userid: 1,
  status: "complete",
  products: [
    {
      productId: "1",
      quantity: 1000,
    },
  ],
};

describe("Testing Product Model.", () => {
  it("[Testing]: index function return all products.", async () => {
    const product = await ProductModel.index();
    expect(product).toEqual([productTestCase]);
  });

  it("[Testing]: show function returns the product with specific id.", async () => {
    const product: Product = await ProductModel.show(
      productTestCase.id as number
    );

    expect(product).toEqual(productTestCase);
  });

  it("[Testing]: addProduct function add one product to the order specified by the order id", async () => {
    const order = await ProductModel.addProduct(
      orderTestCase.userid,
      orderTestCase.id as number,
      productTestCase.id as number,
      orderTestCase.products[0].quantity
    );

    expect(order).toEqual(orderTestCase);
  });

  it("[Testing]: popularProducts function returns the 5 most popular products.", async () => {
    const products: Product[] = await ProductModel.popularProducts();

    expect(products).toEqual([productTestCase]);
  });

  it("[Testing]: deleteProduct function delete one product to the order specified by the order id", async () => {
    const order = await ProductModel.deleteProduct(
      orderTestCase.userid,
      orderTestCase.id as number,
      productTestCase.id as number
    );

    orderTestCase.products = [];

    expect(order).toEqual(orderTestCase);
  });

  it("[Testing]: category function returns all products that fall into a specific category.", async () => {
    const products: Product[] = await ProductModel.category("Fruit");

    expect(products).toEqual([productTestCase]);
  });
});
