"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const workplanController_1 = require("../controllers/workplanController");
const router = express_1.default.Router();
router.get("/", workplanController_1.WorkplanController.getAllWorkplans);
router.get("/:id", workplanController_1.WorkplanController.getWorkplanById);
router.post("/", workplanController_1.WorkplanController.createWorkplan);
router.put("/:id", workplanController_1.WorkplanController.updateWorkplan);
router.delete("/:id", workplanController_1.WorkplanController.deleteWorkplan);
exports.default = router;
//# sourceMappingURL=workplanRoutes.js.map