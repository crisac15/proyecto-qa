import { Request, Response } from "express";
import TeacherDAO from "../DAOs/teacher";
import Teacher from "../model/Teacher";
import TeacherDTO from "../DTOs/teacher";

export class TeacherController {
  public static async getAllTeachers(
    req: Request,
    res: Response
  ): Promise<void> {
    try {
      const teachers = await TeacherDAO.getAllTeachers();
      res.status(200).json(teachers);
    } catch (error) {
      res.status(500).json({ message: "Error getting teachers" });
    }
  }

  public static async getTeachersByCampus(
    req: Request,
    res: Response
  ): Promise<void> {
    try {
      const campus = req.params.campus;
      const teachers = await TeacherDAO.getTeachersByCampus(campus);
      res.status(200).json(teachers);
    } catch (error) {
      res.status(500).json({ message: "Error getting teachers" });
    }
  }

  public static async getTeacherByCode(
    req: Request,
    res: Response
  ): Promise<void> {
    try {
      const code = req.params.code;
      const teacher = await TeacherDAO.getTeacherByCode(code);
      res.status(200).json(teacher);
    } catch (error) {
      res.status(500).json({ message: "Error getting teacher" });
    }
  }

  public static async createTeacher(
    req: Request,
    res: Response
  ): Promise<void> {
    try {
      const teacherData: TeacherDTO = req.body;
      const teacher = new Teacher(teacherData);
      const campus = teacher.getCampus();
      try {
        const teachers = await TeacherDAO.getTeachersByCampus(campus);
        const lastTeacher = teachers[teachers.length - 1];
        const lastCode = lastTeacher ? lastTeacher.getId() : `${campus}-00`;
        const lastNumber = parseInt(lastCode.split("-")[1]);
        const newNumber = lastNumber + 1;
        const code = `${campus}-${newNumber.toString().padStart(2, "0")}`;
        teacher.setId(code);
      } catch (error) {
        res.status(500).json({ message: "Error generating teacher code" });
        return;
      }
      await TeacherDAO.createTeacher(teacher);
      res.status(200).json({ message: "Teacher created" });
    } catch (error) {
      res.status(400).json({ message: "Error creating teacher" });
    }
  }

  public static async updateTeacher(
    req: Request,
    res: Response
  ): Promise<void> {
    const code = req.params.code;
    const teacherData: TeacherDTO = req.body.teacher;
    const user = req.body.user;
    const teacher = new Teacher(teacherData);
    console.log(teacher);

    await TeacherDAO.updateTeacher(code, teacher, user, "update");

    res.status(200).json({ message: "Teacher updated" });
  }

  public static async deleteTeacher(
    req: Request,
    res: Response
  ): Promise<void> {
    try {
      const code = req.params.code;
      await TeacherDAO.deleteTeacher(code);
      res.status(200).json({ message: "Teacher deleted" });
    } catch (error) {
      res.status(400).json({ message: "Error deleting teacher" });
    }
  }
}
