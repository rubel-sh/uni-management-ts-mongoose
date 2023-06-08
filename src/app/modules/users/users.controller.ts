import { Request, Response } from 'express'
import userService from './users.service'

const createUser = async (req: Request, res: Response) => {
  try {
    const { user } = req.body // user.role
    const result = await userService.createUser(user)
    res.status(200).json({
      success: true,
      message: 'User Created Successfully',
      data: result,
    })
  } catch (err) {
    res.status(400).json({ success: false, message: 'Failed to create user' })
  }
}

export default { createUser }
