import nodemailer from "nodemailer";
require("dotenv").config();

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PWD,
  },
});

export default class Email {
  private static instance: Email;

  private constructor() { }

  public static getInstance(): Email {
    if (!Email.instance) {
      Email.instance = new Email();
    }
    return Email.instance;
  }

  public async sendMail(to: string, subject: string, text: string) {
    const info = await transporter.sendMail({
      from: "<mariana.viquez.monge@gmail.com>",
      to: to,
      subject: subject,
      text: text,
    });
  }
}

