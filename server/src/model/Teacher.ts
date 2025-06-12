import TeacherDTO from "../DTOs/teacher";
import Campus from "./campusENUM";
import User from "./User";

export default class Teacher extends User {
  private officePNumber: string;
  private personalPNumber: string;
  private isMember: boolean;

  // Constructor, include the posibility to use TeacherDTO instead of all the parameters
  constructor(
    IDorDTO: string | TeacherDTO,
    name?: string,
    email?: string,
    password?: string,
    campus?: Campus,
    officePNumber?: string,
    personalPNumber?: string,
    isLeader?: boolean,
    isMember?: boolean,
    photo?: string
  ) {
    if (typeof IDorDTO === "string") {
      super(name, email, password, campus, "teacher", isLeader, photo, IDorDTO);
      this.officePNumber = officePNumber;
      this.personalPNumber = personalPNumber;
      this.isMember = isMember;
    } else {
      let dbId: string;
      try {
        dbId = IDorDTO._id.toString();
      } catch {
        dbId = IDorDTO._id;
      }
      super(
        IDorDTO.name,
        IDorDTO.email,
        IDorDTO.password,
        IDorDTO.campus,
        "teacher",
        IDorDTO.isLeader,
        IDorDTO.photo,
        IDorDTO.id,
        dbId
      );
      this.officePNumber = IDorDTO.officePNumber;
      this.personalPNumber = IDorDTO.personalPNumber;
      this.isMember = IDorDTO.isMember;
    }
  }

  // Getter and Setter for officePNumber
  getOfficePNumber(): string {
    return this.officePNumber;
  }

  setOfficePNumber(officePNumber: string): void {
    this.officePNumber = officePNumber;
  }

  // Getter and Setter for personalPNumber
  getPersonalPNumber(): string {
    return this.personalPNumber;
  }

  setPersonalPNumber(personalPNumber: string): void {
    this.personalPNumber = personalPNumber;
  }

  setIsLeader(isLeader: boolean): void {
    super.setIsLeader(isLeader);
  }

  setIsMember(isMember: boolean): void {
    this.isMember = isMember;
  }
}
