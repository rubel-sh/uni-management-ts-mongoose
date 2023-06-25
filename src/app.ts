import cors from 'cors';
import express, { Application } from 'express';
const app: Application = express();

// routes
import globalErrorHandler from './app/middlewares/globalErrorHandler';
import routes from './app/routes';

app.use(cors());

// Parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Application Routes
app.use('/api/v1', routes);

// Testing
app.get('/', async (req, res) => {
  res.json({ message: 'hello' });
});

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
app.use(globalErrorHandler);

export default app;
