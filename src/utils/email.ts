import nodemailer from 'nodemailer';
import config from "../config";

let transporter: any;
const sendEmail = async (email: string, subject: string, message: string) => {
  //1. create a transporter
  transporter = nodemailer.createTransport({
    host: "smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: "26f0c4ed95141c",
    pass: "c063beb202e9e3"
  }
  });

  const mailOptions = {
    from: config.SMTP_EMAIL,
    to: email,
    subject: subject,
    html: message,
  };

  transporter.sendMail(mailOptions, function (error: any) {
    if (error) {
      console.log(error.message, '>>>>');
    } else {
      console.log('Message Sent>>>');
    }
  });
};
export default sendEmail;
