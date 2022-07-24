import {Router} from "express";
import UserController from "../controllers/user";
// import Authentication from "../middlewares/authenticate";
import validator from "../middlewares/validator";
// import parser from "../middlewares/uploads";


import { validateSignup, validateLogin, validateProfile} from "../validations/user";

const router = Router();
// const { verifyToken } = Authentication;
const {
  createUser, loginUser
} = UserController;

router.post("/login",validator(validateLogin), loginUser);
router.post("/register", validator(validateSignup), createUser);

export default router;
