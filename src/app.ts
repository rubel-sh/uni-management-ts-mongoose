import cors from 'cors'
import express, { Application, Request, Response } from 'express'
const app: Application = express()

// temp
import userService from './app/modules/users/users.service'

// routes
import usersRouter from './app/modules/users/users.route'

app.use(cors())

// Parser
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Application Routes
app.use('/api/v1/users', usersRouter)

// Testing
app.get('/', async (req: Request, res: Response) => {
  await userService.createUser({
    id: '999',
    role: 'student',
    password: '123456',
  })
  res.send('Hello World!')
})

export default app
