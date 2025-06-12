import express from "express";
import { TeacherController } from "../controllers/teacherController";

const router = express.Router();

// Teacher routes
router.get("/", TeacherController.getAllTeachers);
router.get("/:code", TeacherController.getTeacherByCode);
router.get("/campus/:campus", TeacherController.getTeachersByCampus);
router.post("/", TeacherController.createTeacher);
router.put("/:code", TeacherController.updateTeacher);
router.delete("/:code", TeacherController.deleteTeacher);

export default router;
