import { Router } from "express";
import {
  category,
  create,
  index,
  popularProducts,
  show,
} from "../../handlers/productHandler";
import { authorization } from "../middleware/authorization";

const router = Router();

router.get("product/index", index);
router.get("product/show/:id", show);
router.get("product/popularProducts", popularProducts);
router.get("product/category/:category", category);
router.post("order/create", authorization, create);

export default router;
