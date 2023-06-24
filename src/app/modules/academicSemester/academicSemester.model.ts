import { Schema, model } from 'mongoose';
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
      type: Number,
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

export const AcademicSemester = model<IAcademicSemester, AcademicSemesterModel>(
  'AcademicSemester',
  academicSemesterSchema
);
