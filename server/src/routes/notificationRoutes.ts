import express from "express";
import { NotificationController } from "../controllers/notificationController";
const router = express.Router();

router.post("/", NotificationController.verifyNotification);

export default router;
