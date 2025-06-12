import Notification from "./Notification";
import NotificationCenter from "./NotificationCenter";
import { Observer } from "./Observer";

export default class Subject {
  private observers: Observer[] = [];

  public constructor() {
    this.observers.push(NotificationCenter.getInstance());
  }

  public addObserver(observer: Observer): void {
    if (!this.observers.includes(observer)) {
      this.observers.push(observer);
    }
  }

  public removeObserver(observer: Observer): void {
    const index = this.observers.indexOf(observer);
    if (index !== -1) {
      this.observers.splice(index, 1);
    }
  }

  public notifyObservers(notification: Notification): void {
    this.observers.forEach((observer) => {
      observer.update(notification);
    });
  }
}
