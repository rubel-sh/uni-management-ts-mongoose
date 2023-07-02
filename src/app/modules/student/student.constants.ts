import { IStudentBloodGroups, IStudentGenders } from './student.interfaces';

export const gender: IStudentGenders[] = ['male', 'female'];

export const bloodGroup: IStudentBloodGroups[] = [
  'A+',
  'A-',
  'AB+',
  'AB-',
  'B+',
  'B-',
  'O+',
  'O-',
];

export const studentSearchableFields = [
  'id',
  'email',
  'contactNo',
  'name.fisrtName',
  'name.middleName',
  'name.lastName',
];

export const studentFilterableFields = [
  'searchTerm',
  'id',
  'bloodGroup',
  'email',
  'contactNo',
  'emergencyContactNo',
];
