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
exports.teacherSchemaLog = void 0;
const mongoose_1 = __importStar(require("mongoose"));
exports.teacherSchemaLog = new mongoose_1.Schema({
    id: {
        // Code of the teacher (e.g. AL-01), includes the campus code
        type: String,
        required: true,
        unique: false,
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
// Define the schema for the messages and replies in forums
const logTeam = new mongoose_1.Schema({
    agenteCambio: {
        type: String,
        required: true,
    },
    antes: {
        type: exports.teacherSchemaLog,
        required: false,
        unique: false,
    },
    despues: {
        type: exports.teacherSchemaLog,
        required: false,
        unique: false,
    },
    accion: {
        type: String,
        required: true,
    },
    date: {
        type: Date,
        required: true,
    },
});
exports.default = mongoose_1.default.model("LogTeam", logTeam);
//# sourceMappingURL=logTeam.schema.js.map