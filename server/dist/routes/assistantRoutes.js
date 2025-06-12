"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const assistantController_1 = require("../controllers/assistantController");
const router = express_1.default.Router();
// Asistant routes
router.post("/", assistantController_1.AssistantController.createAssistant);
exports.default = router;
//# sourceMappingURL=assistantRoutes.js.map