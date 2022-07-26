import { NextFunction, Request, Response } from 'express';
import bcrypt from "bcrypt";
import models from "../models";
import { successResponse, errorResponse } from "../utils/responses";
import jwtHelper from "../utils/jwt";
import { IUser } from "../utils/interface";
import sendEmail from "../utils/email"

const { generateToken } = jwtHelper;
/**
 * @class UserController
 * @description create, log in user
 * @exports UserController
 */
export default class UserController {
  /**
   * @param {object} req - The reset request object
   * @param {object} res - The reset errorResponse object
   * @returns {object} Success message
   */
  static async createUser(req: Request, res: Response) {
    const {
      firstName, lastName, phone, email, password
    } = req.body;
    const emailExist = await models.User.findOne({ email });
    if (emailExist) {
      return errorResponse(res, 409, "email already registered by another user.");
    }
    const phoneExist = await models.User.findOne({ phone });
    if (phoneExist) {
      return errorResponse(res, 409, "phone number already used by another user.");
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    await models.User.create({
      firstName, lastName, email, password: hashedPassword, phone
    });
    const subject = "User created";
    const message = "hi, thank you for signing up"
    await sendEmail( email,    subject,   message)
    return successResponse(
      res, 201, "Account created successfully, kindly login."
    );
  }

  /**
   * @param {object} req - The reset request object
   * @param {object} res - The reset errorResponse object
   * @returns {object} Success message
   */
  static async loginUser(req: Request, res: Response) {
    const { email, password } = req.body;
    const user: IUser | null = await models.User.findOne({ email });
    if (!user) { return errorResponse(res, 404, "Email does not exist." ) }
    const validpass = await bcrypt.compare(password, user.password);
    if (!validpass) { return errorResponse(res, 404, "Password is not correct!."); }
    const { _id, phone } = user;
    const token = await generateToken({ _id, email, phone });
    const userDetails = {
      _id, email, firstname: user.firstName, lastName: user.lastName, phone: user.phone, role: user.role, photo: user.photo
    }
    return successResponse(
      res,
      200,
      "User Logged in Successfully.",
      {token, userDetails}
    );
  }
  
  /**
   * @param {object} req - The reset request object
   * @param {object} res - The reset errorResponse object
   * @returns {object} Success message
   */
  static async updateProfile(req: Request, res: Response) {
    const { _id } = req.user;
    const { firstName, lastName } = req.body;
    const user: IUser | null = await models.User.findByIdAndUpdate(
      { _id }, { firstName, lastName }, { new: true }
    ).select("-password");
    return successResponse(
      res,
      200,
      "Profile updated Successfully.",
      user
    );
  }

 
}
