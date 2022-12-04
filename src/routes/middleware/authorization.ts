import { Response, Request, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";

const SECRET_TOKEN = process.env.SECRET_TOKEN as string;

export const authorization = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const headerValues = req.headers?.authorization;
    const token: string = headerValues?.split(" ")[1] as string;
    if (!token) {
      res.status(400).send(`[Error]: There are no authorization token entered`);
      return;
    }
    const verify = jwt.verify(token, SECRET_TOKEN) as JwtPayload;

    req.userId = verify.user.id as number;
    next();
  } catch (err) {
    res.status(400).send(`[Error]: Something wrong in entered Token.`);
  }
};
