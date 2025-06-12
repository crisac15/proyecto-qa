import mongoose, { Schema } from "mongoose";
import { teacherSchema } from "./teacher.schema";

export const teacherSchemaLog: Schema = new Schema({
  id: {
    // Code of the teacher (e.g. AL-01), includes the campus code
    type: String,
    required: true,
    unique: false,
  },
  name: {
    // Name of the teacher
    type: String,
    required: true,
  },
  email: {
    // Email of the teacher
    type: String,
    required: true,
  },
  password: {
    // Password of the teacher
    type: String,
    required: true,
  },
  photo: {
    // Photo of the teacher (URL)
    type: String,
    required: false,
  },
  officePNumber: {
    // Office phone number of the teacher
    type: String,
    required: true,
  },
  personalPNumber: {
    // Personal phone number of the teacher
    type: String,
    required: true,
  },
  isLeader: {
    // Indicates if the teacher is the leader of the team
    type: Boolean,
    required: false,
    default: false,
  },
  isMember: {
    // Indicates if the teacher is a member of the team
    type: Boolean,
    required: false,
    default: false,
  },
  campus: {
    // Campus of the teacher
    type: String,
    required: true,
  },
});

// Define the schema for the messages and replies in forums
const logTeam: Schema = new Schema({
  agenteCambio: {
    type: String,
    required: true,
  },
  antes: {
    type: teacherSchemaLog,
    required: false,
    unique: false,
  },
  despues: {
    type: teacherSchemaLog,
    required: false,
    unique: false,
  },
  accion: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
});

export default mongoose.model("LogTeam", logTeam);
