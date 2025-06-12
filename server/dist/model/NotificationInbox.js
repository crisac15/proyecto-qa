"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class NotificationInbox {
    constructor(inbox) {
        this.notifications = []; // Notification IDs
        this.readNotifications = []; // Notification IDs
        this.notifications = inbox.notifications;
        this.readNotifications = inbox.readNotifications;
    }
    addNotification(notificationID) {
        this.notifications.push(notificationID);
    }
    markAsRead(notificationID) {
        this.readNotifications.push(notificationID);
    }
    deleteNotification(notificationID) {
        this.notifications = this.notifications.filter((id) => id !== notificationID);
        this.readNotifications = this.readNotifications.filter((id) => id !== notificationID);
    }
    deleteReadNotifications() {
        // Remove read notifications from both lists
        this.notifications = this.notifications.filter((id) => !this.readNotifications.includes(id));
        this.readNotifications = [];
    }
    getNotifications() {
        return this.notifications;
    }
    getUnreadNotifications() {
        return this.notifications.filter((id) => !this.readNotifications.includes(id));
    }
}
exports.default = NotificationInbox;
//# sourceMappingURL=NotificationInbox.js.map