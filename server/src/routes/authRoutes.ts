import express from "express";
import { AuthController } from "../controllers/authContoller";

const router = express.Router();

// Auth routes
//Login
router.post("/login", AuthController.login); // req: email, password

// reset password
router.post("/resetPassword", AuthController.resetPassword); // req: email

// validate token
router.post("/validateToken", AuthController.validateToken); // req: email, token

// change password
router.post("/changePassword", AuthController.changePassword); // req: email, new password

export default router;
