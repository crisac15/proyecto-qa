"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const excelController_1 = require("../controllers/excelController");
const multer_1 = __importDefault(require("multer"));
const router = express_1.default.Router();
const upload = (0, multer_1.default)({ storage: multer_1.default.memoryStorage() });
// Excel routes
router.get("/download/:campus", excelController_1.ExcelController.downloadStudents);
router.get("/download/", excelController_1.ExcelController.downloadAllStudents);
router.post("/upload", upload.single("file"), excelController_1.ExcelController.uploadStudents);
router.get("/sample/", excelController_1.ExcelController.generateSampleFile);
exports.default = router;
//# sourceMappingURL=excelRoutes.js.map