import httpStatus from 'http-status';
import mongoose from 'mongoose';
import config from '../../../config/index';
import ApiError from '../../../errors/ApiError';
import { AcademicSemester } from '../academicSemester/academicSemester.model';
import { IStudent } from '../student/student.interfaces';
import { Student } from '../student/student.model';
import { IUser } from './user.interface';
import { User } from './user.model';
import { generateStudentId } from './user.utils';

const createStudent = async (
  student: IStudent,
  user: IUser
): Promise<IUser | null> => {
  /**
   * Set Password
   * Set Role: Service theke asbe
   * Set ID: custom studentID. e.g. 230100001
   ***/

  // Default student password : Frontent theke password dewa jabe or default password nibe
  if (!user.password) {
    user.password = config.default_student_pass as string;
  }

  // Set Role
  user.role = 'student';

  // Generate StudentID: Get academic Semester then use {year, code} to generate id
  const academicSemester = await AcademicSemester.findById(
    student.academicSemester
  );

  // Transaction:rollback session User + Student db write operations
  let newUserAllData = null;
  const session = await mongoose.startSession();
  try {
    // Start Transaction
    session.startTransaction();
    // Start DB Write Operations
    const id = await generateStudentId(academicSemester);
    user.id = id;
    student.id = id;

    const newStudent = await Student.create([student], { session });
    // If failed to create student
    if (!newStudent.length) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'Failed to create student');
    }
    // Set student._id --> user.student
    user.student = newStudent[0]._id;
    const newUser = await User.create([user], { session });
    // If tailed to create user
    if (!newUser.length) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'Failed to create user');
    }
    newUserAllData = newUser[0];
    // finish transaction session
    await session.commitTransaction();
    await session.endSession();
  } catch (error) {
    await session.abortTransaction();
    await session.endSession();
    throw error;
  }

  // user --> student --> academicSemester, academicDepartment, academicFaculty

  // Return Stuff
  if (newUserAllData) {
    newUserAllData = await User.findOne({ id: newUserAllData.id }).populate({
      path: 'student',
      populate: [
        { path: 'academicSemester' },
        { path: 'academicDepartment' },
        { path: 'academicFaculty' },
      ],
    });
  }
  return newUserAllData;
};

export const UserService = {
  createStudent,
};

// export default {
//   createUser,
// }
