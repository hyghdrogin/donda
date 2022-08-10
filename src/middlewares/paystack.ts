import axios from "axios";
import config from "../config";

export default class Payment {
  static async initializePayment(form: any) {
    const options: any = {
      url: "https://api.paystack.co/transaction/initialize",
      headers: {
        authorization: `Bearer ${config.PAYSTACK_SECRET_KEY}`,
        "content-type": "application/json",
        "cache-control": "no-cache",
      },
      method: "POST",
      data: form,
    };
    return new Promise(async (resolve, reject) => {
      try {
        const response = await axios.request(options);
        resolve(response.data);
      } catch (error) {
        reject(error);
      }
    });
  }

  /**
   * Verify all transactions before updating their status in the DB
   * @param {String} trxref The reference String to verify the transaction. It will be gotten after successfully
   * initializing a transaction.
   */

  static async verifyPayment(ref: string) {
    const options: any = {
      url: `https://api.paystack.co/transaction/verify/${encodeURIComponent(
        ref
      )}`,
      headers: {
        authorization: `Bearer ${config.PAYSTACK_SECRET_KEY}`,
        "content-type": "application/json",
        "cache-control": "no-cache",
      },
      method: "GET",
    };
    return new Promise(async (resolve, reject) => {
      try {
        const data = await axios.request(options);
        resolve(data);
      } catch (error) {
        reject(error);
      }
    });
  }

//   static async createRecipient(form) {
//     const options = {
//       url: "https://api.paystack.co/transferrecipient",
//       headers: {
//         authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
//         "content-type": "application/json",
//         "cache-control": "no-cache",
//       },
//       method: "POST",
//       data: form,
//     };
//     return new Promise(async (resolve, reject) => {
//       try {
//         const data = await axios.request(options);
//         resolve(data);
//       } catch (error) {
//         reject(error);
//       }
//     });
//   }

//   static async chargeAuthorization(form) {
//     const options = {
//       url: "https://api.paystack.co/transaction/charge_authorization",
//       headers: {
//         authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
//         "content-type": "application/json",
//         "cache-control": "no-cache",
//       },
//       method: "POST",
//       data: form,
//     };
//     return new Promise(async (resolve, reject) => {
//       try {
//         const data = await axios.request(options);
//         resolve(data);
//       } catch (error) {
//         reject(error);
//       }
//     });
//   }
}
