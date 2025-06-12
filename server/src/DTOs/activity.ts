import ForumDTO from "./forum";
import TeacherDTO from "./teacher";

interface ActivityDTO {
  id?: number; // unique identifier of the activity
  name: string; // name of the activity
  week: number; // week of the activity
  date: Date; // date of the activity
  prevDays: number; // number of days before the activity starts to be published
  reminderInterval: number; // interval in days between reminders
  responsibles: TeacherDTO[]; // list of responsibles for the activitu
  type: string; // type of the activity
  modality: string; // modality of the activity
  status: string; // status of the activity
  link?: string; // link to the activity
  attachmentFile?: string; // attachment of the activity
  evidence?: string[]; // list of evidence of the activity
  forum?: ForumDTO; // forum of the activity
  observation?: string; // observation of the activity
}

export default ActivityDTO;
