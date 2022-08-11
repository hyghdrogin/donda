import { Router } from "express";
import CreditController from "../controllers/transaction";
import Authentication from "../middlewares/auth";
import validator from "../middlewares/validator";
import { validateCredit } from "../validations/credit";

const router = Router();
const { createTransaction, verify } = CreditController;
const { verifyToken } = Authentication;

router.post("/initialize", verifyToken, validator(validateCredit), createTransaction);

router.get("/verify", verify);

export default router;
