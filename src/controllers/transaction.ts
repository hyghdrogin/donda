import { Request, Response } from "express";
import models from "../models";
import { successResponse, errorResponse, handleError } from "../utils/responses";
import Payment from "../middlewares/paystack";
import sendEmail from "../utils/email";
// import { IUser } from "../utils/interface";

const { initializePayment, verifyPayment } = Payment;
/**
 * @class TransactionController
 * @description initializing payment, verifying payment, get, Transaction
 * @exports TransactionController
 */
export default class CreditController {
  /**
 * @param {object} req - The reset request object
 * @param {object} res - The reset errorResponse object
 * @returns {object} Success message
 */
  static async createTransaction(req: Request, res: Response) {
    try {
      const { _id } = req.details;
      const { amount } = req.body;
      const user = await models.User.findById(_id);
      if (!user) { return errorResponse(res, 404, "User not found"); }
      if (Number.isNaN(Number(amount)) || Number(amount) <= 0) {
        return errorResponse(res, 422, "Invalid amount.");
      }

      const transaction = await models.Credit.create({
        amount,
        receiver: _id,
        sender: _id,
        type: "Bank transfer"
      });

      const paystack_data = {
        amount: amount * 100,
        email: user.email,
        metadata: {
          name: `${user.firstName} ${user.lastName} `,
          userId: _id,
          transactionId: transaction._id,
        },
      };
      const paymentDetails = await initializePayment(paystack_data);
      return successResponse(res, 200, "Transaction initalized successfully", paymentDetails);
    } catch (error) {
      handleError(error, req);
      return errorResponse(res, 500, "Server error");
    }
  }

  /**
  * @param {object} req - The user request object
  * @param {object} res - The user response object
  * @returns {object} Success message
  */
  static async verify(req: Request, res: Response) {
    try {
      const { trxref } = req.query;
      if (!trxref) { return errorResponse(res, 404, "No transaction reference was found."); }

      const resp: any = await verifyPayment(trxref as string);
      console.log("q", resp.data.data);
      const { data } = resp.data;
      const { transactionId } = data.metadata;
      const transaction = await models.Credit.findById(transactionId).populate("receiver sender");
      if (!transaction) {
        return errorResponse(res, 404, "Transaction not found, please contact support.");
      }
      await models.Credit.findByIdAndUpdate(transactionId, {
        reference: data.reference
      });
      if (transaction.status !== "pending") {
        return errorResponse(res, 409, "Transaction already settled");
      }

      const { receiver } = transaction as any;
      if (transaction.amount !== data.amount / 100) {
        await models.Credit.findByIdAndUpdate(transactionId, { status: "Conflict" });
        // const message = "Transaction failed. Please contact support";
        // await sendEmail({ to: owner.email,  subject: "Payment error.", message});
        return errorResponse(res, 409, "Incorrect transaction amount.");
      }

      if (["success", "successful"].includes(data.status)) {
        const userCredit = await models.Credit.findByIdAndUpdate(transactionId, {
          status: "successful"
        });
        await models.User.findByIdAndUpdate(
          receiver._id,
          { $inc: { balance: data.amount / 100 } },
          { new: true }
        );
        const subject = "Payment successful";
        const message = "Account fully funded.";
        await sendEmail(receiver.email, subject, message);
        return successResponse(res, 200, "Payment was successful", userCredit);
      }
      return errorResponse(res, 400, "Transaction could not be verified, please try again.");
    } catch (error) {
      handleError(error, req);
      return errorResponse(res, 500, "Server error");
    }
  }
}
