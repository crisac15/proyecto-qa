"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const message_schema_1 = __importDefault(require("./message.schema"));
// Define the schema for the Forum in activities
const forumSchema = new mongoose_1.Schema({
    messages: {
        // List of messages
        type: [message_schema_1.default],
    },
});
exports.default = forumSchema;
//# sourceMappingURL=forum.schema.js.map