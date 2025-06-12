import express from "express";
import { WorkplanController } from "../controllers/workplanController";

const router = express.Router();

router.get("/", WorkplanController.getAllWorkplans);
router.get("/:id", WorkplanController.getWorkplanById);
router.post("/", WorkplanController.createWorkplan);
router.put("/:id", WorkplanController.updateWorkplan);
router.delete("/:id", WorkplanController.deleteWorkplan);

export default router;
