import config from "../config";
import sgMail from "@sendgrid/mail";
// import nodemailer from 'nodemailer';
// import config from "../config";

sgMail.setApiKey(config.SENDGRID_API_KEY as string);

const msg: any = {
  from: `Donda <${config.SENDGRID_EMAIL}>`,
  mail_settings: { sandbox_mode: { enable: false }}
};

() => {
    msg.mail_settings.sandbox_mode.enable = true;
}

const sendEmail = async (email: string, subject: string, message: string) => {
  try {
    msg.to = email;
    msg.subject = subject;
    msg.text = message;
    await sgMail.send(msg);
    console.log("message sent...")
  } catch (err) {
    return err;
  }
}

// let transporter: any;
// const sendEmail = async (email: string, subject: string, message: string) => {
//   //1. create a transporter
//   transporter = nodemailer.createTransport({
//     host: "smtp.mailtrap.io",
//   port: 2525,
//   auth: {
//     user: config.MAILTRAP_USER,
//     pass: config.MAILTRAP_PASS
//   }
//   });

//   const mailOptions = {
//     from: config.SMTP_EMAIL,
//     to: email,
//     subject: subject,
//     html: message,
//   };

//   transporter.sendMail(mailOptions, function (error: any) {
//     if (error) {
//       console.log(error.message, '>>>>');
//     } else {
//       console.log('Message Sent>>>');
//     }
//   });
// };

export default sendEmail;
