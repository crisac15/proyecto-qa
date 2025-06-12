import alertSchema from "../schemas/alert.schema";
import Notification from "../model/Notification";

export default class AlertDAO {
  /**
   * get all notifications in data base
   */
  public static async getAllAlerts(): Promise<Notification[]> {
    const alerts = await alertSchema.find().exec();
    return alerts.map((alert) => new Notification(alert.toObject()));
  }
  /**
   * Save a new notification in the database
   * @param notification the notification to be created
   * @returns the id of the created notification
   */
  public static async saveAlert(alert: Notification): Promise<string> {
    const alertDocument = new alertSchema(alert);
    // save the notification in the database and return the id
    return (await alertDocument.save()).id;
  }
}
