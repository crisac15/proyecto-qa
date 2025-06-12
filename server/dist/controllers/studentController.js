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
exports.StudentController = void 0;
const student_1 = __importDefault(require("../DAOs/student"));
const alert_1 = __importDefault(require("../DAOs/alert"));
// Student Controller that handles the requests related to students
// uses the studentDAO to perform the operations
/**
 * Class that handles the requests related to students
 */
class StudentController {
    /**
     * Get all the Students
     * @param req the request
     * @param res the response
     */
    static getAllStudents(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const students = yield student_1.default.getAllStudents();
                res.status(200).json(students);
            }
            catch (error) {
                res.status(500).json({ error: "Error getting students" });
            }
        });
    }
    /**
     * Get all the students from a campus
     * @param req the request
     * @param res the response
     */
    static getStudentsByCampus(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const campus = req.params.campus;
                const students = yield student_1.default.getStudentsByCampus(campus);
                res.status(200).json(students);
            }
            catch (error) {
                res.status(500).json({ error: "Error getting students" });
            }
        });
    }
    /**
     * Delete a student
     * @param req the request
     * @param res the response
     */
    static deleteStudent(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const carnet = req.params.code;
                yield student_1.default.deleteStudent(carnet);
                res.status(200).json({ message: "Student deleted" });
            }
            catch (error) {
                res.status(500).json({ error: "Error deleting student" });
            }
        });
    }
    /**
     * Update a student
     * @param req the request
     * @param res the response
     */
    static updateStudent(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const carnet = req.params.code;
                const student = req.body;
                yield student_1.default.updateStudent(carnet, student);
                res.status(200).json({ message: "Student updated" });
            }
            catch (error) {
                res.status(500).json({ error: "Error updating student" });
            }
        });
    }
    /**
     * Update the photo of a student
     * @param req the request
     * @param res the response
     */
    static updateStudentPhoto(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const carnet = req.params.code;
                const photo = req.body.photo;
                yield student_1.default.updateStudentPhoto(carnet, photo);
                res.status(200).json({ message: "Photo updated" });
            }
            catch (error) {
                res.status(500).json({ error: "Error updating photo" });
            }
        });
    }
    static getStudentInbox(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const carnet = req.params.code;
                const inbox = yield student_1.default.getStudentInbox(carnet);
                res.status(200).json(inbox);
            }
            catch (error) {
                res.status(500).json({ error: "Error getting student inbox" });
            }
        });
    }
    static updateStudentInbox(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const carnet = req.params.code;
                const inbox = req.body;
                yield student_1.default.updateStudentInbox(carnet, inbox);
                res.status(200).json({ message: "Inbox updated" });
            }
            catch (error) {
                res.status(500).json({ error: "Error updating inbox" });
            }
        });
    }
    static markAsRead(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const carnet = req.params.code;
                const id = req.params.id;
                const inbox = yield student_1.default.getStudentInbox(carnet);
                inbox.markAsRead(id);
                yield student_1.default.updateStudentInbox(carnet, inbox);
                // Return the updated inbox
                res.status(200).json(inbox);
            }
            catch (error) {
                res.status(500).json({ error: "Error marking notification as read" });
            }
        });
    }
    static deleteNotification(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            // try {
            const carnet = req.params.code;
            const id = req.params.id;
            const inbox = yield student_1.default.getStudentInbox(carnet);
            inbox.deleteNotification(id);
            console.log(inbox);
            yield student_1.default.updateStudentInbox(carnet, inbox);
            // Return the updated inbox
            res.status(200).json(inbox);
            // } catch (error) {
            //   res.status(500).json({ error: "Error deleting notification" });
            // }
        });
    }
    static deleteReadNotifications(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const carnet = req.params.code;
                const inbox = yield student_1.default.getStudentInbox(carnet);
                inbox.deleteReadNotifications();
                yield student_1.default.updateStudentInbox(carnet, inbox);
                // Return the updated inbox
                res.status(200).json(inbox);
            }
            catch (error) {
                res.status(500).json({ error: "Error deleting read notifications" });
            }
        });
    }
    static getAllNotifications(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const notifications = yield alert_1.default.getAllAlerts();
                res.status(200).json(notifications);
            }
            catch (error) {
                res.status(500).json({ error: "Error getting notifications" });
            }
        });
    }
    static getStudentByCode(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const code = req.params.code;
                const student = yield student_1.default.getStudentByCarnet(code);
                res.status(200).json(student);
            }
            catch (error) {
                res.status(500).json({ error: "Error getting student" });
            }
        });
    }
}
exports.StudentController = StudentController;
//# sourceMappingURL=studentController.js.map