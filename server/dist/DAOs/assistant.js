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
// Teacher DAO that communicates with the database
const assistant_schema_1 = __importDefault(require("../schemas/assistant.schema"));
const Assistant_1 = __importDefault(require("../model/Assistant"));
/**
 * Class that communicates with the database to perform CRUD operations
 */
class AssistantDAO {
    /**
     * Get all the assistants from the database
     * @returns a list with all the assistants
     */
    static getAllAssistants() {
        return __awaiter(this, void 0, void 0, function* () {
            const assistants = yield assistant_schema_1.default.find().exec();
            return assistants.map((assistant) => new Assistant_1.default(assistant.toObject()));
        });
    }
    /**
     * Get a assistant by its code
     * @param pCode code of the assistant
     * @returns the assistant with the given code
     */
    static getAssistantByCode(pCode) {
        return __awaiter(this, void 0, void 0, function* () {
            const assistant = yield assistant_schema_1.default.findOne({ id: pCode }).exec();
            return assistant ? new Assistant_1.default(assistant.toObject()) : null;
        });
    }
    /**
     * Update a assistant in the database
     * @param pCode code of the assistant
     * @param assistant the assistant with the new information
     */
    static updateAssistant(pCode, assistant) {
        return __awaiter(this, void 0, void 0, function* () {
            yield assistant_schema_1.default.findOneAndUpdate({ id: pCode }, assistant, {
                new: true,
            }).exec();
        });
    }
    static createAsistant(name, email, password, campus) {
        return __awaiter(this, void 0, void 0, function* () {
            const asistant = new assistant_schema_1.default({ name, email, password, campus });
            yield asistant.save();
        });
    }
    static changePassword(pCode, newPassword) {
        return __awaiter(this, void 0, void 0, function* () {
            yield assistant_schema_1.default.findOneAndUpdate({ id: pCode }, { password: newPassword }, {
                new: true,
            }).exec();
        });
    }
}
exports.default = AssistantDAO;
//# sourceMappingURL=assistant.js.map