import express from "express";
import { ExcelController } from "../controllers/excelController";
import multer from "multer";

const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() });

// Excel routes
router.get("/download/:campus", ExcelController.downloadStudents);

router.get("/download/", ExcelController.downloadAllStudents);

router.post("/upload", upload.single("file"), ExcelController.uploadStudents);

router.get("/sample/", ExcelController.generateSampleFile);

export default router;
