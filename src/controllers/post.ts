import { Request, Response } from "express";
import { isEmpty } from "lodash";
import models from "../models";
import { successResponse, errorResponse, handleError } from "../utils/responses";

/**
 * @class PostController
 * @description create, get, delete, update Post
 * @exports PostController
 */
export default class PostController {
  /**
   * @param {object} req - The reset request object
   * @param {object} res - The reset errorResponse object
   * @returns {object} Success message
   */
  static async createPost(req: Request, res: Response) {
    try {
      const { _id } = req.user;
      const { post } = req.body;
      const pst = await models.Post.create({ post, user_id: _id });
      return successResponse(res, 200, "Post created.", pst);
    } catch (error) {
      handleError(error, req);
      return errorResponse(res, 500, "Server error");
    }
  }

  /**
   * @param {object} req - The reset request object
   * @param {object} res - The reset errorResponse object
   * @returns {object} Success message
   */
  static async getAllPost(req: Request, res: Response) {
    try {
      const post = await models.Post.find({ });
      if (isEmpty(post)) {
        return successResponse(res, 204, "No content");
      }
      return successResponse(res, 200, "Post fetched successfully.", post);
    } catch (error) {
      handleError(error, req);
      return errorResponse(res, 500, "Server error");
    }
  }

  /**
   * @param {object} req - The reset request object
   * @param {object} res - The reset errorResponse object
   * @returns {object} Success message
   */
  static async getPostById(req: Request, res: Response) {
    try {
      const { postId } = req.params;
      const post = await models.Post.findById(postId);
      if (!post) {
        return errorResponse(res, 404, "Post not found.");
      }
      return successResponse(res, 200, "Post fetched successfully.", post);
    } catch (error) {
      handleError(error, req);
      return errorResponse(res, 500, "Server error");
    }
  }

  /**
   * @param {object} req - The reset request object
   * @param {object} res - The reset errorResponse object
   * @returns {object} Success message
   */
  static async updatePost(req: Request, res: Response) {
    try {
      const { postId } = req.params;
      const { post } = req.body;
      const pst = await models.Post.findByIdAndUpdate(postId, { post }, { new: true });
      return successResponse(res, 200, "Post updated successfully.", pst);
    } catch (error) {
      handleError(error, req);
      return errorResponse(res, 500, "Server error");
    }
  }

  /**
   * @param {object} req - The reset request object
   * @param {object} res - The reset errorResponse object
   * @returns {object} Success message
   */
  static async deletePost(req: Request, res: Response) {
    try {
      const { postId } = req.params;
      const post = await models.Post.findByIdAndDelete(postId);
      return successResponse(res, 200, "Post deleted successfully.", post);
    } catch (error) {
      handleError(error, req);
      return errorResponse(res, 500, "Server error");
    }
  }
}
