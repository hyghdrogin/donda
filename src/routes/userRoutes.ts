import { Router } from "express";
import UserController from "../controllers/user";
import Authentication from "../middlewares/auth";
import validator from "../middlewares/validator";
import parser from "../middlewares/upload";

import {
  validateSignup, validateLogin, validateProfile, validateEmail, validateAccount
} from "../validations/user";

const router = Router();
const { verifyToken } = Authentication;
const {
  createUser, loginUser, updateProfile, resendOtp, verifyAccount, uploadProfilePicture, getAllUsers
} = UserController;

router.post("/login", validator(validateLogin), loginUser);
router.post("/register", validator(validateSignup), createUser);
router.post("/otp/resend", validator(validateEmail), resendOtp);

router.get("/", verifyToken, getAllUsers);

router.patch("/update", verifyToken, validator(validateProfile), updateProfile);
router.patch("/verify", validator(validateAccount), verifyAccount);
router.patch("/profile-picture", verifyToken, parser.single("image"), uploadProfilePicture);

export default router;
