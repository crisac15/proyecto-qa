import logTeamSchema from "../schemas/logTeam.schema";
import TeacherDTO from "../DTOs/teacher";

export default class LogTeamDAO {
  /**
   * 
   * @returns a list with all the logTeams
   */
  public static async getAllLogTeams() {
    const logTeams = await logTeamSchema.find().exec();
    return logTeams;
  }

  /**
   * Create a logTeam in the database
   * @param pLogTeam the logTeam to create
   */

  public static async createLogTeam(agenteCambio: string, antes: TeacherDTO, despues: TeacherDTO, accion: string, date: Date) {
    const logTeam = new logTeamSchema({ agenteCambio, antes, despues, accion, date });
    await logTeam.save();
  }
}