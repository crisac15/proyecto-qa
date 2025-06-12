"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthController = void 0;
const assistant_1 = __importDefault(require("../DAOs/assistant")); // Asegúrate de usar la ruta correcta
const teacher_1 = __importDefault(require("../DAOs/teacher"));
const student_1 = __importDefault(require("../DAOs/student"));
const sendEmail_1 = __importDefault(require("./sendEmail"));
class AuthController {
    // Get all users
    static getUsers() {
        return __awaiter(this, void 0, void 0, function* () {
            const teachers = yield teacher_1.default.getAllTeachers();
            const assistants = yield assistant_1.default.getAllAssistants();
            const students = yield student_1.default.getAllStudentsAdapted();
            const users = [...teachers, ...assistants, ...students];
            return users;
        });
    }
    //Login
    static login(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const email = req.body.email;
                const password = req.body.password;
                console.log(email);
                // Get users
                const users = yield AuthController.getUsers();
                //Find user
                const userFound = users.find((user) => user.getEmail() === email);
                console.log(userFound);
                if (!userFound) {
                    return res.status(500).json({ message: "User Not Found" });
                }
                // Compare password
                const isCorrect = userFound.getPassword() === password;
                if (!isCorrect) {
                    return res.status(500).json({ message: "Password incorrecta" });
                }
                // Send user in response
                res.status(200).json(userFound);
            }
            catch (error) {
                res.status(500).json({ message: "Error login" });
            }
        });
    }
    //Reset Password
    static resetPassword(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { email } = req.body;
            // Get users
            const users = yield AuthController.getUsers();
            //Find user
            const userFound = users.find((user) => user.getEmail() === email);
            console.log(userFound);
            if (!userFound) {
                return res.status(500).json({ message: "User Not Found" });
            }
            // Send email with token
            const emailSent = sendEmail_1.default.getInstance();
            const userToken = userFound.getDbId();
            yield emailSent.sendMail(userFound.getEmail(), "Reset Password", "Use this Token to reset your password: " + userToken);
            res.status(200).json({ message: "Email sent" });
        });
    }
    //Validate Token
    static validateToken(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { email, token } = req.body;
                // Get users
                const users = yield AuthController.getUsers();
                //Find user
                const userFound = users.find((user) => user.getEmail() === email);
                if (!userFound) {
                    return res.status(500).json({ message: "User Not Found" });
                }
                // Check if user ID matches and token is valid
                console.log(userFound.getDbId(), token, userFound.getEmail(), email);
                if (userFound.getDbId() === token && userFound.getEmail() === email) {
                    return res.status(200).json({ message: "Token valid" });
                }
                else {
                    return res.status(500).json({ message: "Token invalid" });
                }
            }
            catch (error) {
                res.status(500).json({ message: "Error validating token" });
            }
        });
    }
    //Change Password
    static changePassword(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { email, password } = req.body;
                console.log(email, password);
                // Get users
                const users = yield AuthController.getUsers();
                //Find user
                const userFound = users.find((user) => user.getEmail() === email);
                if (!userFound) {
                    return res.status(500).json({ message: "User Not Found" });
                }
                // Check userType
                const userType = userFound.getUserType();
                // Change password
                if (userType === "teacher") {
                    yield teacher_1.default.changePassword(userFound.getId(), password);
                }
                else if (userType === "assistant") {
                    yield assistant_1.default.changePassword(userFound.getId(), password);
                }
                else {
                    yield student_1.default.changePassword(userFound.getId(), password);
                }
                res.status(200).json({ message: "Password changed" });
            }
            catch (error) {
                res.status(500).json({ message: "Error changing password" });
            }
        });
    }
}
exports.AuthController = AuthController;
//# sourceMappingURL=authContoller.js.map