"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const teamController_1 = require("../controllers/teamController");
const router = express_1.default.Router();
router.get("/members", teamController_1.TeamController.getAllMembers);
router.post("/members/:code", teamController_1.TeamController.addMember);
router.delete("/members/:code", teamController_1.TeamController.removeMember);
router.put("/members/:code/:bool", teamController_1.TeamController.setCoordinator);
exports.default = router;
//# sourceMappingURL=teamRoutes.js.map