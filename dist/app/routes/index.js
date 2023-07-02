"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const academicDepartment_routes_1 = require("../modules/academicDepartment/academicDepartment.routes");
const academicFaculty_routes_1 = require("../modules/academicFaculty/academicFaculty.routes");
const academicSemester_routes_1 = require("../modules/academicSemester/academicSemester.routes");
const student_routes_1 = require("../modules/student/student.routes");
const user_routes_1 = require("../modules/user/user.routes");
const router = express_1.default.Router();
// বার বার router.use করতে হবে না তাই একবারে সব রাউট এড করে নিতে হবে
const moduleRoutes = [
    { path: '/users', route: user_routes_1.UserRoutes },
    { path: '/academic-semesters', route: academicSemester_routes_1.AcademicSemesterRoutes },
    { path: '/academic-faculties', route: academicFaculty_routes_1.AcademicFacultyRoutes },
    { path: '/academic-departments', route: academicDepartment_routes_1.AcademicDepartmentRoutes },
    { path: '/students', route: student_routes_1.StudentRoutes },
];
moduleRoutes.forEach(route => {
    router.use(route.path, route.route);
});
exports.default = router;
