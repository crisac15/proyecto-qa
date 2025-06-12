import notificationSchema from "../schemas/notification.schema";

export default class NotificationDAO {
  /**
   * Create a new notification in the database
   * @param notification the notification to be created
   */
  public static async getLastNotification(): Promise<Date> {
    const notificationData = await notificationSchema
      .findOne()
      .sort({ _id: -1 })
      .limit(1)
      .exec();
    if (!notificationData) {
      const yesterday = new Date();
      yesterday.setDate(yesterday.getDate() - 1);
      return yesterday;
    }
    let date: Date = notificationData.date as Date;
    return date;
  }

  /**
   * Create a new notification in the database
   * @param notification the notification to be created
   */
  public static async addNotification(notification: Date): Promise<void> {
    await notificationSchema.create({ date: notification });
  }
}
