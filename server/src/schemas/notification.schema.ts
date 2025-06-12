import mongoose, { Schema } from "mongoose";

const notification: Schema = new Schema({
  date: {
    type: Date,
    required: true,
  },
});

export default mongoose.model("Notification", notification);