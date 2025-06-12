// Teacher DAO that communicates with the database
import TeacherSchema from "../schemas/teacher.schema";
import Teacher from "../model/Teacher";
import LogTeamDAO from "../DAOs/logTeam";
import TeacherDTO from "../DTOs/teacher";

/**
 * Class that communicates with the database to perform CRUD operations
 */
export default class TeacherDAO {
  /**
   * Get all the teachers from the database
   * @returns a list with all the teachers
   */
  public static async getAllTeachers(): Promise<Teacher[]> {
    const teachers = await TeacherSchema.find().exec();
    return teachers.map((teacher) => new Teacher(teacher.toObject()));
  }

  /**
   * Get all the members from the database
   * @returns a list with all the members
   */
  public static async getAllMembers() {
    const membersData = await TeacherSchema.find({ isMember: true }).exec();
    return membersData.map((member) => new Teacher(member.toObject()));
  }

  /**
   * Set a teacher as a coordinator
   * @param pCode code of the teacher
   * @param pCoordinator true if the teacher is a coordinator, false otherwise
   */
  public static async setCoordinator(pCode: string, pLeader: boolean) {
    await TeacherSchema.findOneAndUpdate(
      { id: pCode },
      { isLeader: pLeader },
      { new: true }
    ).exec();
  }

  /**
   * Get a teacher by its code
   * @param pCode code of the teacher
   * @returns the teacher with the given code
   */
  public static async getTeacherByCode(pCode: string): Promise<Teacher> {
    const teacher = await TeacherSchema.findOne({ id: pCode }).exec();
    return teacher ? new Teacher(teacher.toObject()) : null;
  }

  /**
   * Create a new teacher in the database
   * @param teacher the teacher to be created
   */
  public static async createTeacher(teacher: Teacher) {
    await TeacherSchema.create(teacher);
  }

  /**
   * Update a teacher in the database
   * @param pCode code of the teacher
   * @param teacher the teacher with the new information
   */
  public static async updateTeacher(
    pCode: string,
    teacher: Teacher,
    agenteCambio: string,
    operation: string
  ) {
    const beforeTeacher = await TeacherSchema.findOne({ id: pCode }).exec();
    const beforeDTO: TeacherDTO = beforeTeacher.toObject();

    // Log the action no se como pasarle el objeto del profesor

    const afterTeacher = await TeacherSchema.findOneAndUpdate(
      { id: pCode },
      teacher,
      {
        new: true,
      }
    ).exec();

    const afterDTO: TeacherDTO = afterTeacher.toObject();

    await LogTeamDAO.createLogTeam(
      agenteCambio,
      beforeDTO,
      afterDTO,
      operation,
      new Date()
    );
  }

  /**
   * Delete a teacher from the database
   * @param pCode code of the teacher
   */
  public static async deleteTeacher(pCode: string) {
    await TeacherSchema.findOneAndDelete({
      id: pCode,
    }).exec();
  }

  /**
   * Get a all the teachers from a campus
   * @param campus campus of the teachers
   * @returns a list with all the teachers from the campus
   */
  public static async getTeachersByCampus(campus: string): Promise<Teacher[]> {
    const teachers = await TeacherSchema.find({
      id: { $regex: `^${campus}-` },
    }).exec();
    return teachers.map((teacher) => new Teacher(teacher.toObject()));
  }

  public static async changePassword(pCode: string, newPassword: string) {
    try {
      // Buscar al profesor por su código
      const teacher = await TeacherSchema.findOne({ id: pCode });

      if (!teacher) {
        throw new Error("Profesor no encontrado");
      }
      // Actualizar la contraseña
      teacher.password = newPassword;
      await teacher.save();

      return true; // Indicar que la contraseña se cambió correctamente
    } catch (error) {
      console.error("Error al cambiar la contraseña del profesor:", error);
      return false; // Indicar que ocurrió un error al cambiar la contraseña
    }
  }
}
