"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const studentController_1 = require("../controllers/studentController");
const router = express_1.default.Router();
//Student Routes
router.get("/", studentController_1.StudentController.getAllStudents);
router.get("/:code", studentController_1.StudentController.getStudentByCode);
router.get("/:code/inbox", studentController_1.StudentController.getStudentInbox);
router.put("/:code/inbox", studentController_1.StudentController.updateStudentInbox);
router.put("/:code/photo", studentController_1.StudentController.updateStudentPhoto);
router.get("/:code/notifications", studentController_1.StudentController.getAllNotifications);
router.get("/campus/:campus", studentController_1.StudentController.getStudentsByCampus);
router.put("/:code", studentController_1.StudentController.updateStudent);
router.delete("/:code", studentController_1.StudentController.deleteStudent);
router.delete("/:code/inbox/:id", studentController_1.StudentController.deleteNotification);
router.patch("/:code/inbox/:id", studentController_1.StudentController.markAsRead);
router.patch("/:code/inbox", studentController_1.StudentController.deleteReadNotifications);
exports.default = router;
//# sourceMappingURL=studentRoutes.js.map