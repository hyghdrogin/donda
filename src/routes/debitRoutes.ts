import { Router } from "express";
import DebitController from "../controllers/debit";
import Authentication from "../middlewares/auth";
import validator from "../middlewares/validator";
import validateDebit from "../validations/debit";

const router = Router();
const { sendMoney } = DebitController;
const { verifyToken } = Authentication;

router.post("/", verifyToken, validator(validateDebit), sendMoney);

export default router;
