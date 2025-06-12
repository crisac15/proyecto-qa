"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const forum_schema_1 = __importDefault(require("./forum.schema"));
const teacher_schema_1 = require("./teacher.schema");
const activitySchema = new mongoose_1.Schema({
    id: {
        // Unique identifier of the activity
        type: Number,
        required: true,
    },
    name: {
        // Name of the activity
        type: String,
        required: true,
    },
    week: {
        // Week of the activity
        type: Number,
        required: true,
    },
    date: {
        // Start date of the activity
        type: Date,
        required: true,
    },
    prevDays: {
        // Publish date of the activity
        type: Number,
        required: true,
    },
    reminderInterval: {
        // Notification interval of the activity
        type: Number,
        required: true,
    },
    type: {
        // Type of the activity
        type: String,
        required: true,
    },
    responsibles: {
        // Responsibles of the activity
        type: [teacher_schema_1.teacherSchema],
        required: true,
    },
    attachmentFile: {
        // Attachements of the activity
        type: String,
        required: true,
    },
    modality: {
        // Modality of the activity
        type: String,
        required: true,
    },
    link: {
        // Link of the activity
        type: String,
        required: true,
    },
    evidence: {
        // Evidence of the activity
        type: [String],
        required: true,
    },
    status: {
        // Status of the activity
        type: String,
        required: true,
    },
    forum: {
        // Forum of the activity
        type: forum_schema_1.default,
        required: true,
    },
    observation: {
        // Observation of the activity
        type: String,
        required: true,
    },
});
// Create and export the Teacher model
exports.default = activitySchema;
// {
//   "name" : "Test Activity Tres",
//   "week": 12,
//   "date": "2024-04-29T12:00:00.000Z",
//   "prevDays" : 3,
//   "reminderInterval": 1,
//   "responsibles": ["John Doe", "Jane Smith"],
//   "type" : "Test",
//   "modality": "Online",
//   "status": "Active",
//   "link": "https://example.com",
//   "attachmentFile": "test.pdf",
//   "forum": "https://example.com/forum"
// }
//# sourceMappingURL=activity.schema.js.map