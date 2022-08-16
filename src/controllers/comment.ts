import { Request, Response } from "express";
import models from "../models";
import { successResponse, errorResponse, handleError } from "../utils/responses"; 

 /**
 * @class PostController
 * @description create, get, delete, update Post
 * @exports PostController
 */
  export default class CommentController{

      /**
      * @param {object} req - The reset request object
      * @param {object} res - The reset errorResponse object
      * @returns {object} Success message
      */  
     static async createComment(req: Request, res: Response ) {
       try {
           const { _id } = req.user;
           const { postId } = req.params;
           const { post } = req.body;
    
           const reply = await models.Comment.create({ post, user_id: _id, post_id: postId})
           return successResponse(res, 200, "Commented.", reply);
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
      static async deleteComment(req: Request, res: Response) {
        try{
            const { commentId } = req.params;
            const reply = await models.Comment.findByIdAndDelete(commentId);
            return successResponse(res, 200, "Deleted successfully", reply);
        } catch (error) {
            handleError(error, req)
            return errorResponse(res, 500, "Server error.")
        }
      }


  }
   