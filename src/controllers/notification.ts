import { Request, Response } from "express";
import { isEmpty } from "lodash";
import models from "../models";
import { successResponse, errorResponse, handleError } from "../utils/responses";

/**
 * @class NotificationController
 * @description create, get, delete Notification
 * @exports NotificationController
 */
export default class NotificationController {
  /**
   * @param {object} req - The reset request object
   * @param {object} res - The reset errorResponse object
   * @returns {object} Success message
   */
  static async createNotification(req: Request, res: Response) {
    try {
      const { _id } = req.user;
      const { title, message, email } = req.body;
      const user = await models.User.findById(_id);
      if (!user) {
        return errorResponse(res, 404, "Kindly log in.");
      }
      if (user.role !== "admin") {
        return errorResponse(res, 404, "Unauthorized access");
      }
      const receiver = await models.User.findOne({ email });
      if (!receiver) {
        return errorResponse(res, 404, "Receiver does not exist.");
      }
      const notify = await models.Notification.create({
        title,
        message,
        user_id: _id,
        receiver: email
      });
      return successResponse(res, 200, "Notification created.", notify);
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
  static async getAllNotification(req: Request, res: Response) {
    try {
      const { _id } = req.user;
      const user = await models.User.findById(_id);
      if (!user) {
        return errorResponse(res, 404, "Kindly log in.");
      }
      const notification = await models.Notification.findOne({ });
      if (isEmpty(notification)) {
        return successResponse(res, 204, "No content");
      }
      console.log(notification.receiver);
      if (user.email !== notification.receiver) {
        return successResponse(res, 204, "No content");
      }
      return successResponse(res, 200, "Notification fetched successfully.", notification);
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
  static async getNotificationById(req: Request, res: Response) {
    try {
      const { _id } = req.user;
      const { notificationId } = req.params;
      const user = await models.User.findById(_id);
      if (!user) {
        return errorResponse(res, 404, "Kindly log in.");
      }
      const notification = await models.Notification.findById(notificationId);
      if (!notification) {
        return errorResponse(res, 404, "Notification not found.");
      }
      if (user.email !== notification.receiver) {
        return successResponse(res, 204, "No content");
      }
      return successResponse(res, 200, "Notification fetched successfully.", notification);
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
  static async deleteNotification(req: Request, res: Response) {
    try {
      const { _id } = req.user;
      const { notificationId } = req.params;
      const user = await models.User.findById(_id);
      if (!user) {
        return errorResponse(res, 404, "Kindly log in.");
      }
      const notification = await models.Notification.findByIdAndDelete(notificationId);
      console.log(notification?.receiver);
      if (user.email !== notification?.receiver) {
        return successResponse(res, 204, "No content");
      }
      return successResponse(res, 200, "Notification deleted successfully.", notification);
    } catch (error) {
      handleError(error, req);
      return errorResponse(res, 500, "Server error");
    }
  }
}
