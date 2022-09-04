import { Router } from "express";
import AdminController from "../controllers/admin";
import Authentication from "../middlewares/auth";
import validator from "../middlewares/validator";
import validateUser from "../validations/admin";

const router = Router();
const { activeDeactivateUser } = AdminController;
const { verifyToken, verifyAdmin } = Authentication;

router.patch("/users/:userId", verifyToken, verifyAdmin, validator(validateUser), activeDeactivateUser);

export default router;
