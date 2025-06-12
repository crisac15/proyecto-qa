import Visitor from "./Visitor";
import Activity from "./Activity";
import Subject from "./Subject";
import Notification from "./Notification";

export default class PublishVisitor extends Subject implements Visitor {
  private systemDate: Date;

  constructor(systemDate: Date) {
    super();
    this.systemDate = systemDate;
  }

  visitActivity(activity: Activity): void {
    const publishDate = activity.getPublishDate();
    // console.log(
    //   activity.getStatus() + " " + publishDate + " " + this.systemDate
    // );

    if (activity.getStatus() === "Planeada" && publishDate <= this.systemDate) {
      activity.setStatus("Publicada");
      console.log(`Published: ${activity.getName()}`);
      // Observer pattern
      const notification = new Notification(
        "Publicación",
        `La actividad ${activity.getName()} ha sido publicada`
      );
      notification.setPostDate(this.systemDate);

      super.notifyObservers(notification);
    }
  }
}
