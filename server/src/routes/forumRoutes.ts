import express from "express";
import { ForumController } from "../controllers/forumController";

const router = express.Router({ mergeParams: true });

router.post("/", ForumController.addMessage);
router.post("/:mid", ForumController.addReply);

export default router;
