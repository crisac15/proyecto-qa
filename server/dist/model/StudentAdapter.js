"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const User_1 = __importDefault(require("./User"));
const Student_1 = __importDefault(require("./Student"));
const NotificationInbox_1 = __importDefault(require("./NotificationInbox"));
class StudentAdapter extends User_1.default {
    constructor(student) {
        super(student.name, student.email, student.password || student.carnet.toString(), student.campus, "student", undefined, student.photo ||
            "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_640.png", student.carnet.toString(), student._id.toString());
        this.student = new Student_1.default(student);
        if (!student.inbox) {
            student.inbox = { notifications: [], readNotifications: [] };
        }
        this.inbox = new NotificationInbox_1.default(student.inbox);
    }
    getCarnet() {
        return this.student.getCarnet();
    }
    getPhoneNumber() {
        return this.student.getPhoneNumber();
    }
    getCampus() {
        return this.student.getCampus();
    }
    getInbox() {
        return this.inbox;
    }
    receiveNotification(notificationID) {
        this.inbox.addNotification(notificationID);
    }
}
exports.default = StudentAdapter;
//# sourceMappingURL=StudentAdapter.js.map