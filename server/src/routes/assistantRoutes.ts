import express from "express";
import { AssistantController } from "../controllers/assistantController";

const router = express.Router();
// Asistant routes
router.post("/", AssistantController.createAssistant);

export default router;
