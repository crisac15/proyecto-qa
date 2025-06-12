"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const inboxSchema = new mongoose_1.Schema({
    notifications: { type: [String], required: true },
    readNotifications: { type: [String], required: true },
});
exports.default = inboxSchema;
//# sourceMappingURL=inbox.schema.js.map