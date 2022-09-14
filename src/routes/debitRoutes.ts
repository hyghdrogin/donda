import { Router } from "express";
import DebitController from "../controllers/debit";
import Authentication from "../middlewares/auth";
import validator from "../middlewares/validator";
import validateDebit from "../validations/debit";

const router = Router();
const {
  sendMoney, requestWithdrawal, getDebitTransactions, getDebitTransactionById
} = DebitController;
const { verifyToken } = Authentication;

router.post("/", verifyToken, validator(validateDebit), sendMoney);
router.post("/withdrawal", verifyToken, validator(validateDebit), requestWithdrawal);

router.get("/", verifyToken, getDebitTransactions);
router.get("/:debitId", verifyToken, getDebitTransactionById);

export default router;
