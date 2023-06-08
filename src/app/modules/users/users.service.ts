import { IUser } from './users.interface'
import { User } from './users.model'
import config from '../../../config/index'
import { generateUserId } from './users.utils'

const createUser = async (user: IUser): Promise<IUser | null> => {
  // Auto Generated Incremental id
  const id = await generateUserId()

  user.id = id

  // Default student password : Frontent theke password dewa jabe or default password nibe
  if (!user.password) {
    user.password = config.default_user_pass as string
  }

  const createdUser = await User.create(user)

  //If CreatedUser Failed
  //   throw error
  if (!createUser) {
    throw new Error('Error failed to create user!')
  }

  return createdUser
}

export default {
  createUser,
}
