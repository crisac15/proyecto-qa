"use strict";
// Workplan Controller that handles the requests related to workplans
// uses the WorkplanDAO to perform the operations
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
exports.WorkplanController = void 0;
const workplan_1 = __importDefault(require("../DAOs/workplan"));
const Workplan_1 = __importDefault(require("../model/Workplan"));
/**
 * Class that handles the requests related to workplans
 */
class WorkplanController {
    /**
     * Get all the workplans
     * @param req the request
     * @param res the response
     */
    static getAllWorkplans(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const workplans = yield workplan_1.default.getAllWorkplans();
                res.status(200).json(workplans);
            }
            catch (error) {
                res.status(500).json({ error: "Failed to get workplans" });
            }
        });
    }
    /**
     * Get a workplan by its id
     * @param req the request
     * @param res the response
     */
    static getWorkplanById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = req.params.id;
            const workplan = yield workplan_1.default.getWorkplanById(id);
            workplan;
            if (workplan) {
                res.status(200).json(workplan);
            }
            else {
                res.status(404).json({ error: "Workplan not found" });
            }
        });
    }
    /**
     * Create a new workplan
     * @param req the request
     * @param res the response
     */
    static createWorkplan(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let date = new Date();
                let year = date.getFullYear();
                let month = date.getMonth();
                let semester = 0;
                if (month >= 1 && month <= 6) {
                    semester = 1;
                }
                else {
                    semester = 2;
                }
                const workplan = new Workplan_1.default("Plan de Trabajo " + semester + " " + year, "Creado el " +
                    date.getDate() +
                    "/" +
                    (date.getMonth() + 1) +
                    "/" +
                    year, []);
                console.log(workplan);
                const newWorkplan = yield workplan_1.default.createWorkplan(workplan);
                res.status(200).json({ id: newWorkplan.getID() });
            }
            catch (error) {
                res.status(500).json({ error: "Failed to create workplan" });
            }
        });
    }
    /**
     * Update a workplan
     * @param req the request
     * @param res the response
     */
    static updateWorkplan(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const id = req.params.id;
                const workplan = req.body;
                yield workplan_1.default.updateWorkplan(id, workplan);
                res.status(200).json({ message: "Workplan updated" });
            }
            catch (error) {
                res.status(500).json({ error: "Failed to update workplan" });
            }
        });
    }
    /**
     * Delete a workplan
     * @param req the request
     * @param res the response
     */
    static deleteWorkplan(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const id = req.params.id;
                yield workplan_1.default.deleteWorkplan(id);
                res.status(200).json({ message: "Workplan deleted" });
            }
            catch (error) {
                res.status(500).json({ error: "Failed to delete workplan" });
            }
        });
    }
}
exports.WorkplanController = WorkplanController;
//# sourceMappingURL=workplanController.js.map