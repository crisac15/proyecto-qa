"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Subject_1 = __importDefault(require("./Subject"));
const Notification_1 = __importDefault(require("./Notification"));
class ReminderVisitor extends Subject_1.default {
    constructor(systemDate) {
        super();
        this.systemDate = systemDate;
    }
    visitActivity(activity) {
        if (activity.getStatus() === "Notificada" ||
            activity.getStatus() === "Publicada") {
            let nextReminderDate = new Date(activity.getDate());
            nextReminderDate.setDate(nextReminderDate.getDate() - activity.getPrevDays());
            while (nextReminderDate <= activity.getDate()) {
                console.log(nextReminderDate.getDate(), this.systemDate.getDate());
                if (nextReminderDate.getDate() === this.systemDate.getDate()) {
                    // Observer pattern
                    const notification = new Notification_1.default("Recordatorio", `La actividad ${activity.getName()} se llevará a cabo el ${activity.getDate()}`);
                    notification.setPostDate(this.systemDate);
                    super.notifyObservers(notification);
                    console.log(`Reminder: ${activity.getName()}`);
                    break;
                }
                nextReminderDate.setDate(nextReminderDate.getDate() + activity.getReminderInterval());
            }
        }
    }
}
exports.default = ReminderVisitor;
//# sourceMappingURL=ReminderVisitor.js.map