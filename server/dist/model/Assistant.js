"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const User_1 = __importDefault(require("./User"));
class Assistant extends User_1.default {
    // Constructor, include the posibility to use TeacherDTO instead of all the parameters
    constructor(IDorDTO, name, email, password, campus) {
        if (typeof IDorDTO === "string") {
            super(name, email, password, campus, "assistant", false, "", IDorDTO);
        }
        else {
            super(IDorDTO.name, IDorDTO.email, IDorDTO.password, IDorDTO.campus, "assistant", false, "", IDorDTO.id, IDorDTO._id.toString());
        }
    }
}
exports.default = Assistant;
//# sourceMappingURL=Assistant.js.map