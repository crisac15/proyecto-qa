// Teacher DAO that communicates with the database
import AssistantSchema from "../schemas/assistant.schema";
import Assistant from "../model/Assistant";

/**
 * Class that communicates with the database to perform CRUD operations
 */
export default class AssistantDAO {
  /**
   * Get all the assistants from the database
   * @returns a list with all the assistants
   */
  public static async getAllAssistants(): Promise<Assistant[]> {
    const assistants = await AssistantSchema.find().exec();
    return assistants.map((assistant) => new Assistant(assistant.toObject()));
  }

  /**
   * Get a assistant by its code
   * @param pCode code of the assistant
   * @returns the assistant with the given code
   */
  public static async getAssistantByCode(pCode: string): Promise<Assistant> {
    const assistant = await AssistantSchema.findOne({ id: pCode }).exec();
    return assistant ? new Assistant(assistant.toObject()) : null;
  }

  /**
   * Update a assistant in the database
   * @param pCode code of the assistant
   * @param assistant the assistant with the new information
   */
  public static async updateAssistant(pCode: string, assistant: Assistant) {
    await AssistantSchema.findOneAndUpdate({ id: pCode }, assistant, {
      new: true,
    }).exec();
  }

  public static async createAsistant(
    name: string,
    email: string,
    password: string,
    campus: string
  ) {
    const asistant = new AssistantSchema({ name, email, password, campus });
    await asistant.save();
  }

  public static async changePassword(pCode: string, newPassword: string) {
    await AssistantSchema.findOneAndUpdate(
      { id: pCode },
      { password: newPassword },
      {
        new: true,
      }
    ).exec();
  }
}
