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
    static async createComment(req: Request, res: Response ) {
      try {
          const { content } = req.body;
          const { _id } = req.user;
  
          const comm = await models.Comment.create({ content, user_id: _id, })
          return successResponse(res, 200, "Post created.", comm);
      } catch (error) {
          handleError(error, req)
          return errorResponse(res, 500, "Server error")
      }
    }

 
}
