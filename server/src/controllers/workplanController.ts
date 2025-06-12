// Workplan Controller that handles the requests related to workplans
// uses the WorkplanDAO to perform the operations

import { Request, Response } from "express";
import WorkplanDAO from "../DAOs/workplan";
import Workplan from "../model/Workplan";

/**
 * Class that handles the requests related to workplans
 */
export class WorkplanController {
  /**
   * Get all the workplans
   * @param req the request
   * @param res the response
   */
  public static async getAllWorkplans(
    req: Request,
    res: Response
  ): Promise<void> {
    try {
      const workplans = await WorkplanDAO.getAllWorkplans();

      res.status(200).json(workplans);
    } catch (error) {
      res.status(500).json({ error: "Failed to get workplans" });
    }
  }

  /**
   * Get a workplan by its id
   * @param req the request
   * @param res the response
   */
  public static async getWorkplanById(
    req: Request,
    res: Response
  ): Promise<void> {
    const id = req.params.id;
    const workplan = await WorkplanDAO.getWorkplanById(id);
    workplan;
    if (workplan) {
      res.status(200).json(workplan);
    } else {
      res.status(404).json({ error: "Workplan not found" });
    }
  }

  /**
   * Create a new workplan
   * @param req the request
   * @param res the response
   */
  public static async createWorkplan(
    req: Request,
    res: Response
  ): Promise<void> {
    try {
      let date: Date = new Date();
      let year = date.getFullYear();
      let month = date.getMonth();
      let semester = 0;
      if (month >= 1 && month <= 6) {
        semester = 1;
      } else {
        semester = 2;
      }

      const workplan = new Workplan(
        "Plan de Trabajo " + semester + " " + year,
        "Creado el " +
          date.getDate() +
          "/" +
          (date.getMonth() + 1) +
          "/" +
          year,
        []
      );

      console.log(workplan);
      const newWorkplan = await WorkplanDAO.createWorkplan(workplan);
      res.status(200).json({ id: newWorkplan.getID() });
    } catch (error) {
      res.status(500).json({ error: "Failed to create workplan" });
    }
  }

  /**
   * Update a workplan
   * @param req the request
   * @param res the response
   */
  public static async updateWorkplan(
    req: Request,
    res: Response
  ): Promise<void> {
    try {
      const id = req.params.id;
      const workplan: Workplan = req.body;
      await WorkplanDAO.updateWorkplan(id, workplan);
      res.status(200).json({ message: "Workplan updated" });
    } catch (error) {
      res.status(500).json({ error: "Failed to update workplan" });
    }
  }

  /**
   * Delete a workplan
   * @param req the request
   * @param res the response
   */
  public static async deleteWorkplan(
    req: Request,
    res: Response
  ): Promise<void> {
    try {
      const id = req.params.id;

      await WorkplanDAO.deleteWorkplan(id);
      res.status(200).json({ message: "Workplan deleted" });
    } catch (error) {
      res.status(500).json({ error: "Failed to delete workplan" });
    }
  }
}
