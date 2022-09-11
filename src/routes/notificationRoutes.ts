import { Router } from "express";
import notificationController from "../controllers/notification";
import Authentication from "../middlewares/auth";
import validator from "../middlewares/validator";
import { validateNotification, validateNotificationId } from "../validations/notification";

const router = Router();
const { createNotification, createBulkNotification } = notificationController;
const { verifyToken, verifyAdmin } = Authentication;
const { getNotificationById, getAllNotification, deleteNotification } = notificationController;

router.post("/", verifyToken, verifyAdmin, validator(validateNotification), createNotification);
router.post("/users", verifyToken, verifyAdmin, validator(validateNotification), createBulkNotification);

router.get("/", verifyToken, getAllNotification);
router.get("/:notificationId", verifyToken, getNotificationById);

router.delete("/:notificationId", verifyToken, validator(validateNotificationId), deleteNotification);

export default router;
