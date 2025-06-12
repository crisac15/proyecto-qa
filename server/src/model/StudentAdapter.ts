import User from "./User";
import Student from "./Student";
import CampusENUM from "./campusENUM";
import StudentDTO from "../DTOs/student";
import NotificationInbox from "./NotificationInbox";

export default class StudentAdapter extends User {
  private student: Student;
  private inbox: NotificationInbox;

  constructor(student: StudentDTO) {
    super(
      student.name,
      student.email,
      student.password || student.carnet.toString(),
      student.campus,
      "student",
      undefined,
      student.photo ||
        "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_640.png",
      student.carnet.toString(),
      student._id.toString()
    );
    this.student = new Student(student);
    if (!student.inbox) {
      student.inbox = { notifications: [], readNotifications: [] };
    }
    this.inbox = new NotificationInbox(student.inbox);
  }

  public getCarnet(): number {
    return this.student.getCarnet();
  }

  public getPhoneNumber(): number {
    return this.student.getPhoneNumber();
  }

  public getCampus(): CampusENUM {
    return this.student.getCampus();
  }

  public getInbox(): NotificationInbox {
    return this.inbox;
  }

  public receiveNotification(notificationID: string): void {
    this.inbox.addNotification(notificationID);
  }
}
