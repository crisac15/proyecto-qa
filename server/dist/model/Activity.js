"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Forum_1 = __importDefault(require("./Forum"));
const Message_1 = __importDefault(require("./Message"));
const Teacher_1 = __importDefault(require("./Teacher"));
const Subject_1 = __importDefault(require("./Subject"));
const Notification_1 = __importDefault(require("./Notification"));
class Activity extends Subject_1.default {
    // Constructor
    constructor(NameOrDTO, week, date, prevDays, reminderInterval, responsibles, type, modality, status, link, attachmentFile, forum, observation) {
        super();
        this.evidence = [];
        if (typeof NameOrDTO === "string") {
            this.name = NameOrDTO;
            this.week = week;
            this.date = date;
            this.prevDays = prevDays;
            this.reminderInterval = reminderInterval;
            this.responsibles = responsibles;
            this.type = type;
            this.modality = modality;
            this.status = status;
            this.link = link;
            this.attachmentFile = attachmentFile;
            this.forum = forum;
            this.observation = observation;
        }
        else {
            this.id = NameOrDTO.id;
            this.name = NameOrDTO.name;
            this.week = NameOrDTO.week;
            this.date = NameOrDTO.date;
            this.prevDays = NameOrDTO.prevDays;
            this.reminderInterval = NameOrDTO.reminderInterval;
            this.type = NameOrDTO.type;
            this.modality = NameOrDTO.modality;
            this.status = NameOrDTO.status;
            this.link = NameOrDTO.link;
            this.attachmentFile = NameOrDTO.attachmentFile;
            this.evidence = NameOrDTO.evidence;
            this.observation = NameOrDTO.observation;
            this.responsibles = NameOrDTO.responsibles.map((teacherDTO) => new Teacher_1.default(teacherDTO));
            if (NameOrDTO.forum) {
                const messages = NameOrDTO.forum.messages.map((messageDTO) => new Message_1.default(messageDTO));
                this.forum = new Forum_1.default(messages);
            }
            else {
                this.forum = new Forum_1.default();
            }
        }
    }
    // Getter and Setter for name
    getName() {
        return this.name;
    }
    setName(name) {
        this.name = name;
    }
    // Getter and Setter for week
    getWeek() {
        return this.week;
    }
    setWeek(week) {
        this.week = week;
    }
    getForum() {
        return this.forum;
    }
    setForum(forum) {
        this.forum = forum;
    }
    getID() {
        return this.id;
    }
    setID(id) {
        this.id = id;
    }
    getStatus() {
        return this.status;
    }
    setStatus(status) {
        this.status = status;
    }
    getPrevDays() {
        return this.prevDays;
    }
    getDate() {
        return this.date;
    }
    getReminderInterval() {
        return this.reminderInterval;
    }
    getPublishDate() {
        const publishDate = new Date();
        publishDate.setDate(this.date.getDate() - this.prevDays);
        return publishDate;
    }
    // Method to send reminder manually
    sendReminder(user) {
        const notification = new Notification_1.default("Recordatorio", `La actividad ${this.name} se llevará a cabo el ${this.date}`, user);
        this.notifyObservers(notification);
        this.status = "Notificada";
    }
    // Method to send cancellation
    sendCancellation(user) {
        const notification = new Notification_1.default("Cancelación", `La actividad ${this.name} ha sido cancelada, motivo: ${this.observation}`, user);
        this.notifyObservers(notification);
        this.status = "Cancelada";
    }
    // Método accept para aceptar visitantes
    accept(visitor) {
        visitor.visitActivity(this);
    }
}
exports.default = Activity;
//# sourceMappingURL=Activity.js.map