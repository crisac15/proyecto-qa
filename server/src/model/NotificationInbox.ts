import InboxDTO from "../DTOs/inbox";

export default class NotificationInbox {
  private notifications: string[] = []; // Notification IDs
  private readNotifications: string[] = []; // Notification IDs

  public constructor(inbox: InboxDTO) {
    this.notifications = inbox.notifications;
    this.readNotifications = inbox.readNotifications;
  }

  public addNotification(notificationID: string): void {
    this.notifications.push(notificationID);
  }

  public markAsRead(notificationID: string): void {
    this.readNotifications.push(notificationID);
  }

  public deleteNotification(notificationID: string): void {
    this.notifications = this.notifications.filter(
      (id) => id !== notificationID
    );
    this.readNotifications = this.readNotifications.filter(
      (id) => id !== notificationID
    );
  }

  public deleteReadNotifications(): void {
    // Remove read notifications from both lists
    this.notifications = this.notifications.filter(
      (id) => !this.readNotifications.includes(id)
    );
    this.readNotifications = [];
  }

  public getNotifications(): string[] {
    return this.notifications;
  }

  public getUnreadNotifications(): string[] {
    return this.notifications.filter(
      (id) => !this.readNotifications.includes(id)
    );
  }
}
