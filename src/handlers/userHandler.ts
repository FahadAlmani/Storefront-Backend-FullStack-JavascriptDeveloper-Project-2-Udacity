import { User, userModel } from "../models/userModel";
import { Request, Response } from "express";
import jwt from "jsonwebtoken";

const model = new userModel();
const SECRET_TOKEN = process.env.SECRET_TOKEN as string;

export const register = async (req: Request, res: Response): Promise<void> => {
  try {
    const { firstname, lastname, username, password } = req.body;
    if (!firstname || !lastname || !username || !password) {
      res
        .status(400)
        .send(
          "[Error]: Missing some entries, (First name, Last name, username, password) are required."
        );
      return;
    }

    const user: User = { firstname, lastname, username, password };

    const newUser: User | null = await model.register(user);
    if (newUser != null) {
      const token = jwt.sign(
        { user: { id: newUser.id, username: newUser.username } },
        SECRET_TOKEN
      );
      res.json(token);
    } else {
      res.status(400).send(`[Error]: The entered username is exist.`);
    }
  } catch (err) {
    res.status(500).send(`Server Error: ${err}`);
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { username, password } = req.body;
    if (!username || !password) {
      res
        .status(400)
        .send(
          "[Error]: Missing some entries, (username, password) are required."
        );
      return;
    }
    const user: User | null = await model.login(username, password);

    if (!user) {
      res.status(401).send(`[Error]: Wrong information.`);
      return;
    } else {
      const token = jwt.sign(
        { user: { id: user.id, username: user.username } },
        SECRET_TOKEN
      );
      res.json(token);
    }
  } catch (err) {
    res.status(500).send(`Server Error: ${err}`);
  }
};

export const index = async (req: Request, res: Response) => {
  try {
    const users: User[] = await model.index();
    res.json(users);
  } catch (err) {
    res.status(500).send(`Server Error: ${err}`);
  }
};

export const show = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    if (!id) {
      res.status(400).send("[Error]: Didn't entered wrong id (not number id)");
      return;
    }

    const user = await model.show(id);
    if (user) {
      res.json(user);
    } else {
      res.status(400).send(`[Error]: There are not user with id = ${id}`);
    }
  } catch (err) {
    res.status(500).send(`Server Error: ${err}`);
  }
};
