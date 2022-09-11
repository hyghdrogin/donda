import { Router } from "express";
import FeedbackController from "../controllers/feedback";
import Authentication from "../middlewares/auth";
import validator from "../middlewares/validator";
import { validateFeedback, validateId } from "../validations/feedback";

const router = Router();
const { createfeedback, getAllVerifiedFeedbacks, getFeedbackById } = FeedbackController;
const { verifyToken } = Authentication;

router.post("/", verifyToken, validator(validateFeedback), createfeedback);
router.get("/getAll", verifyToken, getAllVerifiedFeedbacks);

router.get("/:feedbackId", verifyToken, validator(validateId), getFeedbackById);

export default router;
