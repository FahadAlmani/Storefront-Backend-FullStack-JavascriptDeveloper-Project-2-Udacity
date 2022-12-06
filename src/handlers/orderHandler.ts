import { Order, orderModel } from "../models/orderModel";
import { Request, Response } from "express";

const model = new orderModel();

export const index = async (req: Request, res: Response) => {
  try {
    const userId: number = req.userId;
    const orders: Order[] = await model.index(userId);
    res.json(orders);
  } catch (err) {
    res.status(500).send(`Server Error: ${err}`);
  }
};

export const completedOrders = async (req: Request, res: Response) => {
  try {
    const userId: number = req.userId;
    const orders: Order[] = await model.completedOrders(userId);
    res.json(orders);
  } catch (err) {
    res.status(500).send(`Server Error: ${err}`);
  }
};

export const create = async (req: Request, res: Response) => {
  try {
    const userId: number = req.userId;
    const { status } = req.body;
    if (!status) {
      res
        .status(400)
        .send(
          "[Error]: Missing some entries, (product id, quantity, status) are required."
        );
      return;
    }
    const newOrder = await model.create(userId, status);

    res.json(newOrder);
  } catch (err) {
    res.status(500).send(`Server Error: ${err}`);
  }
};
