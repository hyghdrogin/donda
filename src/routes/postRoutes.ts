import { Router } from "express";
import PostController from "../controllers/post";
import Authentication from "../middlewares/auth";
import validator from "../middlewares/validator";
import { validatePost, validateId } from "../validations/post";

const router = Router();
const { createPost, getPostById, getAllPost } = PostController;
const { verifyToken } = Authentication;

router.post("/", verifyToken, validator(validatePost), createPost);

router.get("/", verifyToken, getAllPost);
router.get("/:postId", verifyToken, validator(validateId), getPostById);

router.delete("/:postId", verifyToken, validator(validateId), getPostById);
router.patch("/:postId", verifyToken, validator(validateId), getPostById);

export default router;
