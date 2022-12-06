import { Router } from "express";
import {
  addProduct,
  category,
  deleteProduct,
  index,
  popularProducts,
  show,
} from "../../handlers/productHandler";
import { authorization } from "../middleware/authorization";

const router = Router();

router.get("/index", index);
router.get("/show/:id", show);
router.get("/popularProducts", popularProducts);
router.get("/category/:category", category);
router.post("/addProduct", authorization, addProduct);
router.delete("/deleteProduct", authorization, deleteProduct);

export default router;
