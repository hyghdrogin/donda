import { Router } from "express";
import UserController from "../controllers/user";
import Authentication from "../middlewares/auth";

const router = Router();
const { postMsg, createComment } = UserController;
const { verifyToken } = Authentication;

router.post("/post", verifyToken, postMsg);
router.post("/comment", verifyToken, createComment);


export default router;