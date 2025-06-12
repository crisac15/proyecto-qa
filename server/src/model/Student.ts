import StudentDTO from "../DTOs/student";
import CampusENUM from "./campusENUM";

export default class Student {
  private carnet: number;
  private name: string;
  private email: string;
  private personalPNumber: number;
  private campus: CampusENUM;

  constructor(
    carnetOrStudentDTO: number | StudentDTO,
    name?: string,
    email?: string,
    personalPNumber?: number,
    campus?: CampusENUM
  ) {
    if (typeof carnetOrStudentDTO === "number") {
      this.carnet = carnetOrStudentDTO;
      this.name = name;
      this.email = email;
      this.personalPNumber = personalPNumber;
      this.campus = campus;
    } else {
      this.carnet = carnetOrStudentDTO.carnet;
      this.name = carnetOrStudentDTO.name;
      this.email = carnetOrStudentDTO.email;
      this.personalPNumber = carnetOrStudentDTO.personalPNumber;
      this.campus = carnetOrStudentDTO.campus;
    }
  }

  // Getters
  public getCarnet(): number {
    return this.carnet;
  }

  public getName(): string {
    return this.name;
  }

  public getEmail(): string {
    return this.email;
  }

  public getPhoneNumber(): number {
    return this.personalPNumber;
  }

  public getCampus(): CampusENUM {
    return this.campus;
  }

  // Setters
  public setCarnet(carnet: number): void {
    this.carnet = carnet;
  }

  public setName(name: string): void {
    this.name = name;
  }

  public setEmail(email: string): void {
    this.email = email;
  }

  public setPhoneNumber(personalPNumber: number): void {
    this.personalPNumber = personalPNumber;
  }

  public setCampus(campus: CampusENUM): void {
    this.campus = campus;
  }
}
