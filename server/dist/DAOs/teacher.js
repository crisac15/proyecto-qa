"use strict";
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
// Teacher DAO that communicates with the database
const teacher_schema_1 = __importDefault(require("../schemas/teacher.schema"));
const Teacher_1 = __importDefault(require("../model/Teacher"));
const logTeam_1 = __importDefault(require("../DAOs/logTeam"));
/**
 * Class that communicates with the database to perform CRUD operations
 */
class TeacherDAO {
    /**
     * Get all the teachers from the database
     * @returns a list with all the teachers
     */
    static getAllTeachers() {
        return __awaiter(this, void 0, void 0, function* () {
            const teachers = yield teacher_schema_1.default.find().exec();
            return teachers.map((teacher) => new Teacher_1.default(teacher.toObject()));
        });
    }
    /**
     * Get all the members from the database
     * @returns a list with all the members
     */
    static getAllMembers() {
        return __awaiter(this, void 0, void 0, function* () {
            const membersData = yield teacher_schema_1.default.find({ isMember: true }).exec();
            return membersData.map((member) => new Teacher_1.default(member.toObject()));
        });
    }
    /**
     * Set a teacher as a coordinator
     * @param pCode code of the teacher
     * @param pCoordinator true if the teacher is a coordinator, false otherwise
     */
    static setCoordinator(pCode, pLeader) {
        return __awaiter(this, void 0, void 0, function* () {
            yield teacher_schema_1.default.findOneAndUpdate({ id: pCode }, { isLeader: pLeader }, { new: true }).exec();
        });
    }
    /**
     * Get a teacher by its code
     * @param pCode code of the teacher
     * @returns the teacher with the given code
     */
    static getTeacherByCode(pCode) {
        return __awaiter(this, void 0, void 0, function* () {
            const teacher = yield teacher_schema_1.default.findOne({ id: pCode }).exec();
            return teacher ? new Teacher_1.default(teacher.toObject()) : null;
        });
    }
    /**
     * Create a new teacher in the database
     * @param teacher the teacher to be created
     */
    static createTeacher(teacher) {
        return __awaiter(this, void 0, void 0, function* () {
            yield teacher_schema_1.default.create(teacher);
        });
    }
    /**
     * Update a teacher in the database
     * @param pCode code of the teacher
     * @param teacher the teacher with the new information
     */
    static updateTeacher(pCode, teacher, agenteCambio, operation) {
        return __awaiter(this, void 0, void 0, function* () {
            const beforeTeacher = yield teacher_schema_1.default.findOne({ id: pCode }).exec();
            const beforeDTO = beforeTeacher.toObject();
            // Log the action no se como pasarle el objeto del profesor
            const afterTeacher = yield teacher_schema_1.default.findOneAndUpdate({ id: pCode }, teacher, {
                new: true,
            }).exec();
            const afterDTO = afterTeacher.toObject();
            yield logTeam_1.default.createLogTeam(agenteCambio, beforeDTO, afterDTO, operation, new Date());
        });
    }
    /**
     * Delete a teacher from the database
     * @param pCode code of the teacher
     */
    static deleteTeacher(pCode) {
        return __awaiter(this, void 0, void 0, function* () {
            yield teacher_schema_1.default.findOneAndDelete({
                id: pCode,
            }).exec();
        });
    }
    /**
     * Get a all the teachers from a campus
     * @param campus campus of the teachers
     * @returns a list with all the teachers from the campus
     */
    static getTeachersByCampus(campus) {
        return __awaiter(this, void 0, void 0, function* () {
            const teachers = yield teacher_schema_1.default.find({
                id: { $regex: `^${campus}-` },
            }).exec();
            return teachers.map((teacher) => new Teacher_1.default(teacher.toObject()));
        });
    }
    static changePassword(pCode, newPassword) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // Buscar al profesor por su código
                const teacher = yield teacher_schema_1.default.findOne({ id: pCode });
                if (!teacher) {
                    throw new Error("Profesor no encontrado");
                }
                // Actualizar la contraseña
                teacher.password = newPassword;
                yield teacher.save();
                return true; // Indicar que la contraseña se cambió correctamente
            }
            catch (error) {
                console.error("Error al cambiar la contraseña del profesor:", error);
                return false; // Indicar que ocurrió un error al cambiar la contraseña
            }
        });
    }
}
exports.default = TeacherDAO;
//# sourceMappingURL=teacher.js.map