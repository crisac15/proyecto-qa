"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const authContoller_1 = require("../controllers/authContoller");
const router = express_1.default.Router();
// Auth routes
//Login
router.post("/login", authContoller_1.AuthController.login); // req: email, password
// reset password
router.post("/resetPassword", authContoller_1.AuthController.resetPassword); // req: email
// validate token
router.post("/validateToken", authContoller_1.AuthController.validateToken); // req: email, token
// change password
router.post("/changePassword", authContoller_1.AuthController.changePassword); // req: email, new password
exports.default = router;
//# sourceMappingURL=authRoutes.js.map