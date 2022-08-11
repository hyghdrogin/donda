import { Router } from "express";
// import PostController from "../controllers/post";
import Authentication from "../middlewares/auth";

const router = Router();
// const { createPost, getPostById, getAllPost } = PostController;
const { verifyToken } = Authentication;

// router.post("/comment", verifyToken, createComment);

export default router;
