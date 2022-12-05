import { Router } from "express";
import userRouter from "./endpoint/userEndpoint";
import productRouter from "./endpoint/productEndpoint";
import orderRouter from "./endpoint/orderEndpoint";
const router = Router();

router.use("/user", userRouter);
router.use("/", productRouter);
router.use("/order", orderRouter);
export default router;
