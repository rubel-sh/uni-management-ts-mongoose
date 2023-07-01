import httpStatus from 'http-status';
import { Schema, model } from 'mongoose';
import ApiError from '../../../errors/ApiError';
import {
  academicSemesterCodes,
  academicSemesterMonths,
  academicSemesterTitles,
} from './academicSemester.constants';
import {
  AcademicSemesterModel,
  IAcademicSemester,
} from './academicSemester.interface';

const academicSemesterSchema = new Schema<IAcademicSemester>(
  {
    title: {
      type: String,
      required: true,
      enum: academicSemesterTitles, // 👈 coming from academicSemesterTitles constants
    },
    year: {
      type: String,
      required: true,
    },
    code: {
      type: String,
      required: true,
      enum: academicSemesterCodes, // 👈 coming from academicSemesterCodes constants
    },
    startMonth: {
      type: String,
      required: true,
      enum: academicSemesterMonths, // 👈 coming from academicSemesterMonths constants
    },
    endMonth: {
      type: String,
      required: true,
      enum: academicSemesterMonths, // 👈 coming from academicSemesterMonths constants
    },
  },
  {
    timestamps: true,
  }
);

// Mongoose prehook
academicSemesterSchema.pre('save', async function (next) {
  // 👈 this is a mongoose prehook and next aswell
  const isExist = await AcademicSemester.findOne({
    title: this.title,
    year: this.year,
  });
  if (isExist) {
    throw new ApiError(httpStatus.CONFLICT, 'Semester already exists');
  }

  next();
});

export const AcademicSemester = model<IAcademicSemester, AcademicSemesterModel>(
  'AcademicSemester',
  academicSemesterSchema
);

// Handling same year and same semester issue

// Mongoose : prehook & posthook
// Prehook : before saving the data
// Posthook : after saving the data

// Prehook check: Data -> check ? same year and same semester -> throw error
//
