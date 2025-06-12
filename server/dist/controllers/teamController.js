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
exports.TeamController = void 0;
const teacher_1 = __importDefault(require("../DAOs/teacher"));
class TeamController {
    static getAllMembers(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const members = yield teacher_1.default.getAllMembers();
                res.status(200).json(members);
            }
            catch (error) {
                res.status(500).json({ error: "Error getting members" });
            }
        });
    }
    static addMember(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const code = req.params.code;
                const user = req.body.user;
                const teacher = yield teacher_1.default.getTeacherByCode(code);
                teacher.setIsMember(true);
                yield teacher_1.default.updateTeacher(code, teacher, user, "add to team");
            }
            catch (error) {
                res.status(500).json({ error: "Error adding member" });
            }
        });
    }
    static removeMember(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const code = req.params.code;
                const user = req.body.user;
                console.log(code, user);
                const teacher = yield teacher_1.default.getTeacherByCode(code);
                teacher.setIsLeader(false);
                teacher.setIsMember(false);
                console.log(teacher);
                yield teacher_1.default.updateTeacher(code, teacher, user, "remove from team");
                res.status(200).json({ message: "Member removed" });
            }
            catch (error) {
                res.status(500).json({ error: "Error removing member" });
            }
        });
    }
    static setCoordinator(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const code = req.params.code;
                const isLeader = req.params.bool === "true" ? true : false;
                yield teacher_1.default.setCoordinator(code, isLeader);
                res.status(200).json({ message: "Coordinator updated" });
            }
            catch (error) {
                res.status(500).json({ error: "Error updating coordinator" });
            }
        });
    }
}
exports.TeamController = TeamController;
//# sourceMappingURL=teamController.js.map