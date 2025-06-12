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
const student_1 = __importDefault(require("../DAOs/student"));
const alert_1 = __importDefault(require("../DAOs/alert"));
class NotificationCenter {
    constructor() {
        this.notifications = [];
        this.students = [];
        this.fetch();
    }
    static getInstance() {
        if (!NotificationCenter.instance) {
            NotificationCenter.instance = new NotificationCenter();
        }
        return NotificationCenter.instance;
    }
    fetch() {
        return __awaiter(this, void 0, void 0, function* () {
            // Fetch data from database
            // Fetch students from database
            yield student_1.default.getAllStudentsAdapted().then((students) => {
                this.students = students;
            });
            yield alert_1.default.getAllAlerts().then((notifications) => {
                this.notifications = notifications;
            });
        });
    }
    update(notification) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.fetch();
            this.notifications.push(notification);
            const notificationID = yield alert_1.default.saveAlert(notification);
            // FIXME: Something is wrong here
            // Notify students
            console.log("sendingAlert:" +
                notificationID +
                " to students. " +
                notification.getBody());
            this.students.forEach((student) => {
                student.receiveNotification(notificationID);
                student_1.default.updateStudentInbox(student.getCarnet().toString(), student.getInbox());
            });
        });
    }
}
exports.default = NotificationCenter;
//# sourceMappingURL=NotificationCenter.js.map