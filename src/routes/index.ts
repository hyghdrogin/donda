import { Router } from "express";
import userRoutes from "./userRoutes";
import postRoutes from "./postRoutes";
import googleRoutes from "./googleRoutes";
import commentRoutes from "./commentRoutes";
import creditRoutes from "./creditRoutes";
import debitRoutes from "./debitRoutes";
import adminRoutes from "./adminRoutes";
import feedbackRoutes from "./feedbackRoutes";
import notificationRoutes from "./notificationRoutes";

const router = Router();

router.use("/users", userRoutes);
router.use("/posts", postRoutes);
router.use("/google", googleRoutes);
router.use("/comments", commentRoutes);
router.use("/credits", creditRoutes);
router.use("/debits", debitRoutes);
router.use("/admins", adminRoutes);
router.use("/feedbacks", feedbackRoutes);
router.use("/notifications", notificationRoutes);

export default router;
