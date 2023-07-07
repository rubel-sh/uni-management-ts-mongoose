'use strict';
var __awaiter =
  (this && this.__awaiter) ||
  function (thisArg, _arguments, P, generator) {
    function adopt(value) {
      return value instanceof P
        ? value
        : new P(function (resolve) {
            resolve(value);
          });
    }
    return new (P || (P = Promise))(function (resolve, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      }
      function rejected(value) {
        try {
          step(generator['throw'](value));
        } catch (e) {
          reject(e);
        }
      }
      function step(result) {
        result.done
          ? resolve(result.value)
          : adopt(result.value).then(fulfilled, rejected);
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
  };
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
exports.UserService = void 0;
const http_status_1 = __importDefault(require('http-status'));
const mongoose_1 = __importDefault(require('mongoose'));
const index_1 = __importDefault(require('../../../config/index'));
const ApiError_1 = __importDefault(require('../../../errors/ApiError'));
const academicSemester_model_1 = require('../academicSemester/academicSemester.model');
const student_model_1 = require('../student/student.model');
const user_model_1 = require('./user.model');
const user_utils_1 = require('./user.utils');
const createStudent = (student, user) =>
  __awaiter(void 0, void 0, void 0, function* () {
    /**
     * Set Password
     * Set Role: Service theke asbe
     * Set ID: custom studentID. e.g. 230100001
     ***/
    // Default student password : Frontent theke password dewa jabe or default password nibe
    if (!user.password) {
      user.password = index_1.default.default_student_pass;
    }
    // Set Role
    user.role = 'student';
    // Generate StudentID: Get academic Semester then use {year, code} to generate id
    const academicSemester =
      yield academicSemester_model_1.AcademicSemester.findById(
        student.academicSemester
      );
    // Transaction:rollback session User + Student db write operations
    let newUserAllData = null;
    const session = yield mongoose_1.default.startSession();
    try {
      // Start Transaction
      session.startTransaction();
      // Start DB Write Operations
      const id = yield (0, user_utils_1.generateStudentId)(academicSemester);
      user.id = id;
      student.id = id;
      const newStudent = yield student_model_1.Student.create([student], {
        session,
      });
      // If failed to create student
      if (!newStudent.length) {
        throw new ApiError_1.default(
          http_status_1.default.BAD_REQUEST,
          'Failed to create student'
        );
      }
      // Set student._id --> user.student
      user.student = newStudent[0]._id;
      const newUser = yield user_model_1.User.create([user], { session });
      // If tailed to create user
      if (!newUser.length) {
        throw new ApiError_1.default(
          http_status_1.default.BAD_REQUEST,
          'Failed to create user'
        );
      }
      newUserAllData = newUser[0];
      // finish transaction session
      yield session.commitTransaction();
      yield session.endSession();
    } catch (error) {
      yield session.abortTransaction();
      yield session.endSession();
      throw error;
    }
    // user --> student --> academicSemester, academicDepartment, academicFaculty
    // Return Stuff
    if (newUserAllData) {
      newUserAllData = yield user_model_1.User.findOne({
        id: newUserAllData.id,
      }).populate({
        path: 'student',
        populate: [
          { path: 'academicSemester' },
          { path: 'academicDepartment' },
          { path: 'academicFaculty' },
        ],
      });
    }
    return newUserAllData;
  });
exports.UserService = {
  createStudent,
};
// export default {
//   createUser,
// }
