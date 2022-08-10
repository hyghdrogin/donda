import { Router } from "express";
import userRoutes from "./userRoutes";
import postRoutes from "./postRoutes";

const router = Router();

router.use("/users", userRoutes);
router.use("/post", postRoutes)

export default router;