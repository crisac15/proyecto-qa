"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Subject_1 = __importDefault(require("./Subject"));
const Notification_1 = __importDefault(require("./Notification"));
class PublishVisitor extends Subject_1.default {
    constructor(systemDate) {
        super();
        this.systemDate = systemDate;
    }
    visitActivity(activity) {
        const publishDate = activity.getPublishDate();
        // console.log(
        //   activity.getStatus() + " " + publishDate + " " + this.systemDate
        // );
        if (activity.getStatus() === "Planeada" && publishDate <= this.systemDate) {
            activity.setStatus("Publicada");
            console.log(`Published: ${activity.getName()}`);
            // Observer pattern
            const notification = new Notification_1.default("Publicación", `La actividad ${activity.getName()} ha sido publicada`);
            notification.setPostDate(this.systemDate);
            super.notifyObservers(notification);
        }
    }
}
exports.default = PublishVisitor;
//# sourceMappingURL=PublishVisitor.js.map