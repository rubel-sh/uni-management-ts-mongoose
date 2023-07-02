import { Model, Types } from 'mongoose';
import { IStudent } from '../student/student.interfaces';

export type IUser = {
  id: string;
  role: string;
  password: string;
  student?: Types.ObjectId | IStudent;
  // faculty?: Types.ObjectId | IFaculty; // /Future ( নিজেকে করতে হবে )
  // admin?: Types.ObjectId | IAdmin; // Future ( নিজেকে করতে হবে )
};

export type UserModel = Model<IUser, Record<string, unknown>>;
