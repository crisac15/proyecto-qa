import express from "express";
import { StudentController } from "../controllers/studentController";

const router = express.Router();

//Student Routes
router.get("/", StudentController.getAllStudents);
router.get("/:code", StudentController.getStudentByCode);
router.get("/:code/inbox", StudentController.getStudentInbox);
router.put("/:code/inbox", StudentController.updateStudentInbox);
router.put("/:code/photo", StudentController.updateStudentPhoto);
router.get("/:code/notifications", StudentController.getAllNotifications);
router.get("/campus/:campus", StudentController.getStudentsByCampus);
router.put("/:code", StudentController.updateStudent);
router.delete("/:code", StudentController.deleteStudent);
router.delete("/:code/inbox/:id", StudentController.deleteNotification);
router.patch("/:code/inbox/:id", StudentController.markAsRead);
router.patch("/:code/inbox", StudentController.deleteReadNotifications);

export default router;
