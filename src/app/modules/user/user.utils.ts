import { IAcademicSemester } from '../academicSemester/academicSemester.interface';
import { User } from './user.model';

export const findLastStudentId = async () => {
  const lastUser = await User.findOne({}, { id: 1, _id: 0 })
    .sort({
      createdAt: -1, //descending order
    })
    .lean(); //returns pure js object

  return lastUser?.id;
};

export const generateStudentId = async (
  academicSemester: IAcademicSemester
): Promise<string> => {
  const currentId =
    (await findLastStudentId()) || (0).toString().padStart(5, '0'); // create 00001 or 00002 if user already exist

  //   Increment by 1
  let incrementedId = (parseInt(currentId) + 1).toString().padStart(5, '0'); // convert currentId to number then add 1 then convert to string and padStart

  // 2025 + 01 + 0001 = 25010001
  incrementedId = `${academicSemester.year.substring(2)}${
    academicSemester.code
  }${incrementedId}`;

  return incrementedId;
};
