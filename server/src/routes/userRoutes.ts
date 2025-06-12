const express = require("express");
const router = express.Router();
import { getUsers } from "../schemas/userSchema";
import { Request, Response } from "express"; // Import the Request and Response types

router.get("/users", async (req: Request, res: Response) => {
  try {
    const users = await getUsers();
    res.json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error retrieving users" });
  }
});

export default router;
