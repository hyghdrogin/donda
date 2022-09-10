import { Router } from "express";
import AdminController from "../controllers/admin";
import Authentication from "../middlewares/auth";
import validator from "../middlewares/validator";
import validateUser from "../validations/admin";
import { validateNotification } from "../validations/notification";
import NotificationController from "../controllers/notification";

const router = Router();
const { createNotification } = NotificationController;
const { activeDeactivateUser } = AdminController;
const { verifyToken, verifyAdmin } = Authentication;

router.patch("/users/:userId", verifyToken, verifyAdmin, validator(validateUser), activeDeactivateUser);
router.post("/users/notifications", verifyToken, verifyAdmin, validator(validateNotification), createNotification);

export default router;
