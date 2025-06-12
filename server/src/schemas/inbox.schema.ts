import mongoose, { Schema } from "mongoose";

const inboxSchema: Schema = new Schema({
  notifications: { type: [String], required: true },
  readNotifications: { type: [String], required: true },
});

export default inboxSchema;
