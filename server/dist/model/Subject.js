"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const NotificationCenter_1 = __importDefault(require("./NotificationCenter"));
class Subject {
    constructor() {
        this.observers = [];
        this.observers.push(NotificationCenter_1.default.getInstance());
    }
    addObserver(observer) {
        if (!this.observers.includes(observer)) {
            this.observers.push(observer);
        }
    }
    removeObserver(observer) {
        const index = this.observers.indexOf(observer);
        if (index !== -1) {
            this.observers.splice(index, 1);
        }
    }
    notifyObservers(notification) {
        this.observers.forEach((observer) => {
            observer.update(notification);
        });
    }
}
exports.default = Subject;
//# sourceMappingURL=Subject.js.map