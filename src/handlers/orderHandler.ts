import { Order, orderModel } from "../models/orderModel";
import { Request, Response } from "express";

const model = new orderModel();

export const index = async (req: Request, res: Response) => {
  try {
    const userId: string = req.userId as unknown as string;
    const orders: Order[] = await model.index(userId);
    res.json(orders);
  } catch (err) {
    res.status(500).send(`Server Error: ${err}`);
  }
};

export const completedOrders = async (req: Request, res: Response) => {
  try {
    const userId: string = req.userId as unknown as string;
    const orders: Order[] = await model.completedOrders(userId);
    res.json(orders);
  } catch (err) {
    res.status(500).send(`Server Error: ${err}`);
  }
};
