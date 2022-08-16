import { Router } from "express";
import PostController from "../controllers/post";
import Authentication from "../middlewares/auth";
import validator from "../middlewares/validator";
import { validateId, validatePost } from "../validations/post";

const router = Router();
const { createPost,  getAllPost, getPostById, updatePost, deletePost} = PostController;
const { verifyToken } = Authentication;

router.post("/", verifyToken, validator(validatePost), createPost);


router.get("/", verifyToken, validator(validateId), getAllPost);
router.get("/:postId", verifyToken, validator(validateId), getPostById);

router.patch("/:postId", verifyToken, validator(validateId), updatePost);
router.delete("/:postId", verifyToken, validator(validateId), deletePost);

export default router;