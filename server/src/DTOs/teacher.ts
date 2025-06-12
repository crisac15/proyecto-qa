// Purpose: Interface for teacherDTO.

import Campus from "../model/campusENUM";

interface TeacherDTO {
  _id?: string; // unique identifier from the database
  id?: string; // unique identifier of the teacher
  name: string; // name of the teacher
  email: string; // email of the teacher
  password: string; // password of the teacher
  campus: Campus; // campus of the teacher
  userType: "teacher"; // type of the user
  photo?: string; // URL of the photo of the teacher
  officePNumber: string; // office phone number of the teacher
  personalPNumber: string; // personal phone number of the teacher
  isLeader: boolean; // if the teacher is the leader of the team
  isMember: boolean; // if the teacher is a member of the team
}

export default TeacherDTO;
