"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const activityController_1 = require("../controllers/activityController");
const router = express_1.default.Router({ mergeParams: true });
router.get("/", activityController_1.ActivityController.getAllActivities);
router.get("/:aid", activityController_1.ActivityController.getActivityById);
router.post("/", activityController_1.ActivityController.createActivity);
router.put("/:aid", activityController_1.ActivityController.updateActivity);
exports.default = router;
//# sourceMappingURL=activityRoutes.js.map