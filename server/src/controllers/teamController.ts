import { Request, Response } from "express";
import TeacherDAO from "../DAOs/teacher";
import Teacher from "../model/Teacher";

export class TeamController {
  public static async getAllMembers(
    req: Request,
    res: Response
  ): Promise<void> {
    try {
      const members = await TeacherDAO.getAllMembers();
      res.status(200).json(members);
    } catch (error) {
      res.status(500).json({ error: "Error getting members" });
    }
  }

  public static async addMember(req: Request, res: Response): Promise<void> {
    try {
      const code = req.params.code;
      const user = req.body.user;

      const teacher = await TeacherDAO.getTeacherByCode(code);

      teacher.setIsMember(true);

      await TeacherDAO.updateTeacher(code, teacher, user, "add to team");
    } catch (error) {
      res.status(500).json({ error: "Error adding member" });
    }
  }

  public static async removeMember(req: Request, res: Response): Promise<void> {
    try {
      const code = req.params.code;
      const user = req.body.user;

      console.log(code, user);

      const teacher = await TeacherDAO.getTeacherByCode(code);

      teacher.setIsLeader(false);
      teacher.setIsMember(false);

      console.log(teacher);

      await TeacherDAO.updateTeacher(code, teacher, user, "remove from team");

      res.status(200).json({ message: "Member removed" });
    } catch (error) {
      res.status(500).json({ error: "Error removing member" });
    }
  }

  public static async setCoordinator(
    req: Request,
    res: Response
  ): Promise<void> {
    try {
      const code = req.params.code;
      const isLeader = req.params.bool === "true" ? true : false;
      await TeacherDAO.setCoordinator(code, isLeader);
      res.status(200).json({ message: "Coordinator updated" });
    } catch (error) {
      res.status(500).json({ error: "Error updating coordinator" });
    }
  }
}
