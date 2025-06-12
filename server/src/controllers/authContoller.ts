import AssistantDAO from "../DAOs/assistant"; // Asegúrate de usar la ruta correcta
import TeacherDAO from "../DAOs/teacher";
import StudentDAO from "../DAOs/student";
import { Request, Response } from "express";
import User from "../model/User";
import Email from "./sendEmail";

export class AuthController {
  // Get all users
  static async getUsers(): Promise<User[]> {
    const teachers = await TeacherDAO.getAllTeachers();
    const assistants = await AssistantDAO.getAllAssistants();
    const students = await StudentDAO.getAllStudentsAdapted();

    const users: User[] = [...teachers, ...assistants, ...students];
    return users;
  }

  //Login
  public static async login(req: Request, res: Response) {
    try {
      const email = req.body.email;
      const password = req.body.password;
      console.log(email);
      // Get users
      const users = await AuthController.getUsers();

      //Find user
      const userFound = users.find((user) => user.getEmail() === email);
      console.log(userFound);

      if (!userFound) {
        return res.status(500).json({ message: "User Not Found" });
      }
      // Compare password
      const isCorrect = userFound.getPassword() === password;

      if (!isCorrect) {
        return res.status(500).json({ message: "Password incorrecta" });
      }

      // Send user in response
      res.status(200).json(userFound);
    } catch (error) {
      res.status(500).json({ message: "Error login" });
    }
  }

  //Reset Password
  public static async resetPassword(req: Request, res: Response) {
    const { email } = req.body;
    // Get users
    const users = await AuthController.getUsers();

    //Find user
    const userFound = users.find((user) => user.getEmail() === email);
    console.log(userFound);

    if (!userFound) {
      return res.status(500).json({ message: "User Not Found" });
    }
    // Send email with token
    const emailSent = Email.getInstance();
    const userToken = userFound.getDbId();
    await emailSent.sendMail(
      userFound.getEmail(),
      "Reset Password",
      "Use this Token to reset your password: " + userToken
    );
    res.status(200).json({ message: "Email sent" });
  }

  //Validate Token
  public static async validateToken(req: Request, res: Response) {
    try {
      const { email, token } = req.body;
      // Get users
      const users = await AuthController.getUsers();

      //Find user
      const userFound = users.find((user) => user.getEmail() === email);

      if (!userFound) {
        return res.status(500).json({ message: "User Not Found" });
      }
      // Check if user ID matches and token is valid
      console.log(userFound.getDbId(), token, userFound.getEmail(), email);
      if (userFound.getDbId() === token && userFound.getEmail() === email) {
        return res.status(200).json({ message: "Token valid" });
      } else {
        return res.status(500).json({ message: "Token invalid" });
      }
    } catch (error) {
      res.status(500).json({ message: "Error validating token" });
    }
  }

  //Change Password
  public static async changePassword(req: Request, res: Response) {
    try {
      const { email, password } = req.body;
      console.log(email, password);
      // Get users
      const users = await AuthController.getUsers();

      //Find user

      const userFound = users.find((user) => user.getEmail() === email);

      if (!userFound) {
        return res.status(500).json({ message: "User Not Found" });
      }

      // Check userType
      const userType = userFound.getUserType();

      // Change password

      if (userType === "teacher") {
        await TeacherDAO.changePassword(userFound.getId(), password);
      } else if (userType === "assistant") {
        await AssistantDAO.changePassword(userFound.getId(), password);
      } else {
        await StudentDAO.changePassword(userFound.getId(), password);
      }

      res.status(200).json({ message: "Password changed" });
    } catch (error) {
      res.status(500).json({ message: "Error changing password" });
    }
  }
}
