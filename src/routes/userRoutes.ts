import { Router } from "express";
import UserController from "../controllers/user";
import Authentication from "../middlewares/auth";
import validator from "../middlewares/validator";
import parser from "../middlewares/upload";
import NotificationController from "../controllers/notification";
import { validateNotificationId } from "../validations/notification";

import {
  validateSignup, validateLogin, validateProfile, validateEmail, validateAccount
} from "../validations/user";

const router = Router();
const { verifyToken } = Authentication;
const { getNotificationById, getAllNotification, deleteNotification } = NotificationController;
const {
  createUser, loginUser, updateProfile, resendOtp, verifyAccount,
  uploadProfilePicture, getAllUsers, reset, recover
} = UserController;

router.post("/login", validator(validateLogin), loginUser);
router.post("/register", validator(validateSignup), createUser);
router.post("/otp/resend", validator(validateEmail), resendOtp);

router.get("/", verifyToken, getAllUsers);
router.get("/notifications", verifyToken, getAllNotification);
router.get("/notifications/:notificationId", verifyToken, getNotificationById);

router.patch("/update", verifyToken, validator(validateProfile), updateProfile);
router.patch("/verify", validator(validateAccount), verifyAccount);
router.patch("/profile-picture", verifyToken, parser.single("image"), uploadProfilePicture);
router.patch("/recover-account", validator(validateEmail), recover);
router.patch("/reset-password", validator(validateAccount), reset);

router.delete("/notifications/:notificationId", verifyToken, validator(validateNotificationId), deleteNotification);

export default router;
