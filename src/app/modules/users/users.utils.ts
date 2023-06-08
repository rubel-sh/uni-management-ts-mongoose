import { User } from './users.model'

export const findLastUserId = async () => {
  const lastUser = await User.findOne({}, { id: 1, _id: 0 })
    .sort({
      createdAt: -1, //descending order
    })
    .lean() //returns pure js object

  return lastUser?.id
}

export const generateUserId = async () => {
  const currentId = (await findLastUserId()) || (0).toString().padStart(5, '0') // create 00001 or 00002 if user already exist

  //   Increment by 1
  const incrementedId = (parseInt(currentId) + 1).toString().padStart(5, '0') // convert currentId to number then add 1 then convert to string and padStart

  return incrementedId
}
