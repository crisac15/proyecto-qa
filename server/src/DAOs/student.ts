// Student DAO that communicates with the database

import StudentSchema from "../schemas/student.schema";
import Student from "../model/Student";
import StudentAdapter from "../model/StudentAdapter";
import NotificationInbox from "../model/NotificationInbox";
import InboxDTO from "../DTOs/inbox";

export default class StudentDAO {
  /**
   * Create a new student in the database
   * @param pStudentDTO the student to be created

   */
  public static async createStudent(student: Student) {
    await StudentSchema.create(student);
  }

  /**
   * Create multiple students in the database
   * @param students the students to be created
   */
  public static async createStudents(students: Student[]) {
    await StudentSchema.insertMany(students);
  }

  /**
   * Get a student from the database
   * @param carnet carnet of the student
   * @returns the student with the given carnet
   */
  public static async getStudentByCarnet(
    carnet: string
  ): Promise<StudentAdapter> {
    const studentData = await StudentSchema.findOne({ carnet: carnet });
    return new StudentAdapter(studentData.toObject());
  }

  /**
   * Get all the students from the database
   * @returns the student with the given carnet
   */
  public static async getAllStudents(): Promise<Student[]> {
    const studentData = await StudentSchema.find().exec();
    return studentData.map(
      (studentData) => new Student(studentData.toObject())
    );
  }

  public static async getAllStudentsAdapted(): Promise<StudentAdapter[]> {
    const studentData = await StudentSchema.find().exec();
    return studentData.map(
      (studentData) => new StudentAdapter(studentData.toObject())
    );
  }

  /**
   * Get all the students for a given campus
   * @param campus campus of the students
   * @returns a list with all the students
   */
  public static async getStudentsByCampus(campus: string): Promise<Student[]> {
    const studentsData = await StudentSchema.find({ campus: campus });
    return studentsData.map(
      (studentData) => new Student(studentData.toObject())
    );
  }

  /**
   * Update a student in the database
   * @param carnet carnet of the student
   * @param student the student with the new information
   */
  public static async updateStudent(carnet: string, student: Student) {
    await StudentSchema.findOneAndUpdate({ carnet: carnet }, student, {
      new: true,
    });
  }

  public static async updateStudentPhoto(carnet: string, photo: string) {
    await StudentSchema.findOneAndUpdate(
      { carnet: carnet },
      { photo: photo },
      {
        new: true,
      }
    );
  }

  public static async updateStudentInbox(
    carnet: string,
    notificationInbox: NotificationInbox
  ) {
    await StudentSchema.findOneAndUpdate(
      { carnet: carnet },
      { inbox: notificationInbox },
      {
        new: true,
      }
    );
  }

  public static async getStudentInbox(
    carnet: string
  ): Promise<NotificationInbox> {
    const studentData = await StudentSchema.findOne({ carnet: carnet });
    return new NotificationInbox(studentData.toObject().inbox as InboxDTO);
  }

  /**
   * Delete a student from the database
   * @param carnet carnet of the student
   * @returns the deleted student
   */
  public static async deleteStudent(carnet: string) {
    await StudentSchema.findOneAndDelete({
      carnet: carnet,
    });
  }

  public static async changePassword(carnet: string, newPassword: string) {
    await StudentSchema.findOneAndUpdate(
      { carnet: carnet },
      { password: newPassword },
      {
        new: true,
      }
    ).exec();
  }
}
