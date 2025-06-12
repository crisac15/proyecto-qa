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
const notification_schema_1 = __importDefault(require("../schemas/notification.schema"));
class NotificationDAO {
    /**
     * Create a new notification in the database
     * @param notification the notification to be created
     */
    static getLastNotification() {
        return __awaiter(this, void 0, void 0, function* () {
            const notificationData = yield notification_schema_1.default
                .findOne()
                .sort({ _id: -1 })
                .limit(1)
                .exec();
            if (!notificationData) {
                const yesterday = new Date();
                yesterday.setDate(yesterday.getDate() - 1);
                return yesterday;
            }
            let date = notificationData.date;
            return date;
        });
    }
    /**
     * Create a new notification in the database
     * @param notification the notification to be created
     */
    static addNotification(notification) {
        return __awaiter(this, void 0, void 0, function* () {
            yield notification_schema_1.default.create({ date: notification });
        });
    }
}
exports.default = NotificationDAO;
//# sourceMappingURL=notification.js.map