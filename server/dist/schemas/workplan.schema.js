"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importStar(require("mongoose"));
const activity_schema_1 = __importDefault(require("./activity.schema"));
// Define the schema for the Teacher collection
const workplanSchema = new mongoose_1.Schema({
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
        type: [activity_schema_1.default],
    },
});
exports.default = mongoose_1.default.model("Workplan", workplanSchema);
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
//# sourceMappingURL=workplan.schema.js.map