import Notification from "./Notification";

export interface Observer {
  update(notification: Notification): void;
}
