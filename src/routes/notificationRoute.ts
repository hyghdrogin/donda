import { Router } from "express";
import UserNotification from "../controllers/notification";
import Authentication from "../middlewares/auth";
import validator from "../middlewares/validator";
import validateNotification from "../validations/notification";

const router = Router();
const { notifyUser } = UserNotification;
const { verifyToken, verifyAdmin } = Authentication;

router.post("/users", verifyToken, verifyAdmin, validator(validateNotification), notifyUser);

export default router;
