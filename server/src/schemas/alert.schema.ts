import mongoose, { Schema } from "mongoose";

// Define the schema for the Alerts collection
const alertSchema: Schema = new Schema({
  title: {
    // Title of the notification
    type: String,
    required: true,
  },
  body: {
    // Text of the notification
    type: String,
    required: true,
  },
  sender: {
    // Sender of the notification
    type: String,
    default: "Notificación automática",
  },
  postDate: {
    // Date of the notification
    type: String,
    required: true,
  },
});
// Create and export the Notification Alert Model
export default mongoose.model("Alert", alertSchema);
