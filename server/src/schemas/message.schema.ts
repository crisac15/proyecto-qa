import mongoose, { Schema } from "mongoose";

// Define the schema for the messages and replies in forums
const replySchema: Schema = new Schema({
  user: {
    // Emisor of the reply
    type: String,
    required: true,
  },

  date: {
    // Start date of the reply
    type: Date,
    required: true,
  },

  content: {
    // Content of the reply
    type: String,
    required: true,
  },
});

const messageSchema: Schema = new Schema({
  id: {
    // Unique identifier of the message
    type: Number,
    required: true,
  },

  user: {
    // Emisor of the message
    type: String,
    required: true,
  },

  date: {
    // Start date of the message
    type: Date,
    required: true,
  },

  content: {
    // Content of the message
    type: String,
    required: true,
  },

  replies: {
    // Replies to the message
    type: [replySchema],
    required: false,
  },
});

export default messageSchema;
