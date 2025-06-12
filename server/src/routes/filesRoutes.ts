import express from "express";
import { uploadFilesController } from "../controllers/uploadFilesController";
import multer from "multer";

const router = express.Router();

// Setting up multer as a middleware to grab photo uploads
const upload = multer({ storage: multer.memoryStorage() });

// Upload Route
router.post("/", upload.single("file"), uploadFilesController.uploadFile);

export default router;
