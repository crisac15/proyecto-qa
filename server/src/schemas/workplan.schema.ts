import mongoose, { Schema } from "mongoose";
import activitySchema from "./activity.schema";

// Define the schema for the Teacher collection
const workplanSchema: Schema = new Schema({
  name: {
    // Name of the workplan
    type: String,
    required: true,
  },
  description: {
    // description of the workplan
    type: String,
    required: true,
  },
  activities: {
    type: [activitySchema],
  },
});

export default mongoose.model("Workplan", workplanSchema);

// json example

// {
//   "name": "Workplan 1",
//   "description": "This is the first workplan",
//   "activities": [
//     {
//       "name": "Activity 1",
//       "description": "This is the first activity",
//       "date": "2021-09-01",
//       "time": "09:00",
//       "place": "Classroom 1",
//       "type": "Class",
//       "status": "Pending",
//       "teacher": "Teacher 1",
//     },
//     {
//       "name": "Activity 2",
//       "description": "This is the second activity",
//       "date": "2021-09-02",
//       "time": "10:00",
//       "place": "Classroom 2",
//       "type": "Class",
//       "status": "Pending",
//       "teacher": "Teacher 2",
//     },
//   ],
//   "year": 2021,
//   "semester": 1,
// }

// {
//   "name": "Workplan 1",
//   "description": "This is the first workplan",
//   "activities": [],
//   "year": 2021,
//   "semester": 1,
// }
