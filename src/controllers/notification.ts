import { Request, Response } from "express";
import models from "../models";
import { successResponse, errorResponse, handleError } from "../utils/responses";
import sendEmail from "../utils/email";

/**
 * @class UserNotification
 * @description Notify Users
 * @exports UserNotification
 */
export default class UserNotification {
  /**
   * @param {object} req - The reset request object
   * @param {object} res - The reset errorResponse object
   * @returns {object} Success message
   */
  static async notifyUser(req: Request, res: Response) {
    try {
      const { _id } = req.user;
      const { title, message, email } = req.body;
      const user = await models.User.findById(_id);
      if (!user) {
        return errorResponse(res, 404, "User Not Found");
      }
      const receiver = await models.User.findOne({ email });
      if (!receiver) {
        return errorResponse(res, 401, "Recipient does not exist");
      }
      console.log(receiver);
      const subject = title;
      await sendEmail(email, subject, message);
      return successResponse(
        res,
        200,
        "Notification sent",
      );
    } catch (error) {
      handleError(error, req);
      return errorResponse(res, 500, "Server error");
    }
  }
}
