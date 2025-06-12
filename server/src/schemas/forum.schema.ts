import mongoose, { Schema } from "mongoose";
import messageSchema from "./message.schema";

// Define the schema for the Forum in activities
const forumSchema: Schema = new Schema({
  messages: {
    // List of messages
    type: [messageSchema],
  },
});

export default forumSchema;
