import { Router } from "express";
import userRoutes from "./userRoutes";
import postRoutes from "./postRoutes";
import commentRoutes from "./commentRoutes";
import creditRoutes from "./creditRoutes";
import debitRoutes from "./debitRoutes";

const router = Router();

router.use("/users", userRoutes);
router.use("/posts", postRoutes);
router.use("/comments", commentRoutes);
router.use("/credits", creditRoutes);
router.use("/debits", debitRoutes);

export default router;
