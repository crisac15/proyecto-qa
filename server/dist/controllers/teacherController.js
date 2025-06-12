"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TeacherController = void 0;
const teacher_1 = __importDefault(require("../DAOs/teacher"));
const Teacher_1 = __importDefault(require("../model/Teacher"));
class TeacherController {
    static getAllTeachers(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const teachers = yield teacher_1.default.getAllTeachers();
                res.status(200).json(teachers);
            }
            catch (error) {
                res.status(500).json({ message: "Error getting teachers" });
            }
        });
    }
    static getTeachersByCampus(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const campus = req.params.campus;
                const teachers = yield teacher_1.default.getTeachersByCampus(campus);
                res.status(200).json(teachers);
            }
            catch (error) {
                res.status(500).json({ message: "Error getting teachers" });
            }
        });
    }
    static getTeacherByCode(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const code = req.params.code;
                const teacher = yield teacher_1.default.getTeacherByCode(code);
                res.status(200).json(teacher);
            }
            catch (error) {
                res.status(500).json({ message: "Error getting teacher" });
            }
        });
    }
    static createTeacher(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const teacherData = req.body;
                const teacher = new Teacher_1.default(teacherData);
                const campus = teacher.getCampus();
                try {
                    const teachers = yield teacher_1.default.getTeachersByCampus(campus);
                    const lastTeacher = teachers[teachers.length - 1];
                    const lastCode = lastTeacher ? lastTeacher.getId() : `${campus}-00`;
                    const lastNumber = parseInt(lastCode.split("-")[1]);
                    const newNumber = lastNumber + 1;
                    const code = `${campus}-${newNumber.toString().padStart(2, "0")}`;
                    teacher.setId(code);
                }
                catch (error) {
                    res.status(500).json({ message: "Error generating teacher code" });
                    return;
                }
                yield teacher_1.default.createTeacher(teacher);
                res.status(200).json({ message: "Teacher created" });
            }
            catch (error) {
                res.status(400).json({ message: "Error creating teacher" });
            }
        });
    }
    static updateTeacher(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const code = req.params.code;
            const teacherData = req.body.teacher;
            const user = req.body.user;
            const teacher = new Teacher_1.default(teacherData);
            console.log(teacher);
            yield teacher_1.default.updateTeacher(code, teacher, user, "update");
            res.status(200).json({ message: "Teacher updated" });
        });
    }
    static deleteTeacher(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const code = req.params.code;
                yield teacher_1.default.deleteTeacher(code);
                res.status(200).json({ message: "Teacher deleted" });
            }
            catch (error) {
                res.status(400).json({ message: "Error deleting teacher" });
            }
        });
    }
}
exports.TeacherController = TeacherController;
//# sourceMappingURL=teacherController.js.map