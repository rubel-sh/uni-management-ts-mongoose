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
// app.get('/', (req: Request, res: Response, next: NextFunction) => {
//   // Global middleware er kache chole jabe
//   throw new ApiError(400, 'ore eeor')
//   // next('ore baba Error') // Error :
// })

// Global Error Handler Middleware
app.use(globalErrorHandler)

export default app
