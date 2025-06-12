import express, { Request, Response } from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import teacherRoutes from "./routes/teacherRoutes";
import excelRoutes from "./routes/excelRoutes";
import teamRoutes from "./routes/teamRoutes";
import workplanRoutes from "./routes/workplanRoutes";
import studentRoutes from "./routes/studentRoutes";
import authRoutes from "./routes/authRoutes";
import activityRoutes from "./routes/activityRoutes";
import forumRoutes from "./routes/forumRoutes";
import notificationRoutes from "./routes/notificationRoutes";
import filesRoutes from "./routes/filesRoutes";
import assistantRoutes from "./routes/assistantRoutes";
import { initializeApp } from "firebase/app";
import config from "../src/config/firebase.config";

dotenv.config();

const app = express();

app.use(express.json());

// Default middlewares
app.use(cors());

app.use(express.static("public"));

// Routes
app.use("/api/teachers", teacherRoutes);
app.use("/api/excel", excelRoutes);
app.use("/api/teams", teamRoutes);
app.use("/api/students", studentRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/workplans", workplanRoutes);
app.use("/api/workplans/:wid/activities", activityRoutes);
app.use("/api/workplans/:wid/activities/:aid/forum", forumRoutes);
app.use("/api/notifications", notificationRoutes);
app.use("/api/files", filesRoutes);
app.use("/api/assistants", assistantRoutes);

//Initialize a firebase application

initializeApp(config.firebaseConfig);

// Connect to MongoDB

mongoose.Promise = Promise;
mongoose.connect(process.env.MONGO_CONNECTION_STRING);
mongoose.connection.on("error", (err: Error) => {
  console.error(err);
  process.exit();
});
mongoose.connection.once("open", () => {
  console.log("Conexión exitosa a la base de datos.");
});

const port = process.env.PORT || 1234;

app.get("/", (_req: Request, res: Response) => {
  return res.send("Express Typescript on Vercel");
});

app.get("/ping", (_req: Request, res: Response) => {
  return res.send("pong 🏓");
});

app.listen(port, () => {
  return console.log(`Server is listening on ${port}`);
});

export default app;
