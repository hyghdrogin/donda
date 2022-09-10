import { Request, Response } from "express";
import models from "../models";
import { IFilter } from "../utils/interface";
import { successResponse, errorResponse, handleError } from "../utils/responses";

/**
 * @class feedbackController
 * @description create, get, delete, update feedback
 * @exports FeedbackController
 */
export default class FeedbackController {
  /**
     * @param {object} req - The reset request object
     * @param {object} res - The reset errorResponse object
     * @returns {object} Success message
     */
  static async feedbacks(req: Request, res: Response) {
    try {
      const { email, feedback } = req.body;

      const emailExist = await models.User.findOne({ email });
      if (!emailExist) return errorResponse(res, 404, "email not found.");

      await models.Feedback.create({ feedback, email });
      if (!feedback) return errorResponse(res, 404, "Feedback not found. Please input your feedback.");
      return successResponse(res, 201, "Feedback submitted.");
    } catch (error) {
      handleError(error, req);
      return errorResponse(res, 500, "Server error.");
    }
  }

  /**
     * @param {object} req - The reset request object
     * @param {object} res - The reset errorResponse object
     * @returns {object} Success message
     */
  static async getAllFeedbacks(req: Request, res: Response) {
    try {
      const { status } = req.query;
      const filter = {} as IFilter;
      status ? filter.verified = status as string : filter.verified = "true";
      const feedbacks = await models.Feedback.find({ });
      return successResponse(
        res,
        200,
        "All feedbacks.",
        { total: feedbacks.length, feedbacks }
      );
    } catch (error) {
      handleError(error, req);
      return errorResponse(res, 500, "Server error.");
    }
  }

  /**
   * @param {object} req - The reset request object
   * @param {object} res - The reset errorResponse object
   * @returns {object} Success message
   */
  static async getFeedbackById(req: Request, res: Response) {
    try {
      const { feedbackId } = req.params;
      const feedback = await models.Feedback.findById(feedbackId);
      if (!feedback) {
        return errorResponse(res, 404, "feedback not found.");
      }
      return successResponse(res, 200, "feedback fetched successfully.", feedback);
    } catch (error) {
      handleError(error, req);
      return errorResponse(res, 500, "Server error");
    }
  }
}
