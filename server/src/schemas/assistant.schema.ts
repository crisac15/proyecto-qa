import mongoose, { Schema } from "mongoose";

// Define the schema for the Teacher collection
const assistantSchema: Schema = new Schema({
    name: {
        // Name of the teacher
        type: String,
        required: true,
      },
    email: {
    // Email of the assistant
    type: String,
    required: true,
    unique: true,
  },
  password: {
    // Password of the assistant
    type: String,
    required: true,
  },
  campus: {
    // Campus of the assistant
    type: String,
    required: true,
  },
});
// Create and export the Teacher model
export default mongoose.model("Assistant", assistantSchema);