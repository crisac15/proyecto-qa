// User OOP class

import Campus from "./campusENUM";

class User {
  private dbId: string;
  private id: string;
  private name: string;
  private email: string;
  private password: string;
  private photo: string;
  private campus: Campus;
  private isLeader: boolean = false;
  private userType: "teacher" | "assistant" | "student";

  // Constructor
  constructor(
    name: string,
    email: string,
    password: string,
    campus: Campus,
    userType: "teacher" | "assistant" | "student",
    isLeader?: boolean,
    photo?: string,
    id?: string,
    dbId?: string
  ) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.password = password;
    this.photo = photo;
    this.campus = campus;
    this.userType = userType;
    this.isLeader = isLeader;
    this.dbId = dbId;
  }

  // Getters
  public getId(): string {
    return this.id;
  }

  public getName(): string {
    return this.name;
  }

  public getEmail(): string {
    return this.email;
  }

  public getPassword(): string {
    return this.password;
  }

  public getPhoto(): string {
    return this.photo;
  }

  public getCampus(): Campus {
    return this.campus;
  }

  public getUserType(): "teacher" | "assistant" | "student" {
    return this.userType;
  }

  // Setters
  public setId(id: string): void {
    this.id = id;
  }

  public setName(name: string): void {
    this.name = name;
  }

  public setEmail(email: string): void {
    this.email = email;
  }

  public setPassword(password: string): void {
    this.password = password;
  }

  public setPhoto(photo: string): void {
    this.photo = photo;
  }

  public setCampus(campus: Campus): void {
    this.campus = campus;
  }

  public getDbId(): string {
    return this.dbId;
  }

  public setDbId(dbId: string): void {
    this.dbId = dbId;
  }

  public setIsLeader(isLeader: boolean): void {
    this.isLeader = isLeader;
  }

  public getIsLeader(): boolean {
    return this.isLeader;
  }
}

export default User;
