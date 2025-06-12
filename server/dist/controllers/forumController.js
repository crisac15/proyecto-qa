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
exports.ForumController = void 0;
const Message_1 = __importDefault(require("../model/Message"));
const workplan_1 = __importDefault(require("../DAOs/workplan"));
/**
 * Class that handles the requests related to Forum and Messages
 */
class ForumController {
    /**
     * Make a Comment in a Forum
     * @param req the request
     * @param res the response
     */
    static addMessage(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            // Get request params
            const workplanId = req.params.wid;
            const activityId = req.params.aid;
            const messageData = req.body;
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
            // Get the comment
            const forum = activity.getForum();
            // Create message instance
            const message = new Message_1.default(messageData);
            // generate id for the message
            const id = Math.floor(Math.random() * 1000000).toString();
            message.setId(id);
            forum.addMessage(message);
            // Update Workplan
            yield workplan_1.default.updateWorkplan(workplanId, workplan);
            res.status(200).json(message);
            return;
        });
    }
    /**
     * Make a Reply in a Comment
     * @param req the request
     * @param res the response
     */
    static addReply(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            // Get request params
            const workplanId = req.params.wid;
            const activityId = req.params.aid;
            const messageId = req.params.mid;
            const replydata = req.body;
            // Get the workplan
            let workplan;
            workplan = yield workplan_1.default.getWorkplanById(workplanId);
            // Get the activity
            const activity = workplan
                .getActivities()
                .find((activity) => activity.getID() === Number(activityId));
            // Get the forum
            const forum = activity.getForum();
            // Get the Comment
            const message = forum
                .getMessages()
                .find((message) => message.getId() == messageId.toString());
            // Create reply instance
            const reply = new Message_1.default(replydata);
            message.addReply(reply);
            // Update Workplan
            yield workplan_1.default.updateWorkplan(workplanId, workplan);
            res.status(200).json({ message: "Reply added" });
        });
    }
}
exports.ForumController = ForumController;
//# sourceMappingURL=forumController.js.map