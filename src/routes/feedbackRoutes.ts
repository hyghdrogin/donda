import { Router } from "express";
import FeedbackController from "../controllers/feedback";
import Authentication from "../middlewares/auth";
import validator from "../middlewares/validator";
import { validateFeedback, validateId } from "../validations/feedback";

const router = Router();
const {
  createfeedback, getAllVerifiedFeedbacks, getFeedbackById, verifyFeedback, getNonVerifiedFeedbacks, deleteFeedback
} = FeedbackController;
const { verifyToken, verifyAdmin } = Authentication;

router.post("/", verifyToken, validator(validateFeedback), createfeedback);

router.get("/getAllVerified", verifyToken, getAllVerifiedFeedbacks);
router.get("/getNonVerified", verifyToken, verifyAdmin, getNonVerifiedFeedbacks);
router.get("/:feedbackId", verifyToken, validator(validateId), getFeedbackById);

router.patch("/:feedbackId", verifyToken, verifyAdmin, verifyFeedback);

router.delete("/:feedbackId", verifyToken, verifyAdmin, deleteFeedback);

export default router;
