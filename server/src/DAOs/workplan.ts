// Workplan DAO that communicates with the database
import WorkplanSchema from "../schemas/workplan.schema";
import Workplan from "../model/Workplan";

export default class WorkplanDAO {
  /**
   * Create a new workplan in the database
   * @param pWorkplan the workplan to be created
   * @returns the created workplan
   */
  public static async createWorkplan(workplan: Workplan): Promise<Workplan> {
    const workplanData = new WorkplanSchema(workplan);
    await workplanData.save();
    return new Workplan(workplanData.toObject());
  }

  /**
   * Get all the workplans from the database
   * @returns a list with all the workplans
   */
  public static async getAllWorkplans(): Promise<Workplan[]> {
    const workplansData = await WorkplanSchema.find().exec();
    return workplansData.map((workplan) => new Workplan(workplan.toObject()));
  }

  /**
   * Get a workplan by its id
   * @param _id id of the workplan
   * @returns the workplan with the given code
   */
  public static async getWorkplanById(_id: string): Promise<Workplan> {
    const workplanData = await WorkplanSchema.findOne({ _id: _id }).exec();
    workplanData;
    return workplanData ? new Workplan(workplanData.toObject()) : null;
  }

  /**
   * Update a workplan in the database
   * @param _id id of the workplan
   * @param pWorkplan the workplan with the new information
   * @returns the updated workplan
   */
  public static async updateWorkplan(_id: string, pWorkplan: Workplan) {
    await WorkplanSchema.findOneAndUpdate({ _id: _id }, pWorkplan, {
      new: true,
    });
  }

  /**
   * Delete a workplan from the database
   * @param _id id of the workplan
   * @returns the deleted workplan
   */
  public static async deleteWorkplan(_id: string) {
    await WorkplanSchema.findOneAndDelete({
      _id: _id,
    });
  }
}
