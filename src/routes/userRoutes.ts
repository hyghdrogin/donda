import {Router} from "express";
import UserController from "../controllers/user";
import Authentication from "../middlewares/auth";
import validator from "../middlewares/validator";
// import parser from "../middlewares/uploads";


import {
  validateSignup, validateLogin, validateProfile, validateEmail, validateAccount
} from "../validations/user";

const router = Router();
const { verifyToken } = Authentication;
const {
  createUser, loginUser, updateProfile, resendOtp, verifyAccount
} = UserController;

router.post("/login",validator(validateLogin), loginUser);
router.post("/register", validator(validateSignup), createUser);
router.post("/otp/resend", validator(validateEmail), resendOtp);

router.patch("/update",verifyToken, validator(validateProfile), updateProfile);
router.patch("/verify", validator(validateAccount), verifyAccount);

export default router;
