import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiError';
import { academicSemesterTitleCodeMapper } from './academicSemester.constants';
import { IAcademicSemester } from './academicSemester.interface';
import { AcademicSemester } from './academicSemester.model';

//prettier-ignore
const createSemester = async (payload: IAcademicSemester): Promise<IAcademicSemester> => {

  // Business issues: check title with code
  if (academicSemesterTitleCodeMapper[payload.title] !== payload.code){
    //  Summer : 02 !=== payload.code
    throw new ApiError(httpStatus.BAD_REQUEST,"Invalid Semester Code")
  }
  
  const result = await AcademicSemester.create(payload);
  return result;
};

export const AcademicSemesterService = {
  createSemester,
};
