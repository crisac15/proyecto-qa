import MessageDTO from "../DTOs/message";

export default class Message {
  private id?: string; // unique identifier of the message
  private user: string; // user that sent the message
  private date: Date; // date of the message
  private content: string; // content of the message
  private replies: Array<Message>; // replies list of the message

  public constructor(
    IDorDTO: string | MessageDTO,
    user?: string,
    date?: Date,
    content?: string,
    replies?: Message[]
  ) {
    if (typeof IDorDTO === "string") {
      this.id = IDorDTO;
      this.user = user;
      this.date = date;
      this.content = content;
      this.replies = replies;
    } else {
      this.id = IDorDTO.id;
      this.user = IDorDTO.user;
      this.date = IDorDTO.date;
      this.content = IDorDTO.content;
      if (IDorDTO.replies) {
        this.replies = IDorDTO.replies.map((replyDTO) => new Message(replyDTO));
      } else {
        this.replies = [];
      }
    }
  }

  //Getters
  public getId(): string {
    return this.id;
  }

  public setId(id: string): void {
    this.id = id;
  }

  public getUser(): string {
    return this.user;
  }

  public getdate(): Date {
    return this.date;
  }

  public getcontent(): string {
    return this.content;
  }

  public getReplies(): Array<Message> {
    return this.replies;
  }

  //Setters
  public setUser(user: string): void {
    this.user = user;
  }

  public setDate(date: Date): void {
    this.date = date;
  }

  public setContent(content: string): void {
    this.content = content;
  }

  public setReplies(replies: Array<Message>): void {
    this.replies = replies;
  }

  public addReply(reply: Message): void {
    this.replies.push(reply);
  }
}
