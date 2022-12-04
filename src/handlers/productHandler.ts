import { Product, productModel } from "../models/productModel";
import { Request, Response } from "express";

const model = new productModel();

export const index = async (req: Request, res: Response) => {
  try {
    const products: Product[] = await model.index();
    res.json(products);
  } catch (err) {
    res.status(500).send(`Server Error: ${err}`);
  }
};

export const show = async (req: Request, res: Response) => {
  try {
    const productId = Number(req.params.id);
    if (!productId) {
      res.status(400).send("[Error]: Didn't entered id");
      return;
    }
    const product: Product | null = await model.show(productId);
    if (product) {
      res.json(product);
    } else {
      res
        .status(400)
        .send(`[Error]: There are not user with id = ${productId}`);
    }
  } catch (err) {
    res.status(500).send(`Server Error: ${err}`);
  }
};

export const create = async (req: Request, res: Response) => {
  try {
    const userId: number = req.userId;
    const { status, products } = req.body;
    if (!products || !status) {
      res
        .status(400)
        .send(
          "[Error]: Missing some entries, (product id, quantity, status) are required."
        );
      return;
    }

    const productIdArray: string[] = [];
    const quantityArray: number[] = [];
    for (let i = 0; i < products.length; i++) {
      productIdArray.push(products[i].productId);
      quantityArray.push(products[i].quantity);
    }
    const newOrder = await model.create(
      userId,
      productIdArray,
      quantityArray,
      status
    );
    if (!(typeof newOrder === "number")) {
      res.json(newOrder);
    } else {
      res.status(400).send(`[Error]: The product id ${newOrder} is invalid.`);
    }
  } catch (err) {
    res.status(500).send(`Server Error: ${err}`);
  }
};

export const popularProducts = async (req: Request, res: Response) => {
  try {
    const products: Product[] = await model.popularProducts();
    res.json(products);
  } catch (err) {
    res.status(500).send(`Server Error: ${err}`);
  }
};
export const category = async (req: Request, res: Response) => {
  try {
    const { category } = req.params;
    if (!category) {
      res
        .status(400)
        .send("[Error]: Missing enter category, category entry are required.");
      return;
    }
    const result = await model.category(category);
    res.json(result);
  } catch (err) {
    res.status(500).send(`Server Error: ${err}`);
  }
};
