import Student from "./Student";
import Notification from "./Notification";
import StudentDAO from "../DAOs/student";
import { Observer } from "./Observer";
import StudentAdapter from "./StudentAdapter";
import AlertDAO from "../DAOs/alert";

export default class NotificationCenter implements Observer {
  private static instance: NotificationCenter;
  private notifications: Notification[] = [];
  private students: StudentAdapter[] = [];

  private constructor() {
    this.fetch();
  }

  public static getInstance(): NotificationCenter {
    if (!NotificationCenter.instance) {
      NotificationCenter.instance = new NotificationCenter();
    }
    return NotificationCenter.instance;
  }

  public async fetch() {
    // Fetch data from database

    // Fetch students from database
    await StudentDAO.getAllStudentsAdapted().then((students) => {
      this.students = students;
    });
    await AlertDAO.getAllAlerts().then((notifications) => {
      this.notifications = notifications;
    });
  }

  public async update(notification: Notification): Promise<void> {
    await this.fetch();
    this.notifications.push(notification);
    const notificationID = await AlertDAO.saveAlert(notification);

    // FIXME: Something is wrong here
    // Notify students
    console.log(
      "sendingAlert:" +
        notificationID +
        " to students. " +
        notification.getBody()
    );

    this.students.forEach((student) => {
      student.receiveNotification(notificationID);
      StudentDAO.updateStudentInbox(
        student.getCarnet().toString(),
        student.getInbox()
      );
    });
  }
}
