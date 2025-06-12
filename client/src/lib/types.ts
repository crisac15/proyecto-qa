export enum Campus {
  CA = "CA",
  AL = "AL",
  SJ = "SJ",
  SC = "SC",
  LI = "LI",
}
export enum ActivityType {
  ORIENTADORA = "Orientadora",
  MOTIVACIONAL = "Motivacional",
  APOYO = "Apoyo",
  TECNICA = "Técnica",
  RECREATIVA = "Recreativa",
}

export enum ActivityStatus {
  PLANEADA = "Planeada",
  PUBLICADA = "Publicada",
  NOTIFICADA = "Notificada",
  REALIZADA = "Realizada",
  CANCELADA = "Cancelada",
}

export enum Modalities {
  PRESENCIAL = "Presencial",
  VIRTUAL = "Virtual",
}

export interface User {
  userType?: "teacher" | "assistant" | "student"; // type of the user
  name: string; // full name of the user
  email: string; // email of the user
  password: string; // password of the user
  id?: string; // unique identifier of the user
  photo?: string; // URL of the photo of the user
  campus: Campus; // campus where the user is located
  isLeader?: boolean; // if the user is the leader of the team
}

export interface Teacher extends User {
  userType: "teacher";
  id: string; // unique identifier [campus]-[number]
  officePNumber: string; // office phone number of the teacher
  personalPNumber: string; // personal phone number of the teacher
  photo?: string; // URL of the photo of the teacher
  isLeader?: boolean; // if the teacher is the leader of the team
}

export interface Student extends User {
  userType: "student";
  carnet: number; // unique identifier of the student
  name: string; // full name of the student
  email: string; // email of the student
  personalPNumber: string; // personal phone number of the student
}

export interface Activity {
  id?: string; // unique identifier of the activity
  name: string; // name of the activity
  week: number; // week of the activity in the work plan
  date: Date; // date of the activity
  prevDays: number; // days before the activity to send the reminder
  reminderInterval: number; // interval of the reminder of the activity
  responsibles: Teacher[]; // list of teachers responsible for the activity
  type: ActivityType; // type of the activity
  modality: Modalities; // modality of the activity
  status: ActivityStatus; // status of the activity
  link?: string; // link of the activity if it is virtual
  attachmentFile?: string; // attachment file of the activity
  forum?: Forum; // forum of the activity
  observation?: string; // observation of the activity
  evidence?: string[]; // list of evidence of the activity (photos, videos, etc.)
}

export interface WorkPlan {
  id: string; // unique identifier of the work plan
  name: string; // name of the work plan
  description: string; // description of the work plan
  activities: Activity[]; // list of activities in the work plan
}

export interface Forum {
  id?: string; // unique identifier of the forum
  messages: Array<Message>; // list of messages of the forum
}

export interface Message {
  id?: string; // unique identifier of the message
  user: string; // user that sent the message
  date: Date; // date of the message
  content: string; // content of the message
  replies: Array<Message>; // replies list of the message
}

export interface Inbox {
  notifications: string[]; // list of notifications
  readNotifications: string[]; // list of read notifications
}

export interface Notification {
  id: string; // unique identifier of the notification
  title: string; // title of the notification
  body: string; // content of the notification
  postDate: Date; // date of the notification
  sender: string; // sender of the notification
  read?: boolean; // if the notification was read
}
