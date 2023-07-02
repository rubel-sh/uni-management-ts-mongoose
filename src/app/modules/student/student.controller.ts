import { Request, Response } from 'express';
import httpStatus from 'http-status';
import { paginationFields } from '../../../constants/pagination';
import catchAsync from '../../../shared/catchAsync';
import pick from '../../../shared/pick';
import sendResponse from '../../../shared/sendResponse';
import { studentFilterableFields } from './student.constants';
import { IStudent } from './student.interfaces';
import { StudentService } from './student.service';

const getAllStudents = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, studentFilterableFields);
  const paginationOptions = pick(req.query, paginationFields);

  // Service Layer
  const result = await StudentService.getAllSemesters(
    filters,
    paginationOptions
  );

  // response
  sendResponse<IStudent[]>(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Academic retrieved successfully',
    meta: result.meta,
    data: result.data,
  });
});

const getSingleStudent = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const result = await StudentService.getSingleSemester(id);
  sendResponse<IStudent>(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Semester retrived successfully',
    data: result,
  });
});

const updateStudent = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const updatedData = req.body;

  const result = await StudentService.updateSemester(id, updatedData);

  sendResponse<IStudent>(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Semester updated successfully',
    data: result,
  });
});

const deleteStudent = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;

  const result = await StudentService.deleteSemester(id);

  sendResponse<IStudent>(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Semester deleted successfully',
    data: result,
  });
});

export const AcademicSemesterController = {
  getAllStudents,
  getSingleStudent,
  updateStudent,
  deleteStudent,
};
