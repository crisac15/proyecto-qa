"use strict";
// Excel Controller that handles the requests related to excel files
// uses the StudentDAO to perform the operations
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExcelController = void 0;
const student_1 = __importDefault(require("../DAOs/student"));
const Student_1 = __importDefault(require("../model/Student"));
const campusENUM_1 = __importDefault(require("../model/campusENUM"));
// excel import
const xlsx = __importStar(require("xlsx"));
/**
 * Class that handles the requests related to excel files
 */
class ExcelController {
    /**
     * Download an excel file with the students from a campus
     * @param req the request
     * @param res the response
     */
    static downloadStudents(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const campus = req.params.campus;
            let students = yield student_1.default.getStudentsByCampus(campus);
            // Generate the Excel file
            const workbook = xlsx.utils.book_new();
            const worksheet = xlsx.utils.json_to_sheet(students);
            xlsx.utils.book_append_sheet(workbook, worksheet, "Students");
            // Write the Excel file to a buffer
            const buffer = xlsx.write(workbook, { type: "buffer" });
            // Set the headers
            res.setHeader("Content-Type", "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet");
            res.setHeader("Content-Disposition", "attachment; filename=students.xlsx");
            // Send the buffer in the response
            res.send(buffer);
        });
    }
    /**
     * Download an excel file with a sheet for each campus
     * @param req the request
     * @param res the response
     */
    static downloadAllStudents(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // Get the students for each campus
                const campuses = Object.values(campusENUM_1.default);
                let students;
                try {
                    students = yield Promise.all(campuses.map((campus) => __awaiter(this, void 0, void 0, function* () {
                        return yield student_1.default.getStudentsByCampus(campus);
                    })));
                }
                catch (error) {
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
                res.setHeader("Content-Type", "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet");
                res.setHeader("Content-Disposition", "attachment; filename=students.xlsx");
                // Send the buffer in the response
                res.send(buffer);
            }
            catch (error) {
                res.status(500).send("Error downloading excel file");
            }
        });
    }
    /**
     * Upload an excel file with students using multer middleware
     * @param req the request
     * @param res the response
     */
    static uploadStudents(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // Get the file
                const campus = req.headers.campus;
                const file = req.file;
                if (!file) {
                    res.status(404).send("No file uploaded");
                    return;
                }
                // Read the excel file
                const wb = xlsx.read(file.buffer, { type: "buffer" });
                const ws = wb.Sheets[wb.SheetNames[0]];
                const studentsData = xlsx.utils.sheet_to_json(ws);
                // Create the students
                const students = studentsData.map((studentData) => new Student_1.default(studentData.carnet, studentData.name, studentData.email, studentData.personalPNumber, campus));
                console.log(students);
                // Create the students
                yield student_1.default.createStudents(students);
                res.status(200).send("Students created");
                return;
            }
            catch (error) {
                res.status(500).send("Error uploading file");
                return;
            }
        });
    }
    /**
     * Generate sample excel file with random students for testing purposes
     * @param req the request
     * @param res the response
     */
    static generateSampleFile(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            // Generate the random students
            const students = [];
            for (let i = 0; i < 10; i++) {
                const student = new Student_1.default(Math.floor(Math.random() * 1000000), `Student${i}`, `email${i}`, i * 1000000, campusENUM_1.default.SJ);
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
        });
    }
}
exports.ExcelController = ExcelController;
//# sourceMappingURL=excelController.js.map