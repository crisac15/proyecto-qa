"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Notification {
    constructor(title, body, sender) {
        this.sender = "Notificación automática";
        if (typeof title === "string") {
            this.title = title;
            this.body = body;
            this.postDate = new Date();
            if (sender) {
                this.sender = sender;
            }
        }
        else {
            this.id = title._id.toString();
            this.title = title.title;
            this.body = title.body;
            this.postDate = title.postDate;
            if (title.sender) {
                this.sender = title.sender;
            }
        }
    }
    getTitle() {
        return this.title;
    }
    getBody() {
        return this.body;
    }
    getPostDate() {
        return this.postDate;
    }
    setPostDate(postDate) {
        this.postDate = postDate;
    }
    setTitle(title) {
        this.title = title;
    }
}
exports.default = Notification;
//# sourceMappingURL=Notification.js.map