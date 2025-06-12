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
exports.ActivityController = void 0;
const Activity_1 = __importDefault(require("../model/Activity"));
const workplan_1 = __importDefault(require("../DAOs/workplan"));
/**
 * Class that handles the requests related to activities
 */
class ActivityController {
    /**
     * Get all the activities
     * @param req the request
     * @param res the response
     */
    static getAllActivities(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const workplanId = req.params.wid;
                // Get the workplan
                let workplan;
                try {
                    workplan = yield workplan_1.default.getWorkplanById(workplanId);
                }
                catch (error) {
                    res.status(500).json({ error: "Error retrieving workplan" });
                    return;
                }
                res.status(200).json(workplan.getActivities());
            }
            catch (error) {
                res.status(500).json({ error: "Error retrieving activities" });
            }
        });
    }
    /**
     * Get an activity by its id
     * @param req the request
     * @param res the response
     */
    static getActivityById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // Get the workplan id and the activity id from the request
                const workplanId = req.params.wid;
                const activityId = req.params.aid;
                // Get the workplan
                let workplan;
                try {
                    workplan = yield workplan_1.default.getWorkplanById(workplanId);
                }
                catch (error) {
                    res.status(500).json({ error: "Error retrieving workplan" });
                    return;
                }
                // Get the activity
                const activity = workplan
                    .getActivities()
                    .find((activity) => activity.getID() === Number(activityId));
                if (!activity) {
                    res.status(404).json({ error: "Activity not found" });
                    return;
                }
                res.status(200).json(activity);
            }
            catch (error) {
                res.status(500).json({ error: "Error retrieving activity" });
            }
        });
    }
    /**
     * Create a new activity
     * @param req the request
     * @param res the response
     */
    static createActivity(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const activityDTO = req.body;
                const workplanId = req.params.wid;
                console.log(activityDTO);
                // Create the activity
                let activity;
                try {
                    activity = new Activity_1.default(activityDTO);
                }
                catch (error) {
                    res.status(500).json({ error: "Error instantiating activity" });
                    return;
                }
                activity.setID(Math.floor(Math.random() * 1000000));
                // Get the workplan
                let workplan;
                try {
                    workplan = yield workplan_1.default.getWorkplanById(workplanId);
                }
                catch (error) {
                    res.status(500).json({ error: "Error retrieving workplan" });
                    return;
                }
                workplan.addActivity(activity);
                // Update the workplan
                try {
                    yield workplan_1.default.updateWorkplan(workplanId, workplan);
                }
                catch (error) {
                    res.status(500).json({ error: "Error updating workplan" });
                    return;
                }
                res.status(200).json({ message: "Activity created successfully" });
            }
            catch (error) {
                res.status(500).json({ error: "Error creating activity" });
            }
        });
    }
    static updateActivity(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const activityDTO = req.body.activity;
                const user = req.body.user;
                const workplanId = req.params.wid;
                const activityID = req.params.aid;
                // Create the activity
                let activity;
                try {
                    activity = new Activity_1.default(activityDTO);
                }
                catch (error) {
                    res.status(500).json({ error: "Error instantiating activity" });
                    return;
                }
                // Get the workplan
                let workplan;
                try {
                    workplan = yield workplan_1.default.getWorkplanById(workplanId);
                }
                catch (error) {
                    res.status(500).json({ error: "Error retrieving workplan" });
                    return;
                }
                // Update the workplan
                workplan.updateActivity(activityID, activity);
                try {
                    yield workplan_1.default.updateWorkplan(workplanId, workplan);
                }
                catch (error) {
                    res.status(500).json({ error: "Error updating workplan" });
                    return;
                }
                console.log(activity.getStatus());
                if (activity.getStatus() === "Notificada") {
                    activity.sendReminder(user);
                    console.log("Notified");
                }
                if (activity.getStatus() === "Cancelada") {
                    activity.sendCancellation(user);
                    console.log("Cancelled");
                }
                res.status(200).json({ message: "Activity updated successfully" });
            }
            catch (error) {
                res.status(500).json({ error: "Error updating activity" });
            }
        });
    }
}
exports.ActivityController = ActivityController;
//# sourceMappingURL=activityController.js.map