import { Router } from "express";
import CommentController from "../controllers/comment";
import Authentication from "../middlewares/auth";
import validator from "../middlewares/validator";
import { validateId, validatePost } from "../validations/comment";

const router = Router();
const { createComment, deleteComment } = CommentController;
const { verifyToken } = Authentication;

router.post("/:postId", verifyToken, validator(validatePost), createComment);

// router.get("/", verifyToken, validator(validateId), getAllPost);
// router.get("/:postId", verifyToken, validator(validateId), getPostById);

// router.patch("/:postId", verifyToken, validator(validateId), updatePost);
router.delete("/:commentId", verifyToken, validator(validateId), deleteComment);

export default router;
