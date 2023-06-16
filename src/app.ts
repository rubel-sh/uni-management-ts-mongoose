import cors from 'cors'
import express, { Application } from 'express'
const app: Application = express()

// temp

// routes
import globalErrorHandler from './app/modules/users/middlewares/globalErrorHandler'
import { UserRoutes } from './app/modules/users/user.route'

app.use(cors())

// Parser
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Application Routes
app.use('/api/v1/users', UserRoutes)

// Testing

// eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
// app.get('/', async (req: Request, res: Response, next: NextFunction) => {
//   throw new Error('Testing Error Logger')
//   // Reject Promise
//   // Promise.reject(new Error('Unhandled Promise Rejection'))  // Server Dhum kore crash korbe
//   // uncaught exception : Programmer mistakes
//   // console.log(x)
//   // Global middleware er kache chole jabe
//   // next('ore baba Error') // Error :
//   // throw new ApiError(400, 'ore eeor')
// })

// Global Error Handler Middleware
app.use(globalErrorHandler)

export default app
