import { Router } from "express";
import userRoutes from "./userRoutes";
import postRoutes from "./postRoutes";
import creditRoutes from "./creditRoutes";

const router = Router();

router.use("/users", userRoutes);
router.use("/posts", postRoutes);
router.use("/credits", creditRoutes);

export default router;