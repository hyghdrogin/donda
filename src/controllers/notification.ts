import { Request, Response } from "express";
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
      const { title, message, userId } = req.body;
      const user = await models.User.findById(userId);
      if (!user) {
        return errorResponse(res, 404, "User does not exist.");
      }
      const notify = await models.Notification.create({
        title,
        message,
        owner: userId
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
      const notification = await models.Notification.find({ owner: _id }).populate([
        { path: "owner", select: "_id firstName lastName email photo", },
      ]);
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

      const notification = await models.Notification.findOne({ _id: notificationId, owner: _id }).populate([
        { path: "owner", select: "_id firstName lastName email photo" },
      ]);
      if (!notification) {
        return errorResponse(res, 404, "Notification not found.");
      }
      await models.Notification.findByIdAndUpdate(notificationId, { status: "read" });
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
      await models.Notification.findByIdAndRemove(notificationId);
      return successResponse(res, 200, "Notification deleted successfully.");
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
  static async createBulkNotification(req: Request, res: Response) {
    try {
      const { title, message } = req.body;
      const users = await models.User.find({ role: "user" });
      let array = [];
      array = users.map((user) => {
        return { title, message, owner: user._id };
      });
      await models.Notification.insertMany(array);
      return successResponse(res, 200, "Notifications created successfully.");
    } catch (error) {
      handleError(error, req);
      return errorResponse(res, 500, "Server error");
    }
  }
}
