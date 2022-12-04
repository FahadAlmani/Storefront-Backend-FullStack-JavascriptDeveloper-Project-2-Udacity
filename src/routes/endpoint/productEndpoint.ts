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

router.get("/index", index);
router.get("/show/:id", show);
router.post("/create", authorization, create);
router.get("/popularProducts", popularProducts);
router.get("/category/:category", category);

export default router;
