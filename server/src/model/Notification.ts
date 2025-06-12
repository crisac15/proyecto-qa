import AlertDTO from "../DTOs/alert";

export default class Notification {
  private id: string;
  private title: string;
  private body: string;
  private sender: string = "Notificación automática";
  private postDate: Date;

  public constructor(title: string | AlertDTO, body?: string, sender?: string) {
    if (typeof title === "string") {
      this.title = title;
      this.body = body;
      this.postDate = new Date();
      if (sender) {
        this.sender = sender;
      }
    } else {
      this.id = title._id.toString();
      this.title = title.title;
      this.body = title.body;
      this.postDate = title.postDate;
      if (title.sender) {
        this.sender = title.sender;
      }
    }
  }

  public getTitle(): string {
    return this.title;
  }

  public getBody(): string {
    return this.body;
  }

  public getPostDate(): Date {
    return this.postDate;
  }

  public setPostDate(postDate: Date): void {
    this.postDate = postDate;
  }

  public setTitle(title: string): void {
    this.title = title;
  }
}
