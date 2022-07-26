import { Request, Response } from "express";
import { isEmpty } from "lodash";
import models from "../models";
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
  static async createfeedback(req: Request, res: Response) {
    try {
      const { _id } = req.details;
      const { feedback } = req.body;
      const newFeedback = await models.Feedback.create({ owner: _id, feedback });
      return successResponse(res, 201, "Feedback submitted.", newFeedback);
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
  static async getAllVerifiedFeedbacks(req: Request, res: Response) {
    try {
      const feedbacks = await models.Feedback.find({ verified: true });
      if (isEmpty(feedbacks)) return errorResponse(res, 404, "No verified feedbacks yet.");
      return successResponse(
        res,
        200,
        "All Verified feedbacks.",
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
  static async getNonVerifiedFeedbacks(req: Request, res: Response) {
    try {
      const unverifiedFeedbacks = await models.Feedback.find({ verified: false });
      return successResponse(
        res,
        200,
        "All Non-Verified feedbacks.",
        { total: unverifiedFeedbacks.length, unverifiedFeedbacks }
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

  /**
   * @param {object} req - The reset request object
   * @param {object} res - The reset errorResponse object
   * @returns {object} Success message
   */
  static async deleteFeedback(req: Request, res: Response) {
    try {
      const { feedbackId } = req.params;
      await models.Feedback.findByIdAndDelete(feedbackId);
      return successResponse(res, 200, "feedback deleted successfully.");
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
  static async verifyFeedback(req: Request, res: Response) {
    try {
      const { feedbackId } = req.params;
      const feedback = await models.Feedback.findById(feedbackId);
      if (!feedback) {
        return errorResponse(res, 404, "feedback not found.");
      }
      const updatedFeedback = await models.Feedback.findByIdAndUpdate(feedbackId, { verified: true }, { new: true });
      return successResponse(res, 200, "Feedback updated successfully.", updatedFeedback);
    } catch (error) {
      handleError(error, req);
      return errorResponse(res, 500, "Server error");
    }
  }
}
