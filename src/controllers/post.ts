import { NextFunction, Request, Response } from 'express';
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
      try{
          const { _id } = req.user;
          const { post } = req.body;
          const createdPost =  await models.Post.create({ post, user: _id} );
          return successResponse(res, 200, "Post created.", createdPost);
      } catch (error) {
          handleError(error, req)
          return errorResponse(res, 500, "Server error")
      }
    }
    
    
    /**
     * @param {object} req - The reset request object
     * @param {object} res - The reset errorResponse object
     * @returns {object} Success message
   */
     static async getAllPost(req: Request, res: Response) {
      try{
          const post =  await models.Post.find({  });
          return successResponse(res, 200, "Post fetched successfully.", post);
      } catch (error) {
          handleError(error, req)
          return errorResponse(res, 500, "Server error")
      }
    }
    
    /**
     * @param {object} req - The reset request object
     * @param {object} res - The reset errorResponse object
     * @returns {object} Success message
   */
     static async getPostById(req: Request, res: Response) {
      try{
        const { postId } = req.params;
        const post = await models.Post.findById(postId);
        if (!post) { return errorResponse(res, 404, "Post not found.")}
          return successResponse(res, 200, "Post fetched successfully.", post);
      } catch (error) {
          handleError(error, req)
          return errorResponse(res, 500, "Server error")
      }
    }
 
}
