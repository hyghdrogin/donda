import {Router} from "express";
import UserController from "../controllers/user";
import Authentication from "../middlewares/auth";
import validator from "../middlewares/validator";
// import parser from "../middlewares/uploads";


import { validateSignup, validateLogin, validateProfile} from "../validations/user";

const router = Router();
const { verifyToken } = Authentication;
const {
  createUser, loginUser, updateProfile
} = UserController;

router.post("/login",validator(validateLogin), loginUser);
router.post("/register", validator(validateSignup), createUser);
router.patch("/update",verifyToken, validator(validateProfile), updateProfile);

export default router;
