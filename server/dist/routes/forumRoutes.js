"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const forumController_1 = require("../controllers/forumController");
const router = express_1.default.Router({ mergeParams: true });
router.post("/", forumController_1.ForumController.addMessage);
router.post("/:mid", forumController_1.ForumController.addReply);
exports.default = router;
//# sourceMappingURL=forumRoutes.js.map