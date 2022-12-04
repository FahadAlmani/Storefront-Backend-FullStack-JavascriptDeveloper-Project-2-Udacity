import { Router } from "express";
import { register, login, index, show } from "../../handlers/userHandler";
import { authorization } from "../middleware/authorization";

const router = Router();

router.post("/register", register);
router.post("/login", login);
router.get("/index", authorization, index);
router.get("/show/:id", authorization, show);

export default router;
