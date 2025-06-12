"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Activity_1 = __importDefault(require("./Activity"));
class Workplan {
    // Constructor
    constructor(NameOrDTO, description, activities) {
        if (typeof NameOrDTO === "string") {
            this.name = NameOrDTO;
            this.description = description;
            this.activities = activities;
        }
        else {
            this.id = NameOrDTO._id.toString();
            this.name = NameOrDTO.name;
            this.description = NameOrDTO.description;
            this.activities = NameOrDTO.activities.map((activityDTO) => new Activity_1.default(activityDTO));
        }
    }
    // Getter and Setter for name
    getName() {
        return this.name;
    }
    setName(name) {
        this.name = name;
    }
    // Getter and Setter for description
    getDescription() {
        return this.description;
    }
    setDescription(description) {
        this.description = description;
    }
    // Getter and Setter for activities
    getActivities() {
        return this.activities;
    }
    setActivities(activities) {
        this.activities = activities;
    }
    addActivity(activity) {
        this.activities.push(activity);
    }
    getID() {
        return this.id;
    }
    updateActivity(activityID, activity) {
        const index = this.activities.findIndex((activity) => activity.getID().toString() === activityID);
        this.activities[index] = activity;
    }
}
exports.default = Workplan;
//# sourceMappingURL=Workplan.js.map