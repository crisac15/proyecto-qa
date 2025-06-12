import ActivityDTO from "../DTOs/activity";
import Forum from "./Forum";
import Message from "./Message";
import Email from "../controllers/sendEmail";
import Teacher from "./Teacher";
import Visitor from "./Visitor";
import Subject from "./Subject";
import Notification from "./Notification";

export default class Activity extends Subject {
  private id: number;
  private name: string;
  private week: number;
  private date: Date;
  private prevDays: number;
  private reminderInterval: number;
  private responsibles: Teacher[];
  private type: string;
  private modality: string;
  private status: string;
  private link?: string;
  private evidence?: string[] = [];
  private attachmentFile?: string;
  private forum?: Forum;
  private observation?: string;

  // Constructor
  constructor(
    NameOrDTO: string | ActivityDTO,
    week?: number,
    date?: Date,
    prevDays?: number,
    reminderInterval?: number,
    responsibles?: Teacher[],
    type?: string,
    modality?: string,
    status?: string,
    link?: string,
    attachmentFile?: string,
    forum?: Forum,
    observation?: string
  ) {
    super();
    if (typeof NameOrDTO === "string") {
      this.name = NameOrDTO;
      this.week = week;
      this.date = date;
      this.prevDays = prevDays;
      this.reminderInterval = reminderInterval;
      this.responsibles = responsibles;
      this.type = type;
      this.modality = modality;
      this.status = status;
      this.link = link;
      this.attachmentFile = attachmentFile;
      this.forum = forum;
      this.observation = observation;
    } else {
      this.id = NameOrDTO.id;
      this.name = NameOrDTO.name;
      this.week = NameOrDTO.week;
      this.date = NameOrDTO.date;
      this.prevDays = NameOrDTO.prevDays;
      this.reminderInterval = NameOrDTO.reminderInterval;
      this.type = NameOrDTO.type;
      this.modality = NameOrDTO.modality;
      this.status = NameOrDTO.status;
      this.link = NameOrDTO.link;
      this.attachmentFile = NameOrDTO.attachmentFile;
      this.evidence = NameOrDTO.evidence;
      this.observation = NameOrDTO.observation;
      this.responsibles = NameOrDTO.responsibles.map(
        (teacherDTO) => new Teacher(teacherDTO)
      );
      if (NameOrDTO.forum) {
        const messages = NameOrDTO.forum.messages.map(
          (messageDTO) => new Message(messageDTO)
        );
        this.forum = new Forum(messages);
      } else {
        this.forum = new Forum();
      }
    }
  }

  // Getter and Setter for name
  getName(): string {
    return this.name;
  }

  setName(name: string): void {
    this.name = name;
  }

  // Getter and Setter for week
  getWeek(): number {
    return this.week;
  }

  setWeek(week: number): void {
    this.week = week;
  }

  getForum(): Forum {
    return this.forum;
  }

  setForum(forum: Forum): void {
    this.forum = forum;
  }

  getID(): number {
    return this.id;
  }

  setID(id: number): void {
    this.id = id;
  }

  getStatus(): string {
    return this.status;
  }

  setStatus(status: string): void {
    this.status = status;
  }

  getPrevDays(): number {
    return this.prevDays;
  }

  getDate(): Date {
    return this.date;
  }

  getReminderInterval(): number {
    return this.reminderInterval;
  }

  getPublishDate(): Date {
    const publishDate = new Date();
    publishDate.setDate(this.date.getDate() - this.prevDays);
    return publishDate;
  }

  // Method to send reminder manually
  sendReminder(user: string): void {
    const notification = new Notification(
      "Recordatorio",
      `La actividad ${this.name} se llevará a cabo el ${this.date}`,
      user
    );
    this.notifyObservers(notification);
    this.status = "Notificada";
  }

  // Method to send cancellation
  sendCancellation(user: string): void {
    const notification = new Notification(
      "Cancelación",
      `La actividad ${this.name} ha sido cancelada, motivo: ${this.observation}`,
      user
    );
    this.notifyObservers(notification);
    this.status = "Cancelada";
  }

  // Método accept para aceptar visitantes
  accept(visitor: Visitor): void {
    visitor.visitActivity(this);
  }
}
