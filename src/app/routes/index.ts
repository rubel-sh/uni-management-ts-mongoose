import express, { Router } from 'express';
import { academicDepartmentRoutes } from '../modules/academicDepartment/academicDepartment.routes';
import { AcademicFacultyRoutes } from '../modules/academicFaculty/academicFaculty.routes';
import { AcademicSemesterRoutes } from '../modules/academicSemester/academicSemester.routes';
import { UserRoutes } from '../modules/user/user.routes';

const router = express.Router();

// বার বার router.use করতে হবে না তাই একবারে সব রাউট এড করে নিতে হবে
const moduleRoutes: { path: string; route: Router }[] = [
  { path: '/users', route: UserRoutes },
  { path: '/academic-semesters', route: AcademicSemesterRoutes },
  { path: '/academic-faculties', route: AcademicFacultyRoutes },
  { path: '/academic-departments', route: academicDepartmentRoutes },
];

moduleRoutes.forEach(route => {
  router.use(route.path, route.route);
});

export default router;
