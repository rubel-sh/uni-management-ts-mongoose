import { RequestHandler } from 'express'
import { UserService } from './user.service'

const createUser: RequestHandler = async (req, res, next) => {
  try {
    const { user } = req.body // user.role
    const result = await UserService.createUser(user)
    res.status(200).json({
      success: true,
      message: 'User Created Successfully',
      data: result,
    })
  } catch (err) {
    next(err)
    // res.status(400).json({
    //   err,
    //   //  success: false,
    //   //   message: 'Failed to create user'
    // })
  }
}

export const UserController = { createUser }
