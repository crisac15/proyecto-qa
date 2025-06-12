import AssistantDTO from "../DTOs/assistant";
import Campus from "./campusENUM";
import User from "./User";

export default class Assistant extends User {
  // Constructor, include the posibility to use TeacherDTO instead of all the parameters
  constructor(
    IDorDTO: string | AssistantDTO,
    name?: string,
    email?: string,
    password?: string,
    campus?: Campus
  ) {
    if (typeof IDorDTO === "string") {
      super(name, email, password, campus, "assistant", false, "", IDorDTO);
    } else {
      super(
        IDorDTO.name,
        IDorDTO.email,
        IDorDTO.password,
        IDorDTO.campus,
        "assistant",
        false,
        "",
        IDorDTO.id,
        IDorDTO._id.toString()
      );
    }
  }
}
