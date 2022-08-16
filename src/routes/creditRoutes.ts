import { Router } from "express";
import CreditController from "../controllers/transaction";
import Authentication from "../middlewares/auth";
import validator from "../middlewares/validator";
<<<<<<< HEAD
import validateCredit  from "../validations/credit";
=======
import validateCredit from "../validations/credit";
>>>>>>> d9da8e4835662e0b9a10e3b06563c9f2a16aa863

const router = Router();
const { createTransaction, verify } = CreditController;
const { verifyToken } = Authentication;

router.post("/initialize", verifyToken, validator(validateCredit), createTransaction);

router.get("/verify", verify);

export default router;
