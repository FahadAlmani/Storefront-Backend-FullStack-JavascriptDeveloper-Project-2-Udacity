import { Router } from "express";
import { completedOrders, create, index } from "../../handlers/orderHandler";
import { authorization } from "../middleware/authorization";

const router = Router();

router.get("/index", authorization, index);
router.get("/completedOrders", authorization, completedOrders);
router.post("/create", authorization, create);

export default router;
