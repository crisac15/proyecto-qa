"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const teacherController_1 = require("../controllers/teacherController");
const router = express_1.default.Router();
// Teacher routes
router.get("/", teacherController_1.TeacherController.getAllTeachers);
router.get("/:code", teacherController_1.TeacherController.getTeacherByCode);
router.get("/campus/:campus", teacherController_1.TeacherController.getTeachersByCampus);
router.post("/", teacherController_1.TeacherController.createTeacher);
router.put("/:code", teacherController_1.TeacherController.updateTeacher);
router.delete("/:code", teacherController_1.TeacherController.deleteTeacher);
exports.default = router;
//# sourceMappingURL=teacherRoutes.js.map