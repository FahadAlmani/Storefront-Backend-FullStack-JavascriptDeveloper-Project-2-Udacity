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
      res.status(400).send("[Error]: Product id is required.");
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

export const addProduct = async (req: Request, res: Response) => {
  try {
    const userId: number = req.userId;
    const { orderId, productId, quantity } = req.body;
    if (!orderId || !productId || !quantity) {
      res
        .status(400)
        .send(
          "[Error]: Missing some entries, (order id, product id, quantity) are required."
        );
    }

    const result = await model.addProduct(userId, orderId, productId, quantity);
    if (result === 0) {
      res.status(400).send("[Error]: Entered wrong order id.");
      return;
    } else if (result === 1) {
      res.status(400).send("[Error]: Entered wrong product id.");
      return;
    } else if (result === 2) {
      res.status(400).send("[Error]: Quantity can't take number less than 1.");
      return;
    }

    res.json(result);
  } catch (err) {
    res.status(500).send(`Server Error: ${err}`);
  }
};

export const deleteProduct = async (req: Request, res: Response) => {
  try {
    const userId: number = req.userId;
    const { orderId, productId } = req.body;
    if (!orderId || !productId) {
      res
        .status(400)
        .send(
          "[Error]: Missing some entries, (order id, product id) are required."
        );
    }

    const result = await model.deleteProduct(userId, orderId, productId);

    if (result === 0) {
      res.status(400).send("[Error]: Entered wrong order id.");
      return;
      return;
    } else if (result === 1) {
      res.status(400).send("[Error]: Entered wrong product id.");
      return;
    } else if (result === 2) {
      res
        .status(400)
        .send("[Error]: There are no product with this product id.");
      return;
    }

    res.json(result);
  } catch (err) {
    res.status(500).send(`Server Error: ${err}`);
  }
};
