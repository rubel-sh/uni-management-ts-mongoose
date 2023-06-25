import { NextFunction, Request, Response } from 'express';
import catchAsync from '../../../shared/catchAsync';
import { AcademicSemesterService } from './academicSemester.service';

const createSemester = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { ...academicSemesterData } = req.body; // 👈 destructure the whole request body
    const result = await AcademicSemesterService.createSemester(
      academicSemesterData
    );

    next();

    res.status(200).json({
      success: true,
      message: 'Academic Semester Created Successfully',
      data: result,
    });
  }
);

export const AcademicSemesterController = {
  createSemester,
};
