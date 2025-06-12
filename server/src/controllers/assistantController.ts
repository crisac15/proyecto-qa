import { Request, Response } from "express";
import AssistantDTO from "../DTOs/assistant";
import AssistantDAO from "../DAOs/assistant";


export class AssistantController {

  public static async createAssistant(
    req: Request,
    res: Response
  ): Promise<void> {
    const assistant: AssistantDTO = req.body;
    console.log(assistant);
    await AssistantDAO.createAsistant(assistant.email, assistant.password, assistant.name, assistant.campus);
    res.status(201).json({ message: "Assistant created" });
  }


}