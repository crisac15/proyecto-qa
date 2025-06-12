import { Request, Response } from "express";
import Message from "../model/Message";
import MessageDTO from "../DTOs/message";
import WorkplanDAO from "../DAOs/workplan";

/**
 * Class that handles the requests related to Forum and Messages
 */
export class ForumController {
  /**
   * Make a Comment in a Forum
   * @param req the request
   * @param res the response
   */
  public static async addMessage(req: Request, res: Response): Promise<void> {
    // Get request params
    const workplanId = req.params.wid;
    const activityId = req.params.aid;
    const messageData: MessageDTO = req.body;

    // Get the workplan
    let workplan;
    try {
      workplan = await WorkplanDAO.getWorkplanById(workplanId);
    } catch (error) {
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

    const message = new Message(messageData);

    // generate id for the message
    const id = Math.floor(Math.random() * 1000000).toString();
    message.setId(id);

    forum.addMessage(message);

    // Update Workplan
    await WorkplanDAO.updateWorkplan(workplanId, workplan);

    res.status(200).json(message);

    return;
  }
  /**
   * Make a Reply in a Comment
   * @param req the request
   * @param res the response
   */
  public static async addReply(req: Request, res: Response): Promise<void> {
    // Get request params
    const workplanId = req.params.wid;
    const activityId = req.params.aid;
    const messageId = req.params.mid;
    const replydata: MessageDTO = req.body;

    // Get the workplan
    let workplan;

    workplan = await WorkplanDAO.getWorkplanById(workplanId);

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
    const reply = new Message(replydata);
    message.addReply(reply);

    // Update Workplan
    await WorkplanDAO.updateWorkplan(workplanId, workplan);

    res.status(200).json({ message: "Reply added" });
  }
}
