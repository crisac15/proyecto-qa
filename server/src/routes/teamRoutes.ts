import express from "express";
import { TeamController } from "../controllers/teamController";

const router = express.Router();

router.get("/members", TeamController.getAllMembers);
router.post("/members/:code", TeamController.addMember);
router.delete("/members/:code", TeamController.removeMember);
router.put("/members/:code/:bool", TeamController.setCoordinator);

export default router;
