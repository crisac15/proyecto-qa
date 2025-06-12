import express from "express";
import { ActivityController } from "../controllers/activityController";

const router = express.Router({ mergeParams: true });

router.get("/", ActivityController.getAllActivities);
router.get("/:aid", ActivityController.getActivityById);
router.post("/", ActivityController.createActivity);
router.put("/:aid", ActivityController.updateActivity);

export default router;
