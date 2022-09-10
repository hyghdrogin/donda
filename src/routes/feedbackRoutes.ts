import { Router } from "express";
import FeedbackController from "../controllers/feedback";
import Authentication from "../middlewares/auth";
import validator from "../middlewares/validator";
import { validateFeedback, validateId } from "../validations/feedback";

const router = Router();
const { feedbacks, getAllFeedbacks, getFeedbackById } = FeedbackController;
const { verifyToken } = Authentication;

router.post("/", verifyToken, validator(validateFeedback), feedbacks);
router.get("/getAll", verifyToken, getAllFeedbacks);

router.patch("/:feedbackId", verifyToken, validator(validateId), getFeedbackById);

export default router;
