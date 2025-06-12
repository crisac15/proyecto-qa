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
// Workplan DAO that communicates with the database
const workplan_schema_1 = __importDefault(require("../schemas/workplan.schema"));
const Workplan_1 = __importDefault(require("../model/Workplan"));
class WorkplanDAO {
    /**
     * Create a new workplan in the database
     * @param pWorkplan the workplan to be created
     * @returns the created workplan
     */
    static createWorkplan(workplan) {
        return __awaiter(this, void 0, void 0, function* () {
            const workplanData = new workplan_schema_1.default(workplan);
            yield workplanData.save();
            return new Workplan_1.default(workplanData.toObject());
        });
    }
    /**
     * Get all the workplans from the database
     * @returns a list with all the workplans
     */
    static getAllWorkplans() {
        return __awaiter(this, void 0, void 0, function* () {
            const workplansData = yield workplan_schema_1.default.find().exec();
            return workplansData.map((workplan) => new Workplan_1.default(workplan.toObject()));
        });
    }
    /**
     * Get a workplan by its id
     * @param _id id of the workplan
     * @returns the workplan with the given code
     */
    static getWorkplanById(_id) {
        return __awaiter(this, void 0, void 0, function* () {
            const workplanData = yield workplan_schema_1.default.findOne({ _id: _id }).exec();
            workplanData;
            return workplanData ? new Workplan_1.default(workplanData.toObject()) : null;
        });
    }
    /**
     * Update a workplan in the database
     * @param _id id of the workplan
     * @param pWorkplan the workplan with the new information
     * @returns the updated workplan
     */
    static updateWorkplan(_id, pWorkplan) {
        return __awaiter(this, void 0, void 0, function* () {
            yield workplan_schema_1.default.findOneAndUpdate({ _id: _id }, pWorkplan, {
                new: true,
            });
        });
    }
    /**
     * Delete a workplan from the database
     * @param _id id of the workplan
     * @returns the deleted workplan
     */
    static deleteWorkplan(_id) {
        return __awaiter(this, void 0, void 0, function* () {
            yield workplan_schema_1.default.findOneAndDelete({
                _id: _id,
            });
        });
    }
}
exports.default = WorkplanDAO;
//# sourceMappingURL=workplan.js.map