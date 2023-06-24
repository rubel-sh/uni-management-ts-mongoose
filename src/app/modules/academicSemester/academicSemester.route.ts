import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { AcademicSemesterValidation } from './academicSemester.validation';

const router = express.Router();
// AcademicSemesterValidation.createAcademicSemesterZodSchema

router.post(
  'create-academic-semester',
  validateRequest(AcademicSemesterValidation.createAcademicSemesterZodSchema)
);
