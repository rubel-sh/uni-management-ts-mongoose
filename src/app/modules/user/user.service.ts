import httpStatus from 'http-status';
import config from '../../../config/index';
import ApiError from '../../../errors/ApiError';
import { IUser } from './user.interface';
import { User } from './user.model';
import { generateUserId } from './user.utils';

const createUser = async (user: IUser): Promise<IUser | null> => {
  // Auto Generated Incremental id
  const id = await generateUserId();

  user.id = id;

  // Default student password : Frontent theke password dewa jabe or default password nibe
  if (!user.password) {
    user.password = config.default_user_pass as string;
  }

  const createdUser = await User.create(user);

  //If CreatedUser Failed
  //   throw error
  if (!createdUser) {
    throw new ApiError(
      httpStatus.GATEWAY_TIMEOUT,
      'Error failed to create user!'
    );
  }

  return createdUser;
};

export const UserService = {
  createUser,
};

// export default {
//   createUser,
// }
