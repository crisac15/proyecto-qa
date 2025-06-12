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
const alert_schema_1 = __importDefault(require("../schemas/alert.schema"));
const Notification_1 = __importDefault(require("../model/Notification"));
class AlertDAO {
    /**
     * get all notifications in data base
     */
    static getAllAlerts() {
        return __awaiter(this, void 0, void 0, function* () {
            const alerts = yield alert_schema_1.default.find().exec();
            return alerts.map((alert) => new Notification_1.default(alert.toObject()));
        });
    }
    /**
     * Save a new notification in the database
     * @param notification the notification to be created
     * @returns the id of the created notification
     */
    static saveAlert(alert) {
        return __awaiter(this, void 0, void 0, function* () {
            const alertDocument = new alert_schema_1.default(alert);
            // save the notification in the database and return the id
            return (yield alertDocument.save()).id;
        });
    }
}
exports.default = AlertDAO;
//# sourceMappingURL=alert.js.map