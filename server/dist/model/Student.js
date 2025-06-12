"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Student {
    constructor(carnetOrStudentDTO, name, email, personalPNumber, campus) {
        if (typeof carnetOrStudentDTO === "number") {
            this.carnet = carnetOrStudentDTO;
            this.name = name;
            this.email = email;
            this.personalPNumber = personalPNumber;
            this.campus = campus;
        }
        else {
            this.carnet = carnetOrStudentDTO.carnet;
            this.name = carnetOrStudentDTO.name;
            this.email = carnetOrStudentDTO.email;
            this.personalPNumber = carnetOrStudentDTO.personalPNumber;
            this.campus = carnetOrStudentDTO.campus;
        }
    }
    // Getters
    getCarnet() {
        return this.carnet;
    }
    getName() {
        return this.name;
    }
    getEmail() {
        return this.email;
    }
    getPhoneNumber() {
        return this.personalPNumber;
    }
    getCampus() {
        return this.campus;
    }
    // Setters
    setCarnet(carnet) {
        this.carnet = carnet;
    }
    setName(name) {
        this.name = name;
    }
    setEmail(email) {
        this.email = email;
    }
    setPhoneNumber(personalPNumber) {
        this.personalPNumber = personalPNumber;
    }
    setCampus(campus) {
        this.campus = campus;
    }
}
exports.default = Student;
//# sourceMappingURL=Student.js.map