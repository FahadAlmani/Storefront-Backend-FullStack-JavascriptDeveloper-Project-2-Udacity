import { Router } from "express";
import { completedOrders, index } from "../../handlers/orderHandler";
import { authorization } from "../middleware/authorization";

const router = Router();

router.get("/index", authorization, index);
router.get("/completedOrders", authorization, completedOrders);

export default router;
