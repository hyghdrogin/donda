import { Request, Response } from "express";
import { errorResponse, successResponse, handleError } from "../utils/responses";
import models from "../models";
import { IUser } from "../utils/interface";

/**
 * @class AdmintransactionController
 * @description create transaction, get all transactions, get a transaction, delete a transaction
 * @exports AdminController
 */
export default class AdminDebitController {
  /**
     * @param {object} req - The user request object
     * @param {object} res - The user response object
     * @returns {object} Success message
     */
  static async sendMoney(req: Request, res: Response) {
    try {
      const { _id } = req.user;
      const { account, amount } = req.body;
      if (Number.isNaN(Number(amount)) || Number(amount) <= 0) {
        return errorResponse(res, 422, "Invalid amount.");
      }
      const user = await models.User.findById(_id);
      if (!user) {
        return errorResponse(res, 404, "Sorry Sender Account not found.");
      }
      const receiver = await models.User.findOne({ accountNo: account });
      if (!receiver) {
        return errorResponse(res, 409, "Sorry receiver account does not exist.");
      }
      console.log(receiver);
      const balance = user.balance as number;
      if (balance < amount) {
        return errorResponse(res, 400, "Sorry there is not enough money in your account.");
      }
      const reference = (Math.random() + 1).toString(36).substring(5);
      await models.User.findByIdAndUpdate(_id, { $inc: { balance: -amount } });
      await models.User.findByIdAndUpdate(receiver._id, { $inc: { balance: +amount } });

      const createTransaction = await models.Debit.create({
        amount,
        type: "bank-transfer",
        receiver: receiver.id,
        sender: _id,
        status: "successful"
      });

      await models.Credit.create({
        amount,
        type: "bank-transfer",
        receiver: receiver.id,
        sender: _id,
        status: "successful",
        reference
      });
      return successResponse(res, 201, "Amount has been sent successfully.", createTransaction);
    } catch (error) {
      handleError(error, req);
      return errorResponse(res, 500, "Server error.");
    }
  }

  /**
     * @param {object} req - The user request object
     * @param {object} res - The user response object
     * @returns {object} Success message
     */
  static async requestWithdrawal(req: Request, res: Response) {
    try {
      const { _id } = req.user;
      const { amount, account } = req.body;

      const user = await models.User.findById({ _id });
      if (!user) return errorResponse(res, 404, "User not found.");

      if (Number.isNaN(Number(amount)) || Number(amount) <= 0) {
        return errorResponse(res, 422, "Invalid amount.");
      }
      const acc: IUser | null = await models.User.findOne({ accountNo: account });
      if (!acc) return errorResponse(res, 404, "Account number does not exist.");

      if (account !== user.accountNo) return errorResponse(res, 404, "Wrong account number.");

      const balance = user.balance as number;
      if (balance < amount) {
        return errorResponse(res, 400, "Sorry there is not enough money in your account.");
      }
      await models.Debit.create({
        amount,
        sender: _id,
        type: "withdrawal",
        status: "successful"
      });
      await models.User.findByIdAndUpdate(_id, { $inc: { balance: -amount } });
      return successResponse(res, 201, "Withdrawal successful.");
    } catch (error) {
      handleError(error, req);
      return errorResponse(res, 500, "Server error.");
    }
  }

  // /**
  //    * @param {object} req - The user request object
  //    * @param {object} res - The user response object
  //    * @returns {object} Success message
  //    */
  // static async getDebitTransactions(req: Request, res: Response) {
  //   try {
  //     const { id } = req.user;
  //     const transactions = await models.debit.findMany({ where: { user: id } });
  //     return successResponse(res, 200, "Successfully retrived all Debit Transactions.", transactions);
  //   } catch (error) {
  //     return errorResponse(res, 500, "Server error.");
  //   }
  // }

  // /**
  //    * @param {object} req - The user request object
  //    * @param {object} res - The user response object
  //    * @returns {object} Success message
  //    */
  // static async getDebitTransactionById(req: Request, res: Response) {
  //   try {
  //     const { debitId } = req.params;
  //     const transaction = await models.debit.findUnique({ where: { id: debitId } });
  //     if (!transaction) return errorResponse(res, 404, "Transaction not found");
  //     return successResponse(res, 200, "Successfully retrived Transaction.", transaction);
  //   } catch (error) {
  //     return errorResponse(res, 500, "Resource not found.");
  //   }
  // }

  // /**
  //    * @param {object} req - The user request object
  //    * @param {object} res - The user response object
  //    * @returns {object} Success message
  //    */
  // static async deleteDebitTransaction(req: Request, res: Response) {
  //   try {
  //     const { debitId } = req.params;
  //     const transaction = await models.debit.findUnique({ where: { id: debitId } });
  //     if (!transaction) return errorResponse(res, 404, "Transaction not found.");
  //     await models.debit.delete({ where: { id: debitId } });
  //     return successResponse(res, 200, "Successfully Deleted transaction.");
  //   } catch (error) {
  //     return errorResponse(res, 500, "Resource not found.");
  //   }
  // }
}
