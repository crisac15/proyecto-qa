import { Request, Response } from "express";
import StudentDAO from "../DAOs/student";
import Student from "../model/Student";
import AlertDAO from "../DAOs/alert";

// Student Controller that handles the requests related to students
// uses the studentDAO to perform the operations

/**
 * Class that handles the requests related to students
 */
export class StudentController {
  /**
   * Get all the Students
   * @param req the request
   * @param res the response
   */
  public static async getAllStudents(
    req: Request,
    res: Response
  ): Promise<void> {
    try {
      const students = await StudentDAO.getAllStudents();
      res.status(200).json(students);
    } catch (error) {
      res.status(500).json({ error: "Error getting students" });
    }
  }

  /**
   * Get all the students from a campus
   * @param req the request
   * @param res the response
   */
  public static async getStudentsByCampus(
    req: Request,
    res: Response
  ): Promise<void> {
    try {
      const campus = req.params.campus;
      const students = await StudentDAO.getStudentsByCampus(campus);
      res.status(200).json(students);
    } catch (error) {
      res.status(500).json({ error: "Error getting students" });
    }
  }

  /**
   * Delete a student
   * @param req the request
   * @param res the response
   */
  public static async deleteStudent(
    req: Request,
    res: Response
  ): Promise<void> {
    try {
      const carnet = req.params.code;
      await StudentDAO.deleteStudent(carnet);
      res.status(200).json({ message: "Student deleted" });
    } catch (error) {
      res.status(500).json({ error: "Error deleting student" });
    }
  }

  /**
   * Update a student
   * @param req the request
   * @param res the response
   */
  public static async updateStudent(
    req: Request,
    res: Response
  ): Promise<void> {
    try {
      const carnet = req.params.code;
      const student: Student = req.body;
      await StudentDAO.updateStudent(carnet, student);
      res.status(200).json({ message: "Student updated" });
    } catch (error) {
      res.status(500).json({ error: "Error updating student" });
    }
  }

  /**
   * Update the photo of a student
   * @param req the request
   * @param res the response
   */
  public static async updateStudentPhoto(
    req: Request,
    res: Response
  ): Promise<void> {
    try {
      const carnet = req.params.code;
      const photo = req.body.photo;
      await StudentDAO.updateStudentPhoto(carnet, photo);
      res.status(200).json({ message: "Photo updated" });
    } catch (error) {
      res.status(500).json({ error: "Error updating photo" });
    }
  }

  public static async getStudentInbox(
    req: Request,
    res: Response
  ): Promise<void> {
    try {
      const carnet = req.params.code;
      const inbox = await StudentDAO.getStudentInbox(carnet);
      res.status(200).json(inbox);
    } catch (error) {
      res.status(500).json({ error: "Error getting student inbox" });
    }
  }

  public static async updateStudentInbox(
    req: Request,
    res: Response
  ): Promise<void> {
    try {
      const carnet = req.params.code;
      const inbox = req.body;
      await StudentDAO.updateStudentInbox(carnet, inbox);
      res.status(200).json({ message: "Inbox updated" });
    } catch (error) {
      res.status(500).json({ error: "Error updating inbox" });
    }
  }

  public static async markAsRead(req: Request, res: Response): Promise<void> {
    try {
      const carnet = req.params.code;
      const id = req.params.id;
      const inbox = await StudentDAO.getStudentInbox(carnet);

      inbox.markAsRead(id);

      await StudentDAO.updateStudentInbox(carnet, inbox);

      // Return the updated inbox
      res.status(200).json(inbox);
    } catch (error) {
      res.status(500).json({ error: "Error marking notification as read" });
    }
  }

  public static async deleteNotification(
    req: Request,
    res: Response
  ): Promise<void> {
    // try {
    const carnet = req.params.code;
    const id = req.params.id;

    const inbox = await StudentDAO.getStudentInbox(carnet);

    inbox.deleteNotification(id);
    console.log(inbox);

    await StudentDAO.updateStudentInbox(carnet, inbox);

    // Return the updated inbox
    res.status(200).json(inbox);
    // } catch (error) {
    //   res.status(500).json({ error: "Error deleting notification" });
    // }
  }

  public static async deleteReadNotifications(
    req: Request,
    res: Response
  ): Promise<void> {
    try {
      const carnet = req.params.code;
      const inbox = await StudentDAO.getStudentInbox(carnet);

      inbox.deleteReadNotifications();

      await StudentDAO.updateStudentInbox(carnet, inbox);

      // Return the updated inbox
      res.status(200).json(inbox);
    } catch (error) {
      res.status(500).json({ error: "Error deleting read notifications" });
    }
  }

  public static async getAllNotifications(
    req: Request,
    res: Response
  ): Promise<void> {
    try {
      const notifications = await AlertDAO.getAllAlerts();
      res.status(200).json(notifications);
    } catch (error) {
      res.status(500).json({ error: "Error getting notifications" });
    }
  }

  public static async getStudentByCode(
    req: Request,
    res: Response
  ): Promise<void> {
    try {
      const code = req.params.code;
      const student = await StudentDAO.getStudentByCarnet(code);
      res.status(200).json(student);
    } catch (error) {
      res.status(500).json({ error: "Error getting student" });
    }
  }
}
