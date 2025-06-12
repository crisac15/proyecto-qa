import e, { Request, Response } from "express";
import Activity from "../model/Activity";
import ActivityDTO from "../DTOs/activity";
import WorkplanDAO from "../DAOs/workplan";
import Email from "./sendEmail";

/**
 * Class that handles the requests related to activities
 */
export class ActivityController {
  /**
   * Get all the activities
   * @param req the request
   * @param res the response
   */
  public static async getAllActivities(
    req: Request,
    res: Response
  ): Promise<void> {
    try {
      const workplanId = req.params.wid;

      // Get the workplan
      let workplan;
      try {
        workplan = await WorkplanDAO.getWorkplanById(workplanId);
      } catch (error) {
        res.status(500).json({ error: "Error retrieving workplan" });
        return;
      }

      res.status(200).json(workplan.getActivities());
    } catch (error) {
      res.status(500).json({ error: "Error retrieving activities" });
    }
  }

  /**
   * Get an activity by its id
   * @param req the request
   * @param res the response
   */
  public static async getActivityById(
    req: Request,
    res: Response
  ): Promise<void> {
    try {
      // Get the workplan id and the activity id from the request
      const workplanId = req.params.wid;
      const activityId = req.params.aid;

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

      res.status(200).json(activity);
    } catch (error) {
      res.status(500).json({ error: "Error retrieving activity" });
    }
  }

  /**
   * Create a new activity
   * @param req the request
   * @param res the response
   */
  public static async createActivity(
    req: Request,
    res: Response
  ): Promise<void> {
    try {
      const activityDTO: ActivityDTO = req.body;
      const workplanId = req.params.wid;
      console.log(activityDTO);

      // Create the activity
      let activity;
      try {
        activity = new Activity(activityDTO);
      } catch (error) {
        res.status(500).json({ error: "Error instantiating activity" });
        return;
      }

      activity.setID(Math.floor(Math.random() * 1000000));

      // Get the workplan
      let workplan;
      try {
        workplan = await WorkplanDAO.getWorkplanById(workplanId);
      } catch (error) {
        res.status(500).json({ error: "Error retrieving workplan" });
        return;
      }

      workplan.addActivity(activity);

      // Update the workplan
      try {
        await WorkplanDAO.updateWorkplan(workplanId, workplan);
      } catch (error) {
        res.status(500).json({ error: "Error updating workplan" });
        return;
      }

      res.status(200).json({ message: "Activity created successfully" });
    } catch (error) {
      res.status(500).json({ error: "Error creating activity" });
    }
  }

  public static async updateActivity(
    req: Request,
    res: Response
  ): Promise<void> {
    try {
      const activityDTO: ActivityDTO = req.body.activity;
      const user = req.body.user;
      const workplanId = req.params.wid;
      const activityID = req.params.aid;
      // Create the activity
      let activity;
      try {
        activity = new Activity(activityDTO);
      } catch (error) {
        res.status(500).json({ error: "Error instantiating activity" });
        return;
      }

      // Get the workplan
      let workplan;
      try {
        workplan = await WorkplanDAO.getWorkplanById(workplanId);
      } catch (error) {
        res.status(500).json({ error: "Error retrieving workplan" });
        return;
      }

      // Update the workplan
      workplan.updateActivity(activityID, activity);

      try {
        await WorkplanDAO.updateWorkplan(workplanId, workplan);
      } catch (error) {
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
    } catch (error) {
      res.status(500).json({ error: "Error updating activity" });
    }
  }
}
