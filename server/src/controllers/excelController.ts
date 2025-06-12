// Excel Controller that handles the requests related to excel files
// uses the StudentDAO to perform the operations

import { Request, Response } from "express";
import StudentDAO from "../DAOs/student";
import Student from "../model/Student";
import CampusENUM from "../model/campusENUM";
// excel import
import * as xlsx from "xlsx";
import StudentDTO from "../DTOs/student";

/**
 * Class that handles the requests related to excel files
 */

export class ExcelController {
  /**
   * Download an excel file with the students from a campus
   * @param req the request
   * @param res the response
   */
  public static async downloadStudents(
    req: Request,
    res: Response
  ): Promise<void> {
    const campus = req.params.campus;
    let students = await StudentDAO.getStudentsByCampus(campus);

    // Generate the Excel file
    const workbook = xlsx.utils.book_new();
    const worksheet = xlsx.utils.json_to_sheet(students);
    xlsx.utils.book_append_sheet(workbook, worksheet, "Students");

    // Write the Excel file to a buffer
    const buffer = xlsx.write(workbook, { type: "buffer" });

    // Set the headers
    res.setHeader(
      "Content-Type",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    );
    res.setHeader("Content-Disposition", "attachment; filename=students.xlsx");

    // Send the buffer in the response
    res.send(buffer);
  }

  /**
   * Download an excel file with a sheet for each campus
   * @param req the request
   * @param res the response
   */
  public static async downloadAllStudents(
    req: Request,
    res: Response
  ): Promise<void> {
    try {
      // Get the students for each campus
      const campuses = Object.values(CampusENUM);

      let students: Student[][];
      try {
        students = await Promise.all(
          campuses.map(async (campus) => {
            return await StudentDAO.getStudentsByCampus(campus);
          })
        );
      } catch (error) {
        res.status(500).send("Error retrieving students");
      }
      // Create the excel file
      const workbook = xlsx.utils.book_new();
      students.forEach((campusStudents, index) => {
        const worksheet = xlsx.utils.json_to_sheet(campusStudents);
        xlsx.utils.book_append_sheet(workbook, worksheet, campuses[index]);
      });

      // Write the Excel file to a buffer
      const buffer = xlsx.write(workbook, { type: "buffer" });

      // Set the headers
      res.setHeader(
        "Content-Type",
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
      );
      res.setHeader(
        "Content-Disposition",
        "attachment; filename=students.xlsx"
      );

      // Send the buffer in the response
      res.send(buffer);
    } catch (error) {
      res.status(500).send("Error downloading excel file");
    }
  }

  /**
   * Upload an excel file with students using multer middleware
   * @param req the request
   * @param res the response
   */
  public static async uploadStudents(
    req: Request,
    res: Response
  ): Promise<void> {
    try {
      // Get the file
      const campus = req.headers.campus as CampusENUM;
      const file = req.file;
      if (!file) {
        res.status(404).send("No file uploaded");
        return;
      }

      // Read the excel file
      const wb = xlsx.read(file.buffer, { type: "buffer" });
      const ws = wb.Sheets[wb.SheetNames[0]];
      const studentsData: StudentDTO[] = xlsx.utils.sheet_to_json(ws);

      // Create the students
      const students = studentsData.map(
        (studentData) =>
          new Student(
            studentData.carnet,
            studentData.name,
            studentData.email,
            studentData.personalPNumber,
            campus
          )
      );
      console.log(students);
      // Create the students
      await StudentDAO.createStudents(students);
      res.status(200).send("Students created");
      return;
    } catch (error) {
      res.status(500).send("Error uploading file");
      return;
    }
  }

  /**
   * Generate sample excel file with random students for testing purposes
   * @param req the request
   * @param res the response
   */
  public static async generateSampleFile(
    req: Request,
    res: Response
  ): Promise<void> {
    // Generate the random students
    const students: Student[] = [];
    for (let i = 0; i < 10; i++) {
      const student = new Student(
        Math.floor(Math.random() * 1000000),
        `Student${i}`,
        `email${i}`,
        i * 1000000,
        CampusENUM.SJ
      );
      students.push(student);
    }
    // Create the excel file
    const wb = xlsx.utils.book_new();
    const ws = xlsx.utils.json_to_sheet(students);
    // remove column E (campus) from the excel file

    xlsx.utils.book_append_sheet(wb, ws, "Students");
    const excelFileName = `students-sample.xlsx`;
    xlsx.writeFile(wb, excelFileName);

    res.download(excelFileName);
  }
}
