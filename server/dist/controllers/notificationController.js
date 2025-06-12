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
exports.NotificationController = void 0;
const notification_1 = __importDefault(require("../DAOs/notification"));
const workplan_1 = __importDefault(require("../DAOs/workplan"));
const PublishVisitor_1 = __importDefault(require("../model/PublishVisitor"));
const ReminderVisitor_1 = __importDefault(require("../model/ReminderVisitor"));
require("dotenv").config();
class NotificationController {
    static verifyNotification(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const date = req.body.date;
                const notificationDate = yield notification_1.default.getLastNotification();
                // get the current date, using the date set in the .env file for testing
                const today = new Date(date);
                console.log(today);
                console.log(notificationDate);
                const publishVisitor = new PublishVisitor_1.default(today);
                const reminderVisitor = new ReminderVisitor_1.default(today);
                // if the notification date is not today
                if (notificationDate.getDate() != today.getDate()) {
                    // if (false) {
                    // get all the workplans
                    const workPlans = yield workplan_1.default.getAllWorkplans();
                    // for each workplan, verify the activities
                    for (let workPlan of workPlans) {
                        workPlan.getActivities().forEach((activity) => {
                            activity.accept(publishVisitor);
                            activity.accept(reminderVisitor);
                        });
                        // update the workplan in the database
                        yield workplan_1.default.updateWorkplan(workPlan.getID(), workPlan);
                    }
                    console.log("Notification verified");
                    // record the notification in the database to avoid multiple notifications👌
                    yield notification_1.default.addNotification(today);
                }
                res.status(200).json({ message: "Notification already verified" });
            }
            catch (error) {
                console.error(error);
                res.status(500).json({
                    message: "An error occurred while verifying the notification.",
                });
            }
        });
    }
}
exports.NotificationController = NotificationController;
//# sourceMappingURL=notificationController.js.map