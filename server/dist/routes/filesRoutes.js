"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const uploadFilesController_1 = require("../controllers/uploadFilesController");
const multer_1 = __importDefault(require("multer"));
const router = express_1.default.Router();
// Setting up multer as a middleware to grab photo uploads
const upload = (0, multer_1.default)({ storage: multer_1.default.memoryStorage() });
// Upload Route
router.post("/", upload.single("file"), uploadFilesController_1.uploadFilesController.uploadFile);
exports.default = router;
//# sourceMappingURL=filesRoutes.js.map