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
Object.defineProperty(exports, "__esModule", { value: true });
exports.teacherSchema = void 0;
const mongoose_1 = __importStar(require("mongoose"));
// Define the schema for the Teacher collection
exports.teacherSchema = new mongoose_1.Schema({
    id: {
        // Code of the teacher (e.g. AL-01), includes the campus code
        type: String,
        required: true,
        unique: true,
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
        unique: true,
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
// Create and export the Teacher model
exports.default = mongoose_1.default.model("Teacher", exports.teacherSchema);
// json for testing api
// {
//   "name": "Alejandro",
//   "email": "
//   "password": "123456",
//   "photo": "https://www.google.com",
//   "officePNumber": "123456789",
//   "personalPNumber": "123456789",
//  "campus": "AL"
// }
//# sourceMappingURL=teacher.schema.js.map