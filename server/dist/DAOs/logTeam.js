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
const logTeam_schema_1 = __importDefault(require("../schemas/logTeam.schema"));
class LogTeamDAO {
    /**
     *
     * @returns a list with all the logTeams
     */
    static getAllLogTeams() {
        return __awaiter(this, void 0, void 0, function* () {
            const logTeams = yield logTeam_schema_1.default.find().exec();
            return logTeams;
        });
    }
    /**
     * Create a logTeam in the database
     * @param pLogTeam the logTeam to create
     */
    static createLogTeam(agenteCambio, antes, despues, accion, date) {
        return __awaiter(this, void 0, void 0, function* () {
            const logTeam = new logTeam_schema_1.default({ agenteCambio, antes, despues, accion, date });
            yield logTeam.save();
        });
    }
}
exports.default = LogTeamDAO;
//# sourceMappingURL=logTeam.js.map