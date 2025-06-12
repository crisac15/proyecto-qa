// Purpose: Interface for assistantDTO.

import Campus from "../model/campusENUM";

interface AssistantDTO {
  _id?: string; // unique identifier from the database
  id?: string; // unique identifier of the Assistant
  name: string; // name of the Assistant
  email: string; // email of the Assistant
  password: string; // password of the Assistant
  campus: Campus; // campus of the Assistant
  userType: "assistant"; // type of the user
}

export default AssistantDTO;
