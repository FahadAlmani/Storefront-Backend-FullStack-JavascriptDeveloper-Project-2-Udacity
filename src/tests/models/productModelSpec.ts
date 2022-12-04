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

  it("[Testing]: popularProducts function returns the 5 most popular products.", async () => {
    const products: Product[] = await ProductModel.popularProducts();

    expect(products).toEqual([productTestCase]);
  });

  it("[Testing]: category function returns all products that fall into a specific category.", async () => {
    const products: Product[] = await ProductModel.category("Fruit");

    expect(products).toEqual([productTestCase]);
  });

  it("[Testing]: create function creates order with valid product id.", async () => {
    const products = orderTestCase.products;
    const productIdArray: string[] = [];
    const quantityArray: number[] = [];
    for (let i = 0; i < products.length; i++) {
      productIdArray.push(products[i].productId);
      quantityArray.push(products[i].quantity);
    }

    const order: Order | number = await ProductModel.create(
      orderTestCase.userid,
      productIdArray,
      quantityArray,
      orderTestCase.status
    );

    expect(order).toEqual(1);
  });
});
